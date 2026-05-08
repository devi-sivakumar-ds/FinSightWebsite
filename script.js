const content = window.FINSIGHT_CONTENT || {};
if (!window.FINSIGHT_CONTENT) {
  console.warn('FinSight content.js did not load. Check that content.js is committed and published next to index.html.');
}

function getContent(path) {
  return path.split('.').reduce((value, key) => {
    if (value == null) return undefined;
    return value[key];
  }, content);
}

function applyStaticContent() {
  if (content.pageTitle) document.title = content.pageTitle;

  document.querySelectorAll('[data-content]').forEach(el => {
    const value = getContent(el.dataset.content);
    if (value !== undefined) el.textContent = value;
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

  const bars = stats[1]?.bars || [];
  document.querySelectorAll('.bar-fill[data-bar-index]').forEach(el => {
    const bar = bars[Number(el.dataset.barIndex)];
    if (bar) el.dataset.targetWidth = bar.width;
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
const guidelines = content.guidelines?.items || [];

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

// ── Team Cards ──
(function() {
  const grid = document.getElementById('teamCardsGrid');
  const members = content.team?.members || [];
  if (!grid) return;

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = 'team-member-card';
    card.innerHTML = `
      ${member.image
        ? `<img class="team-member-photo" src="${member.image}" alt="${member.imageAlt || member.name || ''}" loading="lazy">`
        : `<div class="team-member-photo team-member-photo-placeholder" aria-label="${member.imageAlt || ''}">${member.initials || ''}</div>`
      }
      <div class="member-name">${member.name || ''}</div>
      <a href="${member.linkedinUrl || '#'}" class="member-linkedin" target="_blank" rel="noopener noreferrer">${member.linkedinText || ''}</a>
    `;
    grid.appendChild(card);
  });
})();

// ── Team Photos Marquee ──
(function() {
  const track = document.getElementById('teamMarqueeTrack');
  if (!track) return;

  const photoCount = content.team?.photoCount || 14;
  const photoAltPrefix = content.team?.photoAltPrefix || '';
  const srcs = Array.from({ length: photoCount }, (_, i) => `assets/teampictures/${i + 1}.png`);
  // duplicate for seamless infinite loop
  [...srcs, ...srcs].forEach((src, i) => {
    const img = document.createElement('img');
    img.className = 'marquee-scroll-photo';
    img.src = src;
    img.alt = `${photoAltPrefix} ${(i % photoCount) + 1}`.trim();
    img.loading = 'lazy';
    track.appendChild(img);
  });
})();
