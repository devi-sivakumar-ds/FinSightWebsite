// ── Navbar shadow on scroll ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
});

// ── Cycling headline word ──
(function() {
  const words = ['Independence', 'Confidence', 'Autonomy'];
  const wrapper = document.getElementById('cyclingWrapper');
  const el = document.getElementById('cyclingWord');
  if (!wrapper || !el) return;

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
    wrapper.style.width = Math.ceil(maxW + 8) + 'px';
  }
  setWrapperWidth();
  window.addEventListener('resize', setWrapperWidth);

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
const screens = document.querySelectorAll('.screen');
let currentScreen = 0;

function cycleScreen() {
  const prev = currentScreen;
  currentScreen = (currentScreen + 1) % screens.length;

  screens[prev].classList.remove('active');
  screens[prev].classList.add('exit');

  setTimeout(() => {
    screens[prev].classList.remove('exit');
    screens[currentScreen].classList.add('active');
  }, 420);
}

setInterval(cycleScreen, 2600);

// ── Stats counter and visualization animation ──
(function() {
  const statEls = document.querySelectorAll('.stat-number[data-count]');
  const barFills = document.querySelectorAll('.bar-fill[data-target-width]');
  const arcFrustrated = document.querySelector('.arc-path-frustrated');
  const arcAttempts = document.querySelector('.arc-path-attempts');
  const figuresRow = document.getElementById('figuresRow');
  const statsSection = document.querySelector('.stats-section');

  if (figuresRow && !figuresRow.children.length) {
    for (let i = 0; i < 10; i++) {
      const color = i < 8 ? 'var(--blue)' : 'var(--text-light)';
      figuresRow.insertAdjacentHTML('beforeend', `
        <svg class="stick-figure" viewBox="0 0 22 36" aria-hidden="true">
          <circle cx="11" cy="5" r="4" fill="${color}"/>
          <line x1="11" y1="9" x2="11" y2="24" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
          <line x1="4" y1="14" x2="18" y2="14" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
          <line x1="11" y1="24" x2="5" y2="34" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
          <line x1="11" y1="24" x2="17" y2="34" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `);
    }
  }

  if (!statsSection) return;

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

      setTimeout(() => {
        barFills.forEach(fill => {
          fill.style.width = fill.dataset.targetWidth;
        });
      }, 100);

      if (arcFrustrated) animateArc(arcFrustrated, 68, 1200);
      if (arcAttempts) animateArc(arcAttempts, 29, 1200);

      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
})();

// ── Design Guidelines ──
const guidelines = [
  {
    title: 'Action-first button labels',
    body: 'Every interactive element should announce what it does before what it is. Screen readers read labels verbatim — make every word purposeful.',
    image: 'assets/insight-1.svg',
  },
  {
    title: 'Announce state changes immediately',
    body: 'When UI state changes (loading, error, success), announce it right away via ARIA live regions. Blind users cannot see visual feedback — don\'t leave them guessing.',
  },
  {
    title: 'Audio confirmation for every transaction',
    body: 'Every financial action needs a clear spoken confirmation. Never rely on color changes or subtle animations as the sole signal.',
  },
  {
    title: 'Group related context together',
    body: 'Screen reader users navigate linearly. Scatter information and the mental model breaks. Keep related content — label, value, action — in a single, logical group.',
  },
  {
    title: 'Warn before time limits expire',
    body: 'If a session or action has a time limit, announce the warning early and give users a keyboard- or swipe-accessible way to extend it.',
  },
  {
    title: 'Single-swipe navigation paths',
    body: 'Design flows so every action is reachable with a single swipe or tab. Avoid nested menus that require multiple gestures to traverse.',
  },
  {
    title: 'Vocalize all progress indicators',
    body: 'Spinners and progress bars are invisible to screen readers. Always pair loading states with a text announcement: "Processing your deposit, please wait."',
  },
  {
    title: 'Pair haptic and audio feedback',
    body: 'Combine haptic feedback with audio cues for critical moments — confirmations, errors, and warnings. Multiple sensory channels reinforce clarity.',
  },
];

const glNav    = document.querySelector('.gl-nav');
const glScroll = document.getElementById('guidelinesScroll');

guidelines.forEach((g, i) => {
  const num = String(i + 1).padStart(2, '0');

  const navItem = document.createElement('a');
  navItem.className = 'gl-nav-item' + (i === 0 ? ' active' : '');
  navItem.href = `#gl-${i}`;
  navItem.innerHTML = `<span class="gl-num">${i + 1}</span><span>${g.title}</span>`;
  glNav.appendChild(navItem);

  const card = document.createElement('div');
  card.className = 'gl-card';
  card.id = `gl-${i}`;
  card.innerHTML = `
    <div class="gl-card-num">${num}</div>
    <h3 class="gl-card-title">${g.title}</h3>
    <p class="gl-card-body">${g.body}</p>
    ${g.image ? `<div class="gl-card-media"><img src="${g.image}" alt="" loading="lazy"></div>` : ''}
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
      glNavItems.forEach(n => n.classList.remove('active'));
      if (glNavItems[idx]) glNavItems[idx].classList.add('active');
    }
  });
}, {
  threshold: 0.25,
  rootMargin: '-10% 0px -45% 0px',
});

glCards.forEach(card => glObserver.observe(card));

// ── Team Photos Marquee ──
(function() {
  const track = document.getElementById('teamMarqueeTrack');
  if (!track) return;

  const photoCount = 14;
  const srcs = Array.from({ length: photoCount }, (_, i) => `assets/teampictures/${i + 1}.png`);
  // duplicate for seamless infinite loop
  [...srcs, ...srcs].forEach((src, i) => {
    const img = document.createElement('img');
    img.className = 'marquee-scroll-photo';
    img.src = src;
    img.alt = `Team photo ${(i % photoCount) + 1}`;
    img.loading = 'lazy';
    track.appendChild(img);
  });
})();
