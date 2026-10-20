    // 마스코트 '모아' (00_캐릭터_시트.svg 기준, 240×240 좌표)
    const INK = '#1E2235';
    const line = d => `<path d="${d}" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    const dotEyes = (ry = 10) =>
      `<g class="moa-eyes"><ellipse cx="96" cy="124" rx="7.5" ry="${ry}" fill="${INK}"/><circle cx="98.5" cy="120" r="2.6" fill="#fff"/>` +
      `<ellipse cx="140" cy="124" rx="7.5" ry="${ry}" fill="${INK}"/><circle cx="142.5" cy="120" r="2.6" fill="#fff"/></g>`;
    const heart = (x, y) => `<path d="M${x} ${y} c-5-7-15-3-12 4 c2 5 12 11 12 11 s10-6 12-11 c3-7-7-11-12-4z" fill="#FF4F6D"/>`;
    const tear = (x, y) => `<path d="M${x} ${y} q6 9 0 13 q-6-4 0-13z" fill="#7FC8F8"/>`;
    const sparkle = '<g class="moa-deco"><path d="M200 46 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill="#FFC94D"/><circle cx="220" cy="88" r="5" fill="#2EC4A6"/><circle cx="30" cy="62" r="4" fill="#8B7CF6"/></g>';
    const ARM_DOWN = '<g class="moa-arm"><ellipse cx="38" cy="132" rx="10" ry="17" transform="rotate(25 38 132)" fill="url(#moaBody)"/></g>';
    const ARM_UP = '<g class="moa-arm up"><ellipse cx="40" cy="96" rx="10" ry="18" transform="rotate(-35 40 96)" fill="url(#moaBody)"/></g>';

    const MOA = {
      default: { arm: ARM_DOWN, deco: sparkle, face: dotEyes() + line('M109 139 Q118 148 127 139') },
      happy: {
        arm: ARM_UP, deco: sparkle,
        face: line('M88 126 Q96 116 104 126') + line('M132 126 Q140 116 148 126') +
          `<path d="M106 138 Q118 156 130 138 Z" fill="${INK}"/><path d="M111 145 Q118 151 125 145" fill="#FF8FA3"/>`
      },
      think: {
        arm: ARM_DOWN,
        deco: '<g class="moa-deco"><circle cx="196" cy="62" r="6" fill="#8B7CF6" opacity="0.8"/><circle cx="210" cy="44" r="9" fill="#8B7CF6" opacity="0.55"/>' +
          '<path d="M207 41 q0-3 3-3 q3 0 3 3 q0 2-3 3 v2" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none"/><circle cx="210" cy="50" r="1.2" fill="#fff"/></g>',
        face: `<g class="moa-eyes"><ellipse cx="99" cy="121" rx="7" ry="9.5" fill="${INK}"/><circle cx="101" cy="116" r="2.5" fill="#fff"/>` +
          `<ellipse cx="143" cy="121" rx="7" ry="9.5" fill="${INK}"/><circle cx="145" cy="116" r="2.5" fill="#fff"/></g>` +
          `<ellipse cx="120" cy="146" rx="5" ry="6" fill="${INK}"/>`
      },
      love: {
        arm: ARM_DOWN,
        deco: `<g class="moa-deco">${heart(196, 54)}<circle cx="214" cy="84" r="5" fill="#8B7CF6"/></g>`,
        face: `<g class="moa-hearts">${heart(96, 116)}${heart(140, 116)}</g>` + line('M108 140 Q118 150 128 140')
      },
      calm: {
        arm: ARM_DOWN,
        deco: '<g class="moa-deco"><circle cx="212" cy="70" r="5" fill="#2EC4A6"/><circle cx="30" cy="62" r="4" fill="#8B7CF6"/></g>',
        face: line('M88 122 Q96 130 104 122') + line('M132 122 Q140 130 148 122') + line('M111 140 Q118 146 125 140')
      },
      tired: {
        arm: ARM_DOWN,
        deco: `<g class="moa-deco">${tear(204, 58)}</g>`,
        face: line('M88 126 L104 126') + line('M132 126 L148 126') + line('M108 145 Q113 141 118 145 Q123 149 128 145')
      },
      sad: {
        arm: ARM_DOWN,
        deco: '<g class="moa-deco"><circle cx="206" cy="58" r="5" fill="#8B7CF6" opacity="0.6"/><circle cx="30" cy="62" r="4" fill="#8B7CF6"/></g>',
        face: dotEyes(9) + `<g class="moa-tear">${tear(90, 136)}</g>` + line('M109 148 Q118 140 127 148')
      }
    };

    const moaSVG = type => {
      const m = MOA[type] || MOA.default;
      return `<svg viewBox="0 0 240 240" aria-hidden="true">` +
        `<ellipse class="moa-shadow" cx="118" cy="218" rx="62" ry="7" fill="${INK}" opacity="0.08"/>` +
        `<g class="moa-fig">` +
        `<g class="moa-feet"><ellipse cx="92" cy="206" rx="17" ry="10" fill="#E8573A"/><ellipse cx="144" cy="206" rx="17" ry="10" fill="#E8573A"/></g>` +
        m.arm +
        `<g fill="url(#moaBody)"><rect x="44" y="64" width="148" height="140" rx="46"/><circle cx="118" cy="62" r="24"/><circle cx="194" cy="134" r="21"/></g>` +
        `<path d="M64 104 Q66 78 92 72" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="0.45" fill="none"/>` +
        `<circle cx="110" cy="52" r="5" fill="#fff" opacity="0.45"/>` +
        `<ellipse cx="80" cy="144" rx="11" ry="6.5" fill="#FF4F6D" opacity="0.32"/><ellipse cx="156" cy="144" rx="11" ry="6.5" fill="#FF4F6D" opacity="0.32"/>` +
        m.face + `</g>` + m.deco + `</svg>`;
    };

    const drawMoa = el => {
      el.innerHTML = moaSVG(el.dataset.moa);
      // 캐릭터마다 움직임 타이밍을 조금씩 어긋나게
      el.style.setProperty('--d', (-Math.random() * 3).toFixed(2) + 's');
    };
    document.querySelectorAll('[data-moa]').forEach(drawMoa);

    // 기분 선택 → 추천 섹션 문구 + 배너 캐릭터 표정 변경
    const moods = document.querySelectorAll('.mood');
    const label = document.getElementById('moodLabel');
    const heroMoa = document.getElementById('heroMoa');
    moods.forEach(m => m.addEventListener('click', () => {
      moods.forEach(x => x.classList.remove('selected'));
      m.classList.add('selected');
      label.textContent = m.textContent.trim();
      heroMoa.dataset.moa = m.querySelector('.moa').dataset.moa;
      drawMoa(heroMoa);
      heroMoa.classList.remove('pop');
      void heroMoa.offsetWidth;
      heroMoa.classList.add('pop');
    }));

    // 커뮤니티 탭 (피드 · 모임 · 동행 찾기)
    const tabBtns = document.querySelectorAll('.seg button');
    const showTab = name => {
      tabBtns.forEach(b => b.classList.toggle('on', b.dataset.tab === name));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('on', p.id === 'tab-' + name));
    };
    tabBtns.forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
    document.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => showTab(b.dataset.goto)));

    // 칩 · 게시글 · 모임 카드: 같은 그룹 안에서 하나만 선택
    const selectOne = (items, cls) => items.forEach(el => el.addEventListener('click', () => {
      items.forEach(x => x.classList.remove(cls));
      el.classList.add(cls);
    }));
    document.querySelectorAll('.chips').forEach(g => selectOne(g.querySelectorAll('.chip'), 'on'));
    selectOne(document.querySelectorAll('.post'), 'on');
    selectOne(document.querySelectorAll('.meet-item'), 'on');

    // 글쓰기 · 모임 만들기 모달
    document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => {
      document.getElementById(b.dataset.open).classList.add('on');
    }));
    document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => {
      if (e.target === m || e.target.closest('[data-close]')) m.classList.remove('on');
    }));

    // 채팅 메시지 보내기
    const chatForm = document.getElementById('chatForm');
    const chatBody = document.querySelector('.chat-body');
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = chatForm.querySelector('input');
      if (!input.value.trim()) return;
      const now = new Date();
      const h = now.getHours();
      const msg = document.createElement('div');
      msg.className = 'msg me';
      msg.innerHTML = '<div class="bubble"></div><time></time>';
      msg.querySelector('.bubble').textContent = input.value;
      msg.querySelector('time').textContent = (h < 12 ? '오전 ' : '오후 ') + (h % 12 || 12) + ':' + String(now.getMinutes()).padStart(2, '0');
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
      input.value = '';
    });
