const content = window.FINSIGHT_CONTENT || {};
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!window.FINSIGHT_CONTENT) {
  console.warn('FinSight content.js did not load. Check that content.js is committed and published next to index.html.');
}

function getContent(path) {
  return path.split('.').reduce((value, key) => {
    if (value == null) return undefined;
    return value[key];
  }, content);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function applyStaticContent() {
  if (content.pageTitle) document.title = content.pageTitle;

  document.querySelectorAll('[data-content]').forEach(el => {
    const value = getContent(el.dataset.content);
    if (value !== undefined) {
      el.textContent = value;
      if (value === '') el.hidden = true;
    }
  });

  document.querySelectorAll('[data-html]').forEach(el => {
    const value = getContent(el.dataset.html);
    if (value !== undefined) el.innerHTML = value;
  });

  document.querySelectorAll('[data-aria-label]').forEach(el => {
    const value = getContent(el.dataset.ariaLabel);
    if (value !== undefined) el.setAttribute('aria-label', value);
  });

  document.querySelectorAll('[data-alt]').forEach(el => {
    const value = getContent(el.dataset.alt);
    if (value !== undefined) el.setAttribute('alt', value);
  });

  const stats = content.stats?.items || [];
  document.querySelectorAll('.stat-number[data-stat-index]').forEach(el => {
    const stat = stats[Number(el.dataset.statIndex)];
    if (!stat) return;
    el.dataset.count = stat.value;
    el.dataset.suffix = stat.suffix || '';
    el.textContent = `0${stat.suffix || ''}`;
  });

}

applyStaticContent();

// ── Navbar shadow on scroll ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
});

// ── Cycling headline word ──
(function() {
  const words = content.hero?.cyclingWords || [];
  const wrapper = document.getElementById('cyclingWrapper');
  const el = document.getElementById('cyclingWord');
  if (!wrapper || !el || !words.length) return;
  el.textContent = words[0];
  if (prefersReducedMotion) {
    wrapper.setAttribute('aria-live', 'off');
  }

  let current = 0;

  function setWrapperWidth() {
    const tmp = document.createElement('span');
    const headlineStyles = window.getComputedStyle(el);
    tmp.style.cssText = `
      position:absolute;
      visibility:hidden;
      font-family:${headlineStyles.fontFamily};
      font-size:${headlineStyles.fontSize};
      font-weight:${headlineStyles.fontWeight};
      letter-spacing:${headlineStyles.letterSpacing};
      white-space:nowrap;
    `;
    document.body.appendChild(tmp);
    let maxW = 0;
    words.forEach(w => { tmp.textContent = w; maxW = Math.max(maxW, tmp.getBoundingClientRect().width); });
    document.body.removeChild(tmp);
    wrapper.style.width = Math.ceil(maxW + 44) + 'px';
  }
  setWrapperWidth();
  window.addEventListener('resize', setWrapperWidth);
  if (prefersReducedMotion) return;

  function cycle() {
    const next = (current + 1) % words.length;
    el.classList.add('exit');
    setTimeout(() => {
      el.textContent = words[next];
      el.classList.remove('exit');
      el.classList.add('enter');
      void el.offsetWidth;
      el.classList.remove('enter');
      current = next;
    }, 400);
  }
  setInterval(cycle, 2500);
})();

// ── Fade-up scroll animations ──
(function() {
  const targets = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => observer.observe(el));
})();

// ── Phone screen cycler ──
(function() {
  const screens = document.querySelectorAll('.phone-screen-wrap .screen');
  const phoneFrame = document.getElementById('challengePhoneFrame');
  if (!screens.length) return;

  let currentScreen = 0;
  const timings = [2400, 2200, 1900, 2200, 2100, 2100, 1800];
  const errorStates = new Set([4, 5]);

  function updateScreenAccessibility() {
    screens.forEach((screen, index) => {
      screen.setAttribute('aria-hidden', index === currentScreen ? 'false' : 'true');
    });
  }

  updateScreenAccessibility();
  if (prefersReducedMotion) return;

  function cycleScreen() {
    const prev = currentScreen;
    currentScreen = (currentScreen + 1) % screens.length;

    screens[prev].classList.remove('active');
    screens[prev].classList.add('exit');

    setTimeout(() => {
      screens[prev].classList.remove('exit');
      screens[currentScreen].classList.add('active');
      updateScreenAccessibility();

      if (phoneFrame && errorStates.has(currentScreen)) {
        phoneFrame.classList.add('shake');
        setTimeout(() => phoneFrame.classList.remove('shake'), 500);
      }
    }, 420);

    setTimeout(cycleScreen, timings[currentScreen] || 2200);
  }

  setTimeout(cycleScreen, timings[0]);
})();

