const voiceContent = window.FINSIGHT_CONTENT?.voiceGuide || {};
const sections = voiceContent.sections || [];

const titleEl = document.getElementById('voice-title');
const eyebrowEl = document.getElementById('voice-eyebrow');
const introEl = document.getElementById('voice-intro');
const sectionListEl = document.getElementById('voice-sections');
const transcriptHeadingEl = document.getElementById('transcript-heading');
const transcriptTextEl = document.getElementById('transcript-text');
const statusKickerEl = document.getElementById('status-kicker');
const statusTitleEl = document.getElementById('status-title');
const statusProgressEl = document.getElementById('status-progress');
const playbackAnnouncementEl = document.getElementById('playback-announcement');
const progressTrackEl = document.getElementById('progress-track');
const progressFillEl = document.getElementById('progress-fill');
const playButton = document.getElementById('play-button');
const playLabel = document.getElementById('play-label');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const speechWarning = document.getElementById('speech-warning');
const speedLabelEl = document.getElementById('speed-label');
const verbosityLabelEl = document.getElementById('verbosity-label');
const speedControlEl = document.getElementById('speed-control');
const verbosityControlEl = document.getElementById('verbosity-control');
const fullTranscriptEl = document.getElementById('full-transcript');
const transcriptSearchEl = document.getElementById('transcript-search');
const transcriptSearchStatusEl = document.getElementById('transcript-search-status');
const fullTranscriptListEl = document.getElementById('full-transcript-list');

let activeIndex = 0;
let isPlaying = false;
let utterance = null;
let cardEls = [];
let currentSpeed = 1;
let currentVerbosity = 'medium';
let speedButtonEls = [];
let verbosityButtonEls = [];
let transcriptItemEls = [];
let speedOptions = [];
let verbosityOptions = [];

const speech = 'speechSynthesis' in window ? window.speechSynthesis : null;

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function setStaticContent() {
  document.title = voiceContent.pageTitle || 'FinSight Voice Guide';
  titleEl.textContent = voiceContent.title || 'FinSight Voice Guide';
  eyebrowEl.textContent = voiceContent.eyebrow || 'Voice Guided Mode';
  introEl.textContent = voiceContent.intro || '';

  const actions = voiceContent.actions || {};
  const settings = voiceContent.settings || {};
  playLabel.textContent = actions.play || 'Play';
  replayButton.textContent = actions.replay || 'Replay';
  speedLabelEl.textContent = settings.speedLabel || 'Speed';
  verbosityLabelEl.textContent = settings.verbosityLabel || 'Verbosity';
  document.querySelector('[data-action-label="exit"]').textContent = actions.exit || 'Standard site';

  if (!speech && speechWarning) {
    speechWarning.hidden = false;
    speechWarning.textContent = voiceContent.unavailable || 'Speech playback is not available in this browser.';
    playButton.disabled = true;
    replayButton.disabled = true;
  }
}

function getNarration(section) {
  if (!section) return '';
  if (currentVerbosity === 'low') return section.summary || section.narration || '';
  if (currentVerbosity === 'high') return section.narrationHigh || section.narration || section.summary || '';
  return section.narration || section.summary || '';
}

