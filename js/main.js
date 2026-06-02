// ========== LOADING SCREEN ==========
(function () {
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = `
    <div class="loader-bg-grid"></div>
    <div class="loader-glow-orb pink"></div>
    <div class="loader-glow-orb purple"></div>
    <div class="loader-content">
      <div class="loader-logo-wrap">
        <div class="loader-ring"></div>
        <div class="loader-ring-2"></div>
        <img src="assets/prx-logo.jpg" alt="PRX" class="loader-logo-img">
      </div>
      <div class="loader-title">PRXPedia</div>
      <div class="loader-subtitle">The undisputed best team in APAC</div>
      <div class="loader-progress-wrap"><div class="loader-progress"></div></div>
      <div class="loader-dots">
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
      </div>
    </div>`;
  document.body.prepend(loader);
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 700);
    }, 1600);
  });
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 700);
  }, 3000);
})();

// ========== NAVIGATION ==========
function buildNav(activePage) {
  const pages = [
    { href: 'players.html', label: 'Players' },
    { href: 'settings.html', label: 'Settings' },
    { href: 'schedule.html', label: 'Schedule' },
    { href: 'results.html', label: 'Results' },
    { href: 'trophies.html', label: 'Trophies' },
    { href: 'about.html', label: 'About' }
  ];
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <img src="assets/prx-logo.jpg" alt="PRX" class="nav-logo-img">
      <span class="nav-logo-text">PRXPedia</span>
    </a>
    <nav class="nav-links" id="nav-links">
      ${pages.map(p => `<a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a>`).join('')}
    </nav>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>`;
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ========== FOOTER ==========
function buildFooter() {
  const footer = document.getElementById('main-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-brand">
        <div class="footer-logo">
          <div class="footer-logo-icon">PRX</div>
          <span class="footer-logo-text">PRXPedia</span>
        </div>
        <p class="footer-desc">Your #1 source for everything Paper Rex — roster, settings, schedule, results, and trophies. Built by fans, for fans.</p>
        <p style="font-size:0.8rem;color:var(--pink);font-style:italic;margin-top:-0.25rem;">The undisputed best team in APAC.</p>
        <div class="footer-socials">
          <a href="https://twitter.com/PaperRex" target="_blank" class="footer-social-btn" title="Twitter">𝕏</a>
          <a href="https://instagram.com/paperrex" target="_blank" class="footer-social-btn" title="Instagram">📷</a>
          <a href="https://youtube.com/@paperrex" target="_blank" class="footer-social-btn" title="YouTube">▶</a>
          <a href="https://twitch.tv/paperrex" target="_blank" class="footer-social-btn" title="Twitch">🎮</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <div class="footer-links">
          <a href="index.html">Home</a>
          <a href="players.html">Players</a>
          <a href="settings.html">Player Settings</a>
          <a href="schedule.html">Match Schedule</a>
          <a href="results.html">Results</a>
          <a href="trophies.html">Trophies</a>
          <a href="about.html">About Team</a>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Players</div>
        <div class="footer-links">
          ${PRX_DATA.players.map(p => `<a href="player.html?id=${p.id}">${p.ign}</a>`).join('')}
        </div>
      </div>
      <div>
        <div class="footer-col-title">External</div>
        <div class="footer-links">
          <a href="https://liquipedia.net/valorant/Paper_Rex" target="_blank">Liquipedia</a>
          <a href="https://www.vlr.gg/team/2/paper-rex" target="_blank">VLR.gg</a>
          <a href="https://valorantesports.com" target="_blank">VCT Official</a>
          <a href="https://paperrex.gg" target="_blank">Official Site</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 <span class="footer-bottom-brand">PRXPedia</span>. Fan-made website. Not affiliated with Paper Rex.</span>
      <span>Made with 💜 by PRX Fans</span>
    </div>`;
}