// ── Stats counter and visualization animation ──
(function() {
  const statEls = document.querySelectorAll('.stat-number[data-count]');
  const arcFrustrated = document.querySelector('.arc-path-frustrated');
  const arcAttempts = document.querySelector('.arc-path-attempts');
  const figuresRow = document.getElementById('figuresRow');
  const statsSection = document.querySelector('.stats-section');
  const figureStat = content.stats?.items?.[0];

  if (figuresRow && !figuresRow.children.length) {
    const figureCount = 10;
    const highlightedFigures = Math.max(0, Math.min(figureCount, (figureStat?.value || 0) / 10));
    const figureSvg = `
      <svg class="stick-figure" viewBox="0 0 22 36" aria-hidden="true">
        <circle cx="11" cy="5" r="4" fill="currentColor"/>
        <line x1="11" y1="9" x2="11" y2="24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="4" y1="14" x2="18" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="11" y1="24" x2="5" y2="34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <line x1="11" y1="24" x2="17" y2="34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;

    for (let i = 0; i < figureCount; i++) {
      const fillPercent = Math.max(0, Math.min(1, highlightedFigures - i)) * 100;
      figuresRow.insertAdjacentHTML('beforeend', `
        <span class="figure-glyph" aria-hidden="true">
          <span class="figure-base">${figureSvg}</span>
          <span class="figure-fill" style="width: ${fillPercent}%;">${figureSvg}</span>
        </span>
      `);
    }
  }

  if (!statsSection) return;

  if (prefersReducedMotion) {
    statEls.forEach(el => {
      el.textContent = `${parseInt(el.dataset.count, 10)}${el.dataset.suffix || ''}`;
    });
    if (arcFrustrated) arcFrustrated.style.strokeDashoffset = 126 - (68 / 100) * 126;
    if (arcAttempts) arcAttempts.style.strokeDashoffset = 126 - (29 / 100) * 126;
    return;
  }

  let animated = false;
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  function animateCount(el, target, suffix, duration) {
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function animateArc(path, percentage, duration) {
    const total = 126;
    const target = (percentage / 100) * total;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      path.style.strokeDashoffset = total - easeOut(progress) * target;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;

      statEls.forEach(el => {
        animateCount(el, parseInt(el.dataset.count, 10), el.dataset.suffix || '', 1200);
      });

      if (arcFrustrated) animateArc(arcFrustrated, 68, 1200);
      if (arcAttempts) animateArc(arcAttempts, 29, 1200);

      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
})();

// ── Design Guidelines ──
const guidelines = content.guidelines?.items || [];

const glNav    = document.querySelector('.gl-nav');
const glScroll = document.getElementById('guidelinesScroll');

function renderGuidelineMedia(g) {
  if (g.video) {
    const type = g.video.endsWith('.mov') ? 'video/quicktime' : 'video/mp4';
    const label = g.mediaLabel || `${g.title} example video`;
    return `
      <div class="gl-card-media">
        <video autoplay muted loop playsinline preload="metadata" aria-label="${escapeAttr(label)}">
          <source src="${escapeAttr(g.video)}" type="${escapeAttr(type)}">
        </video>
      </div>
    `;
  }

  if (g.image) {
    const alt = g.imageAlt || `${g.title} illustration`;
    return `<div class="gl-card-media"><img src="${escapeAttr(g.image)}" alt="${escapeAttr(alt)}" loading="lazy"></div>`;
  }

  return '';
}

guidelines.forEach((g, i) => {
  const num = String(i + 1).padStart(2, '0');

  const navItem = document.createElement('a');
  navItem.className = 'gl-nav-item' + (i === 0 ? ' active' : '');
  navItem.href = `#gl-${i}`;
  navItem.setAttribute('aria-label', `Go to guideline ${i + 1}: ${g.title}`);
  if (i === 0) navItem.setAttribute('aria-current', 'true');
  navItem.innerHTML = `<span class="gl-num">${i + 1}</span><span>${escapeHtml(g.title)}</span>`;
  glNav.appendChild(navItem);

  const card = document.createElement('div');
  card.className = 'gl-card';
  card.id = `gl-${i}`;
  card.setAttribute('role', 'group');
  card.setAttribute('aria-labelledby', `gl-${i}-title`);
  card.innerHTML = `
    <div class="gl-card-num" aria-hidden="true">${num}</div>
    <h3 class="gl-card-title" id="gl-${i}-title">${escapeHtml(g.title)}</h3>
    <p class="gl-card-body">${escapeHtml(g.body)}</p>
    ${renderGuidelineMedia(g)}
  `;
  glScroll.appendChild(card);
});

const glCards    = document.querySelectorAll('.gl-card');
const glNavItems = document.querySelectorAll('.gl-nav-item');

const glObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const idx = [...glCards].indexOf(e.target);
      glNavItems.forEach(n => {
        n.classList.remove('active');
        n.removeAttribute('aria-current');
      });
      if (glNavItems[idx]) {
        glNavItems[idx].classList.add('active');
        glNavItems[idx].setAttribute('aria-current', 'true');
      }
    }
  });
}, {
  threshold: 0.25,
  rootMargin: '-10% 0px -45% 0px',
});

