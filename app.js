(function () {
  'use strict';

  const AVATAR_COLORS = ['#FF6B57', '#3AA6FF', '#2EC4B6', '#FFD23F'];
  const DIFF_META = {
    nem: { label: 'Nem', stars: '★☆☆', points: 10 },
    mellem: { label: 'Mellem', stars: '★★☆', points: 20 },
    svaer: { label: 'Svær', stars: '★★★', points: 30 },
  };
  const LENGTH_OPTIONS = [
    { id: 5, label: 'Kort', sub: '5 spørgsmål' },
    { id: 10, label: 'Mellem', sub: '10 spørgsmål' },
    { id: 15, label: 'Lang', sub: '15 spørgsmål' },
  ];

  const app = document.getElementById('app');

  const state = {
    screen: 'setup',
    players: loadPlayers(),
    category: null,
    difficulty: 'nem',
    length: 10,
    timerEnabled: false,
    round: [],
    qIndex: 0,
    turnIndex: 0,
    locked: false,
    selectedOption: null,
    timeLeft: 20,
    timerInterval: null,
  };

  function loadPlayers() {
    try {
      const saved = JSON.parse(localStorage.getItem('feriequiz_players'));
      if (Array.isArray(saved) && saved.length) {
        return saved.map((p) => ({ name: p.name, score: 0 }));
      }
    } catch (e) {}
    return [{ name: '', score: 0 }, { name: '', score: 0 }];
  }

  function savePlayers() {
    localStorage.setItem('feriequiz_players', JSON.stringify(state.players.map((p) => ({ name: p.name }))));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickQuestions(catId, difficulty, count) {
    let pool = [];
    const diffs = difficulty === 'bland' ? ['nem', 'mellem', 'svaer'] : [difficulty];
    const catIds = catId === 'mix' ? CATEGORIES.filter((c) => c.id !== 'mix').map((c) => c.id) : [catId];
    catIds.forEach((cid) => {
      const bank = QUESTIONS[cid];
      diffs.forEach((d) => {
        bank[d].forEach((q) => pool.push(Object.assign({}, q, { _diff: d, _srcCat: cid })));
      });
    });
    pool = shuffle(pool);
    const result = [];
    let i = 0;
    let lastBatch = null;
    while (result.length < count) {
      if (i >= pool.length) {
        pool = shuffle(pool);
        i = 0;
      }
      result.push(pool[i]);
      i++;
    }
    return result.slice(0, count);
  }

  function initials(name) {
    return (name || '?').trim().charAt(0).toUpperCase() || '?';
  }

  function playerColor(idx) {
    return AVATAR_COLORS[idx % AVATAR_COLORS.length];
  }

  // ---------------- rendering ----------------

  function render() {
    let html = '';
    if (state.screen === 'setup') html = renderSetup();
    else if (state.screen === 'category') html = renderCategory();
    else if (state.screen === 'options') html = renderOptions();
    else if (state.screen === 'quiz') html = renderQuiz();
    else if (state.screen === 'end') html = renderEnd();
    app.innerHTML = html;
    afterRender();
  }

  function renderInstallBanner() {
    const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    const dismissed = localStorage.getItem('feriequiz_install_dismissed');
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isStandalone || dismissed || !isIOS) return '';
    return `
      <div class="install-banner" id="installBanner">
        <span>📲 Tip: Tryk <b>Del</b> → <b>"Føj til hjemmeskærm"</b>, så åbner Ferie Quiz som en rigtig app!</span>
        <button class="x" id="dismissInstall">✕</button>
      </div>`;
  }

  function renderSetup() {
    const players = state.players;
    const countBtns = [1, 2, 3, 4].map(
      (n) => `<button class="count-btn ${players.length === n ? 'active' : ''}" data-count="${n}">${n}</button>`
    ).join('');

    const rows = players.map((p, i) => `
      <div class="player-input-row">
        <div class="player-avatar" style="background:${playerColor(i)}">${initials(p.name || String(i + 1))}</div>
        <input type="text" maxlength="14" placeholder="Spiller ${i + 1}" value="${escapeAttr(p.name)}" data-idx="${i}" />
      </div>
    `).join('');

    return `
      <div class="screen">
        ${renderInstallBanner()}
        <h1 class="brand">🌴 Ferie Quiz<small>Sjov &amp; sol i lommeformat</small></h1>
        <p class="subtitle">Vælg antal spillere og giv jer navne</p>

        <div class="section-label"><span class="n">1</span> Hvor mange spiller med?</div>
        <div class="player-count-row">${countBtns}</div>

        <div class="section-label"><span class="n">2</span> Navne</div>
        <div class="player-list">${rows}</div>

        <div class="spacer"></div>
        <button class="btn block" id="toCategory" style="margin-top:22px;">Videre til kategori →</button>
        <p class="footer-note">Lav din egen ferie-quiz-aften, uanset hvor I er 🏝️</p>
      </div>
    `;
  }

  function renderCategory() {
    const cards = CATEGORIES.map((c) => `
      <button class="cat-card" style="background:linear-gradient(145deg, ${c.color}, ${shade(c.color)})" data-cat="${c.id}">
        <span class="em">${c.emoji}</span>
        <span class="nm">${c.name}</span>
      </button>
    `).join('');

    return `
      <div class="screen">
        <div class="top-bar">
          <button class="icon-btn" id="back">←</button>
          <h2 class="brand" style="font-size:1.5rem;">Vælg kategori</h2>
          <span style="width:42px"></span>
        </div>
        <p class="subtitle">Hvad skal I dystre i?</p>
        <div class="cat-grid">${cards}</div>
      </div>
    `;
  }

  function renderOptions() {
    const cat = CATEGORIES.find((c) => c.id === state.category);
    const diffPills = ['nem', 'mellem', 'svaer', 'bland'].map((d) => {
      const meta = d === 'bland' ? { label: 'Bland', stars: '★★★' } : DIFF_META[d];
      return `<button class="pill ${state.difficulty === d ? 'selected' : ''}" data-diff="${d}">${meta.label}<span class="stars">${meta.stars}</span></button>`;
    }).join('');

    const lenPills = LENGTH_OPTIONS.map((l) => `
      <button class="pill ${state.length === l.id ? 'selected' : ''}" data-len="${l.id}">${l.label}<span class="stars">${l.sub}</span></button>
    `).join('');

    return `
      <div class="screen">
        <div class="top-bar">
          <button class="icon-btn" id="back">←</button>
          <h2 class="brand" style="font-size:1.5rem;">${cat.emoji} ${cat.name}</h2>
          <span style="width:42px"></span>
        </div>

        <div class="section-label"><span class="n">1</span> Sværhedsgrad</div>
        <div class="pill-row">${diffPills}</div>

        <div class="section-label"><span class="n">2</span> Antal spørgsmål</div>
        <div class="pill-row">${lenPills}</div>

        <div class="section-label"><span class="n">3</span> Ekstra</div>
        <label class="toggle-row">
          <span>⏱️ Tidspres (20 sek. pr. spørgsmål)</span>
          <span class="switch">
            <input type="checkbox" id="timerToggle" ${state.timerEnabled ? 'checked' : ''} />
            <span class="track"></span><span class="knob"></span>
          </span>
        </label>

        <div class="spacer"></div>
        <button class="btn secondary block" id="startQuiz" style="margin-top:22px;">Start quiz! 🎉</button>
      </div>
    `;
  }

  function renderQuiz() {
    const q = state.round[state.qIndex];
    const cat = CATEGORIES.find((c) => c.id === q._srcCat);
    const meta = DIFF_META[q._diff];
    const player = state.players[state.turnIndex];
    const total = state.round.length;
    const pct = Math.round((state.qIndex / total) * 100);

    const optionsHtml = q._shuffled.map((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      let cls = 'option';
      if (state.locked) {
        if (opt === q.correct) cls += ' correct';
        else if (opt === state.selectedOption) cls += ' wrong';
        else cls += ' dim';
      }
      return `<button class="${cls}" data-opt="${escapeAttr(opt)}" ${state.locked ? 'disabled' : ''}>
        <span class="letter">${letter}</span><span>${opt}</span>
      </button>`;
    }).join('');

    let feedback = '';
    if (state.locked) {
      const won = state.selectedOption === q.correct;
      feedback = `
        <div class="feedback-banner ${won ? 'good' : 'bad'}">
          ${won ? `Rigtigt! +${meta.points} point 🎉` : (state.selectedOption ? 'Forkert svar 😅' : 'Tiden løb ud! ⏰')}
        </div>
        ${q.fact ? `<div class="fact-box">💡 ${q.fact}</div>` : ''}
        <button class="btn block" id="nextQuestion">${state.qIndex + 1 < total ? 'Næste spørgsmål →' : 'Se resultat 🏆'}</button>
      `;
    }

    const timerHtml = (state.timerEnabled && !state.locked) ? renderTimerRing() : '';

    return `
      <div class="screen">
        <div class="quiz-top">
          <button class="icon-btn" id="quitQuiz" style="width:34px;height:34px;font-size:0.9rem;">✕</button>
          <div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
          <div class="score-chip">${state.qIndex + 1}/${total}</div>
        </div>

        <div class="turn-banner">
          ${timerHtml}
          <div class="avatar" style="background:${playerColor(state.turnIndex)}">${initials(player.name || String(state.turnIndex + 1))}</div>
          <div class="txt">${escapeHtml(player.name || 'Spiller ' + (state.turnIndex + 1))}s tur</div>
        </div>

        <div class="question-card card">
          <span class="q-badge" style="background:${cat.color}">${cat.emoji} ${cat.name} · ${meta.label}</span>
          <div class="q-text">${escapeHtml(q.q)}</div>
          <div class="options">${optionsHtml}</div>
        </div>

        ${feedback}
      </div>
    `;
  }

  function renderTimerRing() {
    const r = 20;
    const c = 2 * Math.PI * r;
    const pct = state.timeLeft / 20;
    const offset = c * (1 - pct);
    const danger = state.timeLeft <= 6;
    return `
      <div class="timer-ring">
        <svg viewBox="0 0 46 46">
          <circle class="bg" cx="23" cy="23" r="${r}"></circle>
          <circle class="fg" cx="23" cy="23" r="${r}" stroke="${danger ? '#ffd23f' : '#fff'}"
            stroke-dasharray="${c}" stroke-dashoffset="${offset}"></circle>
        </svg>
        <div class="num">${state.timeLeft}</div>
      </div>
    `;
  }

  function renderEnd() {
    const sorted = state.players.map((p, i) => ({ ...p, idx: i })).sort((a, b) => b.score - a.score);
    const top3 = sorted.slice(0, 3);
    const order = top3.length === 3 ? [1, 0, 2] : top3.map((_, i) => i);
    const medals = ['🥇', '🥈', '🥉'];
    const heights = [96, 128, 76];

    const podium = order.map((posIdx, slot) => {
      const p = top3[posIdx];
      if (!p) return '';
      const h = top3.length === 3 ? heights[posIdx] : 90;
      return `
        <div class="podium-slot">
          <span class="medal">${medals[posIdx]}</span>
          <div class="bar" style="height:${h}px;background:${playerColor(p.idx)}">
            <span style="color:#fff;font-size:1.3rem;">${p.score}</span>
          </div>
          <div class="name">${escapeHtml(p.name || 'Spiller ' + (p.idx + 1))}</div>
        </div>
      `;
    }).join('');

    const fullList = sorted.map((p, rank) => `
      <div class="score-row">
        <div class="rank">${rank + 1}</div>
        <div class="av" style="background:${playerColor(p.idx)}">${initials(p.name || String(p.idx + 1))}</div>
        <div class="nm">${escapeHtml(p.name || 'Spiller ' + (p.idx + 1))}</div>
        <div class="pts">${p.score} p</div>
      </div>
    `).join('');

    const cat = CATEGORIES.find((c) => c.id === state.category);

    return `
      <div class="screen">
        <h1 class="brand" style="font-size:2rem;">🎊 Quiz klaret!</h1>
        <p class="subtitle">${cat.emoji} ${cat.name} — flot klaret allesammen</p>
        <div class="podium">${podium}</div>
        <div class="card" style="margin-top:14px;">
          <div class="score-list">${fullList}</div>
        </div>
        <div class="spacer"></div>
        <div class="btn-row" style="margin-top:18px;">
          <button class="btn ghost" id="newCategory">Ny kategori</button>
          <button class="btn secondary" id="playAgain">Spil igen</button>
        </div>
        <button class="btn block" id="newPlayers" style="margin-top:10px;">Skift spillere</button>
      </div>
    `;
  }

  // ---------------- helpers ----------------

  function shade(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.max(0, (n >> 16) - 28);
    const g = Math.max(0, ((n >> 8) & 0xff) - 28);
    const b = Math.max(0, (n & 0xff) - 28);
    return `rgb(${r},${g},${b})`;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function escapeAttr(str) { return escapeHtml(str); }

  function confettiBurst(count) {
    const colors = ['#FF6B57', '#3AA6FF', '#2EC4B6', '#FFD23F', '#FF5DA2'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = 2.2 + Math.random() * 1.6 + 's';
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4200);
    }
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function startTimer() {
    stopTimer();
    state.timeLeft = 20;
    state.timerInterval = setInterval(() => {
      state.timeLeft--;
      if (state.timeLeft <= 0) {
        stopTimer();
        lockAnswer(null);
        return;
      }
      const num = app.querySelector('.timer-ring .num');
      const fg = app.querySelector('.timer-ring .fg');
      if (num && fg) {
        num.textContent = state.timeLeft;
        const r = 20, c = 2 * Math.PI * r;
        fg.setAttribute('stroke-dashoffset', c * (1 - state.timeLeft / 20));
        if (state.timeLeft <= 6) fg.setAttribute('stroke', '#ffd23f');
      }
    }, 1000);
  }

  function lockAnswer(opt) {
    if (state.locked) return;
    state.locked = true;
    state.selectedOption = opt;
    stopTimer();
    const q = state.round[state.qIndex];
    if (opt === q.correct) {
      const pts = DIFF_META[q._diff].points;
      state.players[state.turnIndex].score += pts;
      confettiBurst(28);
    }
    render();
  }

  function nextTurn() {
    if (state.players.length > 1) {
      state.turnIndex = (state.turnIndex + 1) % state.players.length;
    }
  }

  // ---------------- event wiring ----------------

  function afterRender() {
    if (state.screen === 'setup') {
      app.querySelectorAll('.count-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const n = parseInt(btn.dataset.count, 10);
          const current = state.players;
          const next = [];
          for (let i = 0; i < n; i++) next.push(current[i] || { name: '', score: 0 });
          state.players = next;
          render();
        });
      });
      app.querySelectorAll('.player-input-row input').forEach((input) => {
        input.addEventListener('input', () => {
          const i = parseInt(input.dataset.idx, 10);
          state.players[i].name = input.value;
          const avatar = input.previousElementSibling;
          if (avatar) avatar.textContent = initials(input.value || String(i + 1));
        });
      });
      const btn = document.getElementById('toCategory');
      if (btn) btn.addEventListener('click', () => {
        savePlayers();
        state.screen = 'category';
        render();
      });
      const dismiss = document.getElementById('dismissInstall');
      if (dismiss) dismiss.addEventListener('click', () => {
        localStorage.setItem('feriequiz_install_dismissed', '1');
        render();
      });
    } else if (state.screen === 'category') {
      document.getElementById('back').addEventListener('click', () => { state.screen = 'setup'; render(); });
      app.querySelectorAll('.cat-card').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.category = btn.dataset.cat;
          state.screen = 'options';
          render();
        });
      });
    } else if (state.screen === 'options') {
      document.getElementById('back').addEventListener('click', () => { state.screen = 'category'; render(); });
      app.querySelectorAll('[data-diff]').forEach((btn) => {
        btn.addEventListener('click', () => { state.difficulty = btn.dataset.diff; render(); });
      });
      app.querySelectorAll('[data-len]').forEach((btn) => {
        btn.addEventListener('click', () => { state.length = parseInt(btn.dataset.len, 10); render(); });
      });
      document.getElementById('timerToggle').addEventListener('change', (e) => {
        state.timerEnabled = e.target.checked;
      });
      document.getElementById('startQuiz').addEventListener('click', () => {
        state.round = pickQuestions(state.category, state.difficulty, state.length).map((q) => {
          q._shuffled = shuffle(q.options);
          return q;
        });
        state.players.forEach((p) => (p.score = 0));
        state.qIndex = 0;
        state.turnIndex = 0;
        state.locked = false;
        state.selectedOption = null;
        state.screen = 'quiz';
        render();
      });
    } else if (state.screen === 'quiz') {
      document.getElementById('quitQuiz').addEventListener('click', () => {
        if (confirm('Vil du afslutte quizzen og gå tilbage?')) {
          stopTimer();
          state.screen = 'category';
          render();
        }
      });
      if (!state.locked) {
        app.querySelectorAll('.option').forEach((btn) => {
          btn.addEventListener('click', () => lockAnswer(btn.dataset.opt));
        });
        if (state.timerEnabled) startTimer();
      } else {
        const nextBtn = document.getElementById('nextQuestion');
        if (nextBtn) nextBtn.addEventListener('click', () => {
          nextTurn();
          if (state.qIndex + 1 < state.round.length) {
            state.qIndex++;
            state.locked = false;
            state.selectedOption = null;
            render();
          } else {
            state.screen = 'end';
            render();
            confettiBurst(48);
          }
        });
      }
    } else if (state.screen === 'end') {
      document.getElementById('newCategory').addEventListener('click', () => { state.screen = 'category'; render(); });
      document.getElementById('playAgain').addEventListener('click', () => { state.screen = 'options'; render(); });
      document.getElementById('newPlayers').addEventListener('click', () => { state.screen = 'setup'; render(); });
    }
  }

  render();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    });
  }
})();