function renderSettings() {
  const settings = voiceContent.settings || {};
  speedOptions = settings.speeds || [
    { label: 'Slow', value: 0.5 },
    { label: 'Normal', value: 1 },
    { label: 'Fast', value: 1.5 },
  ];
  verbosityOptions = settings.verbosity || [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  speedControlEl.innerHTML = '';
  speedButtonEls = speedOptions.map((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'segment-button';
    button.setAttribute('role', 'radio');
    button.textContent = option.label;
    button.setAttribute('aria-checked', String(Number(option.value) === currentSpeed));
    button.setAttribute('aria-label', `${option.label}, ${option.value} times speed`);
    button.addEventListener('click', () => setSpeed(Number(option.value)));
    button.addEventListener('keydown', event => handleSegmentKeydown(event, speedButtonEls, index));
    speedControlEl.appendChild(button);
    return button;
  });

  verbosityControlEl.innerHTML = '';
  verbosityButtonEls = verbosityOptions.map((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'segment-button';
    button.setAttribute('role', 'radio');
    button.textContent = option.label;
    button.setAttribute('aria-checked', String(option.value === currentVerbosity));
    button.setAttribute('aria-label', `${option.label} verbosity`);
    button.addEventListener('click', () => setVerbosity(option.value));
    button.addEventListener('keydown', event => handleSegmentKeydown(event, verbosityButtonEls, index));
    verbosityControlEl.appendChild(button);
    return button;
  });

  updateSettingButtons();
}

function updateSettingButtons() {
  speedButtonEls.forEach((button, index) => {
    const active = Number(speedOptions[index]?.value) === currentSpeed;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-checked', active ? 'true' : 'false');
    button.tabIndex = active ? 0 : -1;
  });

  verbosityButtonEls.forEach((button, index) => {
    const active = verbosityOptions[index]?.value === currentVerbosity;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-checked', active ? 'true' : 'false');
    button.tabIndex = active ? 0 : -1;
  });
}

function handleSegmentKeydown(event, buttons, index) {
  const forwardKeys = ['ArrowRight', 'ArrowDown'];
  const backKeys = ['ArrowLeft', 'ArrowUp'];
  if (![...forwardKeys, ...backKeys, 'Home', 'End'].includes(event.key)) return;

  event.preventDefault();

  let nextIndex = index;
  if (forwardKeys.includes(event.key)) nextIndex = (index + 1) % buttons.length;
  if (backKeys.includes(event.key)) nextIndex = (index - 1 + buttons.length) % buttons.length;
  if (event.key === 'Home') nextIndex = 0;
  if (event.key === 'End') nextIndex = buttons.length - 1;

  buttons[nextIndex].focus();
  buttons[nextIndex].click();
}

function restartIfPlaying() {
  if (!isPlaying) return;
  pause();
  play();
}

function announcePlayback(message) {
  if (!playbackAnnouncementEl || !message) return;
  playbackAnnouncementEl.textContent = '';
  window.setTimeout(() => {
    playbackAnnouncementEl.textContent = message;
  }, 0);
}

function updateTranscriptSearchStatus(matchCount, query) {
  if (!transcriptSearchStatusEl) return;
  if (!query) {
    transcriptSearchStatusEl.textContent = `${sections.length} transcript sections shown.`;
    return;
  }
  transcriptSearchStatusEl.textContent = `${matchCount} transcript ${matchCount === 1 ? 'section' : 'sections'} match "${query}".`;
}

function setSpeed(speed) {
  currentSpeed = speed;
  updateSettingButtons();
  restartIfPlaying();
}

function setVerbosity(verbosity) {
  currentVerbosity = verbosity;
  updateSettingButtons();
  updateActiveSection();
  renderFullTranscript();
  restartIfPlaying();
}

function renderSections() {
  sectionListEl.innerHTML = '';
  cardEls = sections.map((section, index) => {
    const card = document.createElement('button');
    const titleId = `voice-section-${index}-title`;
    const summaryId = `voice-section-${index}-summary`;
    const durationId = `voice-section-${index}-duration`;
    card.type = 'button';
    card.className = 'voice-section-card';
    card.id = `voice-section-${index}`;
    card.setAttribute('aria-describedby', `${summaryId} ${durationId}`);
    card.innerHTML = `
      <div class="section-card-top">
        <span class="section-kicker">${escapeHtml(section.kicker || `Section ${index + 1}`)}</span>
        <span class="section-duration" id="${durationId}" aria-label="${escapeAttr(section.duration ? `Duration ${section.duration}` : '')}">${escapeHtml(section.duration || '')}</span>
      </div>
      <h3 id="${titleId}">${escapeHtml(section.title || '')}</h3>
      <p id="${summaryId}">${escapeHtml(section.summary || '')}</p>
    `;
    card.addEventListener('click', () => selectSection(index, { play: isPlaying, scroll: false }));
    sectionListEl.appendChild(card);
    return card;
  });
}

function renderFullTranscript() {
  if (!fullTranscriptListEl) return;

  const query = transcriptSearchEl?.value.trim().toLowerCase() || '';
  fullTranscriptListEl.innerHTML = '';
  transcriptItemEls = sections.map((section, index) => {
    const narration = getNarration(section);
    const searchableText = [
      section.kicker,
      section.title,
      section.duration,
      section.summary,
      narration,
    ].join(' ').toLowerCase();
    const isMatch = !query || searchableText.includes(query);
    const item = document.createElement('article');
    item.className = 'full-transcript-item';
    item.hidden = !isMatch;
    item.innerHTML = `
      <div class="section-card-top">
        <span class="section-kicker">${escapeHtml(section.kicker || `Section ${index + 1}`)}</span>
        <span class="section-duration" aria-label="${escapeAttr(section.duration ? `Duration ${section.duration}` : '')}">${escapeHtml(section.duration || '')}</span>
      </div>
      <h3>${escapeHtml(section.title || '')}</h3>
      <p>${escapeHtml(narration)}</p>
      <button class="text-button transcript-jump-button" type="button" data-transcript-index="${index}" aria-label="${escapeAttr(`Jump to section ${index + 1}: ${section.title || ''}`)}">Jump to section</button>
    `;
    fullTranscriptListEl.appendChild(item);
    return item;
  });

  const matchCount = transcriptItemEls.filter(item => !item.hidden).length;
  fullTranscriptListEl.toggleAttribute('data-empty', matchCount === 0);
  updateTranscriptSearchStatus(matchCount, query);
}

function updateActiveSection({ scroll = false, announce = false } = {}) {
  const section = sections[activeIndex];
  if (!section) return;

  transcriptHeadingEl.textContent = section.title || '';
  transcriptTextEl.textContent = getNarration(section);
  statusKickerEl.textContent = section.kicker || '';
  statusTitleEl.textContent = section.title || '';
  statusProgressEl.textContent = `${activeIndex + 1} of ${sections.length}`;
  progressFillEl.style.width = `${((activeIndex + 1) / sections.length) * 100}%`;
  progressTrackEl.setAttribute('aria-valuemax', String(sections.length));
  progressTrackEl.setAttribute('aria-valuenow', String(activeIndex + 1));
  progressTrackEl.setAttribute('aria-valuetext', `Section ${activeIndex + 1} of ${sections.length}: ${section.title || ''}`);

  cardEls.forEach((card, index) => {
    const active = index === activeIndex;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-current', active ? 'true' : 'false');
    card.setAttribute('aria-label', `${active ? 'Current section, ' : ''}${index + 1} of ${sections.length}: ${sections[index]?.title || ''}`);
  });

  updateNavButtons();

  if (announce) {
    announcePlayback(`Moved to section ${activeIndex + 1} of ${sections.length}: ${section.title || ''}`);
  }

  if (scroll && cardEls[activeIndex]) {
    cardEls[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function getPreferredVoice() {
  if (!speech) return null;
  const voices = speech.getVoices();
  return voices.find(voice => voice.lang?.startsWith('en') && /Samantha|Alex|Google US English|Microsoft/.test(voice.name))
    || voices.find(voice => voice.lang?.startsWith('en'))
    || null;
}

function speakCurrent() {
  if (!speech || !sections[activeIndex]) return;

  speech.cancel();
  utterance = new SpeechSynthesisUtterance(getNarration(sections[activeIndex]));
  const voice = getPreferredVoice();
  if (voice) utterance.voice = voice;
  utterance.rate = currentSpeed;
  utterance.pitch = 1;

  utterance.onend = () => {
    if (!isPlaying) return;
    if (activeIndex < sections.length - 1) {
      activeIndex += 1;
      updateActiveSection({ scroll: true, announce: true });
      speakCurrent();
    } else {
      isPlaying = false;
      updatePlayButton();
      announcePlayback('Voice guide complete.');
    }
  };

  utterance.onerror = () => {
    isPlaying = false;
    updatePlayButton();
  };

  speech.speak(utterance);
}

function updatePlayButton() {
  const actions = voiceContent.actions || {};
  playLabel.textContent = isPlaying ? (actions.pause || 'Pause') : (actions.play || 'Play');
  playButton.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
  playButton.setAttribute('aria-label', isPlaying ? 'Pause voice guide' : 'Play voice guide');
}

function updateNavButtons() {
  previousButton.disabled = activeIndex === 0;
  nextButton.disabled = activeIndex === sections.length - 1;
  previousButton.setAttribute('aria-label', activeIndex === 0 ? 'Previous section unavailable' : `Previous section: ${sections[activeIndex - 1]?.title || ''}`);
  nextButton.setAttribute('aria-label', activeIndex === sections.length - 1 ? 'Next section unavailable' : `Next section: ${sections[activeIndex + 1]?.title || ''}`);
}

function play() {
  if (!sections.length || !speech) return;
  isPlaying = true;
  updatePlayButton();
  announcePlayback(`Playing section ${activeIndex + 1} of ${sections.length}: ${sections[activeIndex]?.title || ''}`);
  speakCurrent();
}

function pause() {
  isPlaying = false;
  if (speech) speech.cancel();
  updatePlayButton();
  announcePlayback('Voice guide paused.');
}

function selectSection(index, options = {}) {
  activeIndex = Math.max(0, Math.min(index, sections.length - 1));
  updateActiveSection({ scroll: options.scroll, announce: true });
  if (options.play) play();
}

playButton.addEventListener('click', () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

previousButton.addEventListener('click', () => {
  const shouldPlay = isPlaying;
  if (shouldPlay) pause();
  selectSection(activeIndex - 1, { play: shouldPlay, scroll: true });
});

nextButton.addEventListener('click', () => {
  const shouldPlay = isPlaying;
  if (shouldPlay) pause();
  selectSection(activeIndex + 1, { play: shouldPlay, scroll: true });
});

replayButton.addEventListener('click', () => {
  const shouldPlay = isPlaying;
  if (shouldPlay) pause();
  updateActiveSection();
  announcePlayback(`Replaying section ${activeIndex + 1} of ${sections.length}: ${sections[activeIndex]?.title || ''}`);
  play();
});

if (transcriptSearchEl) {
  transcriptSearchEl.addEventListener('input', renderFullTranscript);
}

if (fullTranscriptListEl) {
  fullTranscriptListEl.addEventListener('click', event => {
    const button = event.target.closest('[data-transcript-index]');
    if (!button) return;
    if (!fullTranscriptEl.open) fullTranscriptEl.open = true;
    selectSection(Number(button.dataset.transcriptIndex), { play: false, scroll: true });
    transcriptHeadingEl.focus?.();
  });
}

document.addEventListener('keydown', event => {
  const tag = document.activeElement?.tagName;
  if (['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
  if (document.activeElement?.closest('.segmented-control')) return;

  if (event.code === 'Space') {
    event.preventDefault();
    playButton.click();
  }

  if (event.key === 'ArrowLeft') {
    previousButton.click();
  }

  if (event.key === 'ArrowRight') {
    nextButton.click();
  }

  if (event.key === 'Escape') {
    pause();
  }
});

window.addEventListener('beforeunload', () => {
  if (speech) speech.cancel();
});

if (speech) {
  speech.onvoiceschanged = getPreferredVoice;
}

setStaticContent();
renderSettings();
renderSections();
renderFullTranscript();
updateActiveSection();