glCards.forEach(card => glObserver.observe(card));

// ── FinSight Product Phone Animation ──
(function() {
  const demo = document.getElementById('finsightFrameDemo');
  const frames = content.meet?.app?.frames || [];
  if (!demo || !frames.length) return;

  frames.forEach((frame, index) => {
    const img = document.createElement('img');
    img.className = `finsight-frame${index === 0 ? ' active' : ''}`;
    img.src = frame.src;
    img.alt = frame.alt || '';
    if (index > 0) img.loading = 'lazy';
    demo.appendChild(img);
  });

  const frameEls = demo.querySelectorAll('.finsight-frame');
  let current = 0;
  const duration = 2200;

  function updateFrameAccessibility() {
    frameEls.forEach((frame, index) => {
      frame.setAttribute('aria-hidden', index === current ? 'false' : 'true');
    });
  }

  updateFrameAccessibility();
  if (prefersReducedMotion) return;

  function nextState() {
    frameEls[current].classList.remove('active');
    current = (current + 1) % frameEls.length;
    frameEls[current].classList.add('active');
    updateFrameAccessibility();
  }

  setInterval(nextState, duration);
})();

// ── Quote Marquees ──
(function() {
  const rows = content.quotes?.rows || [];
  const tracks = [
    document.getElementById('blvQuoteTrack'),
    document.getElementById('expertQuoteTrack'),
  ];

  function iconSvg(type) {
    if (type === 'building') {
      return `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 21V8l8-5 8 5v13" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M9 21v-7h6v7M8 10h.01M12 10h.01M16 10h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      `;
    }

    return `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    `;
  }

  rows.forEach((row, rowIndex) => {
    const track = tracks[rowIndex];
    if (!track) return;

    [...row.items, ...row.items].forEach((item, itemIndex) => {
      const cardIcon = item.icon || row.icon;
      const cardLabel = item.label || row.label;
      const isDuplicate = itemIndex >= row.items.length;
      const cardAvatar = item.logo
        ? `<img class="quote-logo" src="${escapeAttr(item.logo)}" alt="${escapeAttr(item.logoAlt || `${item.name} logo`)}" width="72" height="30" loading="lazy">`
        : iconSvg(cardIcon);
      const card = document.createElement('article');
      card.className = 'quote-card';
      if (isDuplicate) {
        card.setAttribute('aria-hidden', 'true');
      } else {
        card.setAttribute('aria-label', `${item.name}, ${cardLabel}: ${item.quote}`);
      }
      card.innerHTML = `
        <div class="quote-card-top">
          <div class="quote-avatar${item.logo ? ' quote-avatar-logo' : ''}">${cardAvatar}</div>
          <div>
            <div class="quote-person">${escapeHtml(item.name)}</div>
            <div class="quote-type">${escapeHtml(cardLabel)}</div>
          </div>
        </div>
        <p class="quote-card-text">"${escapeHtml(item.quote)}"</p>
      `;
      track.appendChild(card);
    });
  });
})();

// ── Team Cards ──
(function() {
  const grid = document.getElementById('teamCardsGrid');
  const members = content.team?.members || [];
  if (!grid) return;

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'team-member-card';
    card.setAttribute('role', 'group');
    card.setAttribute('aria-label', member.name || 'Team member');
    card.innerHTML = `
      ${member.image
        ? `<img class="team-member-photo" src="${escapeAttr(member.image)}" alt="${escapeAttr(member.imageAlt || `${member.name || 'Team member'} portrait`)}" loading="lazy">`
        : `<div class="team-member-photo team-member-photo-placeholder" role="img" aria-label="${escapeAttr(member.imageAlt || `${member.name || 'Team member'} portrait placeholder`)}">${escapeHtml(member.initials || '')}</div>`
      }
      <div class="member-name">${escapeHtml(member.name || '')}</div>
      <a href="${escapeAttr(member.linkedinUrl || '#')}" class="member-linkedin" target="_blank" rel="noopener noreferrer" aria-label="${escapeAttr(`Open ${member.name || 'team member'} LinkedIn profile`)}">${escapeHtml(member.linkedinText || '')}</a>
    `;
    grid.appendChild(card);
  });
})();

// ── Team Photos Marquee ──
(function() {
  const track = document.getElementById('teamMarqueeTrack');
  if (!track) return;

  const photoCount = content.team?.photoCount || 14;
  const photosMarqueeLabel = content.team?.photosMarqueeLabel || 'Decorative carousel of team process photos moving in a continuous loop.';
  const srcs = Array.from({ length: photoCount }, (_, i) => `assets/teampictures/${i + 1}.png`);
  track.setAttribute('role', 'img');
  track.setAttribute('aria-label', photosMarqueeLabel);
  // duplicate for seamless infinite loop
  [...srcs, ...srcs].forEach(src => {
    const img = document.createElement('img');
    img.className = 'marquee-scroll-photo';
    img.src = src;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.loading = 'lazy';
    track.appendChild(img);
  });
})();
