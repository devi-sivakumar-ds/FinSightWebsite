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
const progressFillEl = document.getElementById('progress-fill');
const playButton = document.getElementById('play-button');
const playLabel = document.getElementById('play-label');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const replayButton = document.getElementById('replay-button');
const speechWarning = document.getElementById('speech-warning');

let activeIndex = 0;
let isPlaying = false;
let utterance = null;
let cardEls = [];

const speech = 'speechSynthesis' in window ? window.speechSynthesis : null;

function setStaticContent() {
  document.title = voiceContent.pageTitle || 'FinSight Voice Guide';
  titleEl.textContent = voiceContent.title || 'FinSight Voice Guide';
  eyebrowEl.textContent = voiceContent.eyebrow || 'Voice Guided Mode';
  introEl.textContent = voiceContent.intro || '';

  const actions = voiceContent.actions || {};
  playLabel.textContent = actions.play || 'Play';
  replayButton.textContent = actions.replay || 'Replay';
  document.querySelector('[data-action-label="exit"]').textContent = actions.exit || 'Standard site';

  if (!speech && speechWarning) {
    speechWarning.hidden = false;
    speechWarning.textContent = voiceContent.unavailable || 'Speech playback is not available in this browser.';
    playButton.disabled = true;
    replayButton.disabled = true;
  }
}

function renderSections() {
  sectionListEl.innerHTML = '';
  cardEls = sections.map((section, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'voice-section-card';
    card.setAttribute('aria-pressed', index === activeIndex ? 'true' : 'false');
    card.innerHTML = `
      <div class="section-card-top">
        <span class="section-kicker">${section.kicker || `Section ${index + 1}`}</span>
        <span class="section-duration">${section.duration || ''}</span>
      </div>
      <h3>${section.title || ''}</h3>
      <p>${section.summary || ''}</p>
    `;
    card.addEventListener('click', () => selectSection(index, { play: isPlaying, scroll: false }));
    sectionListEl.appendChild(card);
    return card;
  });
}

function updateActiveSection({ scroll = false } = {}) {
  const section = sections[activeIndex];
  if (!section) return;

  transcriptHeadingEl.textContent = section.title || '';
  transcriptTextEl.textContent = section.narration || '';
  statusKickerEl.textContent = section.kicker || '';
  statusTitleEl.textContent = section.title || '';
  statusProgressEl.textContent = `${activeIndex + 1} of ${sections.length}`;
  progressFillEl.style.width = `${((activeIndex + 1) / sections.length) * 100}%`;

  cardEls.forEach((card, index) => {
    const active = index === activeIndex;
    card.classList.toggle('is-active', active);
    card.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

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
  utterance = new SpeechSynthesisUtterance(sections[activeIndex].narration || '');
  const voice = getPreferredVoice();
  if (voice) utterance.voice = voice;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  utterance.onend = () => {
    if (!isPlaying) return;
    if (activeIndex < sections.length - 1) {
      activeIndex += 1;
      updateActiveSection({ scroll: true });
      speakCurrent();
    } else {
      isPlaying = false;
      updatePlayButton();
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
}

function play() {
  if (!sections.length || !speech) return;
  isPlaying = true;
  updatePlayButton();
  speakCurrent();
}

function pause() {
  isPlaying = false;
  if (speech) speech.cancel();
  updatePlayButton();
}

function selectSection(index, options = {}) {
  activeIndex = Math.max(0, Math.min(index, sections.length - 1));
  updateActiveSection({ scroll: options.scroll });
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
  play();
});

document.addEventListener('keydown', event => {
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

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
renderSections();
updateActiveSection();