// ========== PARTICLES ==========
function spawnParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = ['#FF4FA3', '#7B2CBF', '#c060b0', '#FF4FA3', '#ffffff'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1.5;
    p.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}%;
      bottom:-10px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      box-shadow:0 0 ${size * 2}px ${colors[Math.floor(Math.random() * colors.length)]};
      --drift:${(Math.random() - 0.5) * 120}px;
      animation-duration:${Math.random() * 8 + 6}s;
      animation-delay:${Math.random() * 8}s;
      opacity:0;
    `;
    container.appendChild(p);
  }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));
}

// ========== COUNTER ANIMATION ==========
function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  const isDecimal = String(target).includes('.');
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = eased * target;
    el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = 'true';
        const target = parseFloat(e.target.dataset.count);
        const suffix = e.target.dataset.suffix || '';
        animateCounter(e.target, target, suffix);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
}

// ========== CARD TILT EFFECT ==========
function initCardTilt() {
  document.querySelectorAll('.player-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
}

// ========== TOAST ==========
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.borderColor = type === 'success' ? 'var(--green)' : 'var(--pink)';
  toast.style.color = type === 'success' ? 'var(--green)' : 'var(--pink)';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== COPY CROSSHAIR ==========
function copyCrosshair(code, btn) {
  navigator.clipboard.writeText(code).then(() => {
    showToast('✓ Crosshair code copied!');
    if (btn) {
      btn.classList.add('copied');
      const old = btn.innerHTML;
      btn.innerHTML = '<span class="btn-icon">✓</span> COPIED!';
      setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = old; }, 2000);
    }
  }).catch(() => showToast('✓ Copy it manually!', 'error'));
}

// ========== FORMAT DATE ==========
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ========== COUNTDOWN ==========
function getCountdown(dateStr, timeStr) {
  const target = new Date(`${dateStr}T${timeStr}:00+08:00`);
  const diff = target - new Date();
  if (diff <= 0) return 'LIVE';
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return `${days}d ${hrs}h`;
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}

// ========== ROLE BADGE ==========
function roleBadge(role, color) {
  return `<div class="player-role-badge" style="background:${color}22;border:1px solid ${color}55;color:${color}">${role}</div>`;
}

// ========== BUILD PLAYER CARD ==========
function buildPlayerCard(player, delay = 0) {
  return `
    <a href="player.html?id=${player.id}" class="player-card" data-anim="zoom" data-delay="${delay}" style="text-decoration:none;">
      <div class="player-img-wrapper">
        <img src="${player.image}" alt="${player.ign}" class="player-img" loading="lazy">
        <div class="player-img-overlay"></div>
        ${roleBadge(player.role, player.roleColor)}
      </div>
      <div class="player-card-info">
        <div class="player-flag-country"><span>${player.flag}</span><span>${player.country}</span></div>
        <div class="player-ign">${player.ign}</div>
        <div class="player-real-name">${player.realName}</div>
        <div class="player-card-footer">
          <div class="status-dot">Active Roster</div>
          <span class="card-arrow">→</span>
        </div>
      </div>
    </a>`;
}

// ========== BUILD MATCH CARD ==========
function buildMatchCard(match, delay = 0) {
  const countdown = getCountdown(match.date, match.time);
  const isLive = countdown === 'LIVE';
  return `
    <div class="match-card" data-anim="up" data-delay="${delay}">
      <div class="match-tournament">${match.tournament}<span class="match-stage">— ${match.stage}</span></div>
      <div class="match-teams">
        <div class="match-team">
          <div class="match-team-tag prx">PRX</div>
          <div class="match-team-name">Paper Rex</div>
        </div>
        <div class="match-vs">VS</div>
        <div class="match-team">
          <div class="match-team-tag">${match.opponentTag}</div>
          <div class="match-team-name">${match.opponent}</div>
        </div>
        <span class="match-format-badge">${match.format}</span>
      </div>
      <div class="match-meta">
        <span class="match-meta-item">📅 ${formatDate(match.date)}</span>
        <span class="match-meta-item">🕐 ${match.time} ${match.timezone}</span>
        ${isLive
          ? `<span class="countdown-badge" style="color:var(--green);border-color:var(--green);animation:none;">● LIVE</span>`
          : `<span class="countdown-badge">⏱ ${countdown}</span>`}
      </div>
      <a href="${match.stream}" target="_blank" class="match-stream-btn">▶ Watch Stream</a>
    </div>`;
}

// ========== BUILD RESULT ROW ==========
function buildResultRow(result, delay = 0) {
  const cls = result.result.toLowerCase();
  return `
    <div class="result-row ${cls}" data-anim="left" data-delay="${delay}">
      <div class="result-opponent">${result.opponent}</div>
      <div class="result-tournament">${result.tournament} — ${result.stage}</div>
      <div class="result-score">${result.score}</div>
      <div class="result-badge ${cls}">${result.result}</div>
      <div class="result-date">${formatDate(result.date)}</div>
    </div>`;
}

// ========== BUILD TROPHY CARD ==========
function buildTrophyCard(trophy, delay = 0) {
  const typeClass = trophy.type.toLowerCase().replace(/\s/g, '');
  const imgHtml = trophy.image
    ? `<img src="${trophy.image}" alt="${trophy.tournament}" style="width:100%;height:100%;object-fit:cover;object-position:center top;transition:transform 0.5s ease;">`
    : `<span class="trophy-icon-large">${trophy.icon}</span>`;
  return `
    <div class="trophy-card" data-anim="zoom" data-delay="${delay}" onmouseenter="this.querySelector('img') && (this.querySelector('img').style.transform='scale(1.07)')" onmouseleave="this.querySelector('img') && (this.querySelector('img').style.transform='')">
      <div class="trophy-card-image" style="overflow:hidden;position:relative;">
        ${imgHtml}
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(13,13,15,0.85) 0%,rgba(13,13,15,0.2) 50%,transparent 100%);pointer-events:none;"></div>
        <div style="position:absolute;top:0.75rem;left:0.75rem;display:flex;align-items:center;gap:0.4rem;background:rgba(13,13,15,0.7);backdrop-filter:blur(8px);border:1px solid rgba(255,184,0,0.4);border-radius:4px;padding:0.25rem 0.65rem;font-family:'Barlow Condensed',sans-serif;font-size:0.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);">
          🥇 CHAMPIONS
        </div>
        <div style="position:absolute;top:0.75rem;right:0.75rem;background:rgba(13,13,15,0.7);backdrop-filter:blur(8px);border:1px solid var(--border);border-radius:4px;padding:0.2rem 0.5rem;font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;font-weight:700;color:var(--gray-300);">${trophy.year}</div>
      </div>
      <div class="trophy-card-body">
        <div class="trophy-tournament-name">${trophy.tournament}</div>
        <div class="trophy-card-footer">
          <div class="trophy-placement">🏅 ${trophy.placement}</div>
          <div class="trophy-prize">${trophy.prizeMoney}</div>
        </div>
      </div>
    </div>`;
}

// ========== PLAYER DETAIL ==========
function buildPlayerDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const player = PRX_DATA.players.find(p => p.id === id);
  const container = document.getElementById('player-detail-content');
  if (!player) {
    container.innerHTML = `<div style="text-align:center;padding:5rem;color:var(--gray-300);"><h2 style="font-family:'Barlow Condensed',sans-serif;font-size:2rem;">Player not found</h2><a href="players.html" class="btn btn-outline" style="margin-top:1.5rem;display:inline-flex;">← Back to Players</a></div>`;
    return;
  }
  document.title = `${player.ign} — PRXPedia`;
  const s = player.settings;

  const displayRows = [
    ['Display Mode', s.video.displayMode],
    ['Resolution', s.video.resolution],
    ['Aspect Ratio', s.video.aspectRatio],
    ['Frame Rate Limit', s.video.frameRate],
    ['VSync', s.video.vsync],
  ];
  const qualityRows = [
    ['Material Quality', s.video.materialQuality],
    ['Texture Quality', s.video.textureQuality],
    ['Detail Quality', s.video.detailQuality],
    ['UI Quality', s.video.uiQuality],
    ['VFX Quality', s.video.vfxQuality],
    ['Cast Shadows', s.video.castShadows],
  ];
  const graphicsLeft = [
    ['Anti-Aliasing', s.video.antiAliasing],
    ['Anisotropic Filtering', s.video.anisotropicFiltering],
    ['Improve Clarity', s.video.improveClarity],
    ['Experimental Sharpening', s.video.experimentalSharpening],
  ];
  const graphicsRight = [
    ['Bloom', s.video.bloom],
    ['Distortion', s.video.distortion],
    ['First Person Shadows', s.video.firstPersonShadows],
    ['Vignette', s.video.vignette],
  ];

  function valClass(v) {
    if (v === 'On') return 'on';
    if (v === 'Off' || v === 'None' || v === '0%') return 'off';
    return 'value';
  }

  const gearItems = [
    { icon: '🖱️', type: 'Mouse', name: s.gear.mouse },
    { icon: '⌨️', type: 'Keyboard', name: s.gear.keyboard },
    { icon: '🎧', type: 'Headset', name: s.gear.headset },
    { icon: '🖱', type: 'Mousepad', name: s.gear.mousepad },
    { icon: '🖥️', type: 'Monitor', name: s.gear.monitor },
  ];

  container.innerHTML = `
    <a href="players.html" class="back-btn">← Back to Players</a>
    <div class="player-detail-layout">
      <div>
        <div class="player-profile-card">
          <img src="${player.image}" alt="${player.ign}" class="player-profile-img">
          <div class="player-profile-info">
            <div class="player-profile-badges">
              <div class="player-country-badge">${player.flag} ${player.country}</div>
              <div style="display:inline-flex;padding:0.25rem 0.6rem;border-radius:4px;background:${player.roleColor}22;border:1px solid ${player.roleColor}55;color:${player.roleColor};font-family:'Barlow Condensed',sans-serif;font-size:0.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;">${player.role}</div>
            </div>
            <div class="player-profile-ign">${player.ign}</div>
            <div class="player-profile-name">${player.realName}</div>
            <div class="player-profile-country">${player.country}</div>
            <div class="player-status">${player.status}</div>
          </div>
        </div>
        <div style="margin-top:1.25rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:1.5rem;">
          <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:0.75rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gray-400);margin-bottom:0.75rem;">About</div>
          <p style="font-size:0.85rem;color:var(--gray-200);line-height:1.75;">${player.bio}</p>
        </div>
      </div>
      <div>
        <div class="settings-panel">
          <div class="settings-panel-title">Mouse Settings</div>
          <div class="mouse-stats-grid" style="grid-template-columns:repeat(4,1fr)">
            <div class="mouse-stat-box"><div class="mouse-stat-label">Sensitivity</div><div class="mouse-stat-value">${s.mouse.sensitivity}</div></div>
            <div class="mouse-stat-box"><div class="mouse-stat-label">DPI</div><div class="mouse-stat-value">${s.mouse.dpi}</div></div>
            <div class="mouse-stat-box"><div class="mouse-stat-label">eDPI</div><div class="mouse-stat-value">${s.mouse.edpi}</div></div>
            <div class="mouse-stat-box"><div class="mouse-stat-label">Polling Rate</div><div class="mouse-stat-value" style="font-size:1rem;">${s.mouse.hz} Hz</div></div>
          </div>
          <div class="mouse-stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:1.25rem;">
            <div class="mouse-stat-box"><div class="mouse-stat-label">Windows Sens</div><div class="mouse-stat-value" style="font-size:1rem;">${s.mouse.windowsSens}</div></div>
            <div class="mouse-stat-box"><div class="mouse-stat-label">Raw Input</div><div class="mouse-stat-value" style="font-size:1rem;color:var(--green)">${s.mouse.rawInput}</div></div>
            <div class="mouse-stat-box"><div class="mouse-stat-label">Scope Sens</div><div class="mouse-stat-value" style="font-size:1rem;">${s.mouse.scopeSens}</div></div>
          </div>
          <div class="crosshair-box">
            <div style="flex:1;min-width:0;">
              <div class="crosshair-label">Crosshair Code</div>
              <div class="crosshair-code" id="ch-code-${player.id}">${s.mouse.crosshairCode}</div>
            </div>
            <button class="crosshair-copy-btn" id="copy-btn-${player.id}" onclick="copyCrosshair('${s.mouse.crosshairCode}', this)">
              <span class="btn-icon">⧉</span> COPY CODE
            </button>
          </div>
        </div>

        <div class="settings-panel">
          <div class="settings-panel-title">Video Settings</div>
          <div class="video-settings-grid">
            <div class="video-settings-col">
              <div class="video-col-label">Display</div>
              <table class="video-settings-table">
                ${displayRows.map(([k,v]) => `<tr><td>${k}</td><td class="${valClass(v)}">${v}</td></tr>`).join('')}
              </table>
            </div>
            <div class="video-settings-col">
              <div class="video-col-label">Graphics Quality</div>
              <table class="video-settings-table">
                ${qualityRows.map(([k,v]) => `<tr><td>${k}</td><td class="${valClass(v)}">${v}</td></tr>`).join('')}
              </table>
            </div>
          </div>
          <div class="graphics-table">
            <div class="graphics-label">Graphics Options</div>
            <div>
              ${graphicsLeft.map(([k,v]) => `<div class="graphics-row"><span>${k}</span><span class="${valClass(v)}">${v}</span></div>`).join('')}
            </div>
            <div>
              ${graphicsRight.map(([k,v]) => `<div class="graphics-row"><span>${k}</span><span class="${valClass(v)}">${v}</span></div>`).join('')}
            </div>
          </div>
        </div>

        <div class="settings-panel">
          <div class="settings-panel-title">Gaming Gear</div>
          <div class="gear-list">
            ${gearItems.map(g => `
              <div class="gear-item">
                <div class="gear-icon">${g.icon}</div>
                <div class="gear-info">
                  <div class="gear-type">${g.type}</div>
                  <div class="gear-name">${g.name}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ========== SETTINGS COMPARISON ==========
function buildSettingsPage() {
  const players = PRX_DATA.players;
  const container = document.getElementById('settings-content');
  if (!container) return;
  const rows = [
    { label: 'MOUSE SETTINGS', isHeader: true },
    { label: 'Sensitivity', key: 'mouse.sensitivity' },
    { label: 'DPI', key: 'mouse.dpi' },
    { label: 'eDPI', key: 'mouse.edpi' },
    { label: 'Polling Rate', key: 'mouse.hz', suffix: ' Hz' },
    { label: 'Windows Sensitivity', key: 'mouse.windowsSens' },
    { label: 'Raw Input Buffer', key: 'mouse.rawInput' },
    { label: 'Scope Sensitivity', key: 'mouse.scopeSens' },
    { label: 'Resolution', key: 'mouse.resolution' },
    { label: 'Aspect Ratio', key: 'mouse.aspectRatio' },
    { label: 'VIDEO SETTINGS', isHeader: true },
    { label: 'Display Mode', key: 'video.displayMode' },
    { label: 'Frame Rate Limit', key: 'video.frameRate' },
    { label: 'VSync', key: 'video.vsync' },
    { label: 'Anti-Aliasing', key: 'video.antiAliasing' },
    { label: 'Material Quality', key: 'video.materialQuality' },
    { label: 'Texture Quality', key: 'video.textureQuality' },
    { label: 'Detail Quality', key: 'video.detailQuality' },
    { label: 'UI Quality', key: 'video.uiQuality' },
    { label: 'VFX Quality', key: 'video.vfxQuality' },
    { label: 'Cast Shadows', key: 'video.castShadows' },
    { label: 'Improve Clarity', key: 'video.improveClarity' },
    { label: 'Bloom', key: 'video.bloom' },
    { label: 'Distortion', key: 'video.distortion' },
    { label: 'First Person Shadows', key: 'video.firstPersonShadows' },
    { label: 'GAMING GEAR', isHeader: true },
    { label: 'Mouse', key: 'gear.mouse' },
    { label: 'Keyboard', key: 'gear.keyboard' },
    { label: 'Headset', key: 'gear.headset' },
    { label: 'Mousepad', key: 'gear.mousepad' },
    { label: 'Monitor', key: 'gear.monitor' },
  ];
  function getVal(player, key) {
    return key.split('.').reduce((o, k) => o?.[k], player.settings) ?? '—';
  }
  container.innerHTML = `
    <div style="overflow-x:auto;">
      <table class="settings-comparison-table">
        <thead>
          <tr>
            <th>Setting</th>
            ${players.map(p => `<th><a href="player.html?id=${p.id}" style="color:var(--pink);text-decoration:none;">${p.ign}</a></th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => {
            if (row.isHeader) return `<tr class="section-row"><td colspan="${players.length + 1}">${row.label}</td></tr>`;
            return `<tr>
              <td>${row.label}</td>
              ${players.map(p => {
                const v = getVal(p, row.key) + (row.suffix || '');
                const style = v.includes('On') ? 'style="color:var(--green)"' :
                              (v.includes('Off') || v === 'None' || v.includes('0%')) ? 'style="color:var(--gray-400)"' : '';
                return `<td ${style}>${v}</td>`;
              }).join('')}
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`;
}

// ========== SCHEDULE PAGE ==========
function buildSchedulePage() {
  const container = document.getElementById('schedule-content');
  if (!container) return;
  container.innerHTML = `
    <div style="overflow-x:auto;">
      <table class="schedule-table">
        <thead><tr>
          <th>Date</th><th>Time (SGT)</th><th>Match</th>
          <th class="schedule-tournament-col">Tournament</th>
          <th class="schedule-stage-col">Stage</th>
          <th>Format</th><th>Stream</th>
        </tr></thead>
        <tbody>
          ${PRX_DATA.schedule.map(m => `
            <tr data-anim="left">
              <td class="schedule-date-col">${formatDate(m.date)}</td>
              <td class="schedule-time-col">${m.time}</td>
              <td><div class="schedule-vs-col">
                <span class="schedule-prx">PRX</span>
                <span class="schedule-vs-text">VS</span>
                <span class="schedule-opponent">${m.opponent}</span>
              </div></td>
              <td class="schedule-tournament-col">${m.tournament}</td>
              <td class="schedule-stage-col">${m.stage}</td>
              <td><span class="schedule-format-badge">${m.format}</span></td>
              <td><a href="${m.stream}" target="_blank" class="schedule-stream-btn">▶ Watch</a></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// ========== RESULTS PAGE ==========
function buildResultsPage() {
  const container = document.getElementById('results-content');
  if (!container) return;
  const wins = PRX_DATA.results.filter(r => r.result === 'WIN').length;
  const losses = PRX_DATA.results.filter(r => r.result === 'LOSS').length;
  const winrate = Math.round(wins / PRX_DATA.results.length * 100);
  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2.5rem;">
      <div class="mouse-stat-box" data-anim="up" data-delay="1"><div class="mouse-stat-label">Win Rate</div><div class="mouse-stat-value" style="color:var(--green)" data-count="${winrate}" data-suffix="%">0%</div></div>
      <div class="mouse-stat-box" data-anim="up" data-delay="2"><div class="mouse-stat-label">Wins</div><div class="mouse-stat-value" style="color:var(--green)" data-count="${wins}">0</div></div>
      <div class="mouse-stat-box" data-anim="up" data-delay="3"><div class="mouse-stat-label">Losses</div><div class="mouse-stat-value" style="color:var(--red)" data-count="${losses}">0</div></div>
    </div>
    <div class="results-list">
      ${PRX_DATA.results.map((r, i) => buildResultRow(r, (i % 5) + 1)).join('')}
    </div>`;
}

// ========== TROPHIES PAGE ==========
function buildTrophiesPage() {
  const container = document.getElementById('trophies-content');
  if (!container) return;
  const totalPrize = PRX_DATA.trophies.reduce((a, t) => a + parseInt(t.prizeMoney.replace(/\D/g, '')), 0);
  const champCount = PRX_DATA.trophies.filter(t => t.type === 'Champions').length;
  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2.5rem;">
      <div class="mouse-stat-box" data-anim="up" data-delay="1"><div class="mouse-stat-label">Total Titles</div><div class="mouse-stat-value" style="color:var(--gold)" data-count="${PRX_DATA.trophies.length}">0</div></div>
      <div class="mouse-stat-box" data-anim="up" data-delay="2"><div class="mouse-stat-label">Championships</div><div class="mouse-stat-value" style="color:var(--gold)" data-count="${champCount}">0</div></div>
      <div class="mouse-stat-box" data-anim="up" data-delay="3"><div class="mouse-stat-label">Total Prize Money</div><div class="mouse-stat-value" style="font-size:1.1rem;color:var(--gold)" data-count="${totalPrize/1000}" data-suffix="K">$0K</div></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;">
      ${PRX_DATA.trophies.map((t, i) => buildTrophyCard(t, (i % 3) + 1)).join('')}
    </div>`;
}

// ========== HOME PAGE ==========
function buildHomePage() {
  const mc = document.getElementById('home-matches');
  if (mc) mc.innerHTML = PRX_DATA.schedule.slice(0, 3).map((m, i) => buildMatchCard(m, i + 1)).join('');
  const pc = document.getElementById('home-players');
  if (pc) pc.innerHTML = PRX_DATA.players.map((p, i) => buildPlayerCard(p, i + 1)).join('');
  const rc = document.getElementById('home-results');
  if (rc) rc.innerHTML = PRX_DATA.results.slice(0, 5).map((r, i) => buildResultRow(r, i + 1)).join('');
  const tc = document.getElementById('home-trophies');
  if (tc) tc.innerHTML = PRX_DATA.trophies.slice(0, 3).map((t, i) => buildTrophyCard(t, i + 1)).join('');
}

// ========== PLAYERS PAGE ==========
function buildPlayersPage() {
  const container = document.getElementById('players-content');
  if (!container) return;
  container.innerHTML = PRX_DATA.players.map((p, i) => buildPlayerCard(p, i + 1)).join('');
}

// ========== ABOUT PAGE ==========
function buildAboutPage() {
  const container = document.getElementById('about-content');
  if (!container) return;
  container.innerHTML = `
    <div class="about-full-grid" data-anim="up">
      <div class="about-full-card">
        <div class="section-label">THE ORGANIZATION</div>
        <h2 class="section-title" style="margin-bottom:1.5rem;">ABOUT <span class="highlight">PAPER REX</span></h2>
        <p style="color:var(--gray-200);line-height:1.8;margin-bottom:1.25rem;font-size:0.92rem;">Paper Rex (PRX) is a Singaporean esports organization founded in 2020. Best known for their VALORANT team, PRX has cemented itself as one of the most exciting and successful teams in the Pacific region.</p>
        <p style="color:var(--gray-200);line-height:1.8;margin-bottom:1.25rem;font-size:0.92rem;">Their "WGAMING" playstyle — relentless aggression, unconventional strategies, and willingness to take every fight — has made them fan favorites worldwide and earned them 6 championship titles.</p>
        <p style="color:var(--gray-200);line-height:1.8;font-size:0.92rem;">Competing in VCT Pacific, PRX has been at the forefront of competitive Valorant, representing the Pacific region on the global stage.</p>
      </div>
      <div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
          <div class="about-stat-card"><div class="about-stat-value pink" data-count="6">0</div><div class="about-stat-label">Championship Titles</div></div>
          <div class="about-stat-card"><div class="about-stat-value gold" data-count="2020">0</div><div class="about-stat-label">Year Founded</div></div>
          <div class="about-stat-card"><div class="about-stat-value pink">#1</div><div class="about-stat-label">APAC Ranking</div></div>
          <div class="about-stat-card"><div class="about-stat-value" style="font-family:'Barlow Condensed',sans-serif;font-size:2.5rem;font-weight:800;color:var(--purple);">W</div><div class="about-stat-label">WGAMING Style</div></div>
        </div>
        <div class="about-philosophy-card">
          <div class="about-philosophy-header">
            <div class="prx-logo-small">PRX</div>
            <div class="about-philosophy-title">THE WGAMING PHILOSOPHY</div>
          </div>
          <p class="about-philosophy-desc">Paper Rex revolutionized competitive Valorant with full-aggression "WGAMING" — a style built on taking every duel, manufacturing chaos, and forcing opponents to react.</p>
          <a href="players.html" class="btn btn-primary" style="align-self:flex-start;">View Roster →</a>
        </div>
      </div>
    </div>
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:2.5rem;margin-bottom:2rem;" data-anim="up">
      <div class="section-label">TEAM HISTORY</div>
      <h3 class="section-title" style="margin-bottom:2.5rem;">JOURNEY TO THE <span class="highlight">TOP</span></h3>
      <div class="about-timeline">
        ${[
          { year: '2020', icon: '🚀', event: 'Founded in Singapore', desc: 'Paper Rex was established as a multi-game esports organization based in Singapore.' },
          { year: '2022', icon: '⚡', event: 'First International Title', desc: 'PRX burst onto the scene winning the VALORANT India Invitational 2022.' },
          { year: '2023', icon: '🏆', event: 'Pacific League Champions', desc: 'PRX won the VCT Pacific League 2023, establishing dominance in the region.' },
          { year: '2024', icon: '👑', event: 'Pacific Stage 1 Champions', desc: 'Continued their reign with VCT Pacific Stage 1 2024 championship.' },
          { year: '2025', icon: '🌍', event: 'Masters Toronto Champions', desc: 'PRX captured the VALORANT Masters Toronto 2025, their first global Masters title.' },
          { year: '2026', icon: '🔥', event: '6th Championship Title', desc: 'VCT Pacific Stage 1 2026 — PRX continues their dynasty as APAC\'s best.' },
        ].map(t => `
          <div class="timeline-item">
            <div class="timeline-dot">${t.icon}</div>
            <div class="timeline-content">
              <div class="timeline-year">${t.year}</div>
              <div class="timeline-event">${t.event}</div>
              <div class="timeline-desc">${t.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:2.5rem;" data-anim="up">
      <div class="section-label">COACHING STAFF</div>
      <h3 class="section-title" style="margin-bottom:2rem;">THE TEAM <span class="highlight">BEHIND</span> THE TEAM</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;">
        ${[
          { role: 'Head Coach', name: 'alecks', realName: 'Alexandre Sallé', flag: '🇫🇷' },
          { role: 'Assistant Coach', name: 'Wendler', realName: 'Ashton Wendler', flag: '🇺🇸' },
          { role: 'Performance Coach', name: 'Panda', realName: 'Laijhun Cheng', flag: '🇸🇬' },
        ].map(s => `
          <div style="background:var(--bg-primary);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;transition:var(--transition);" onmouseenter="this.style.borderColor='rgba(255,79,163,0.3)'" onmouseleave="this.style.borderColor='var(--border)'">
            <div style="font-size:1.5rem;margin-bottom:0.5rem;">${s.flag}</div>
            <div style="font-family:'Inter',sans-serif;font-weight:700;font-size:1.05rem;margin-bottom:0.15rem;">${s.name}</div>
            <div style="font-size:0.78rem;color:var(--gray-300);margin-bottom:0.5rem;">${s.realName}</div>
            <div style="background:var(--purple-dim);border:1px solid rgba(123,44,191,0.3);border-radius:4px;padding:0.2rem 0.5rem;display:inline-block;font-family:'Barlow Condensed',sans-serif;font-size:0.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--purple);">${s.role}</div>
          </div>`).join('')}
      </div>
    </div>`;
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  buildFooter();
  const path = window.location.pathname.split('/').pop() || 'index.html';
  buildNav(path || 'index.html');

  if (path === 'index.html' || path === '') {
    buildHomePage();
    spawnParticles('hero-particles');
  } else if (path === 'players.html') {
    buildPlayersPage();
  } else if (path === 'player.html') {
    buildPlayerDetail();
  } else if (path === 'settings.html') {
    buildSettingsPage();
  } else if (path === 'schedule.html') {
    buildSchedulePage();
  } else if (path === 'results.html') {
    buildResultsPage();
  } else if (path === 'trophies.html') {
    buildTrophiesPage();
  } else if (path === 'about.html') {
    buildAboutPage();
  }

  // Init all animations after content is built
  requestAnimationFrame(() => {
    initScrollAnimations();
    initCounters();
    setTimeout(initCardTilt, 100);
  });
});
