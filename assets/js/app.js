/* ============================================================
   王越的个人博客 — 交互脚本
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 视图切换 ---------- */
  var views = {
    home: document.getElementById('view-home'),
    frame: document.getElementById('view-frame')
  };
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.nav-item'));
  var frame = document.getElementById('contentFrame');
  var frameCrumb = document.getElementById('frameCrumb');
  var frameOpen = document.getElementById('frameOpen');

  function showView(name) {
    Object.keys(views).forEach(function (k) {
      views[k].classList.toggle('active', k === name);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setActiveNav(tab) {
    navItems.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-tab') === tab);
    });
  }

  function loadFrame(src, crumb, navTab) {
    frame.src = src;
    frameCrumb.textContent = crumb || '文档';
    frameOpen.href = src;
    setActiveNav(navTab || '');
    showView('frame');
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab]');
    if (!t) return;
    e.preventDefault();
    var tab = t.getAttribute('data-tab');
    if (tab === 'project') {
      loadFrame(t.getAttribute('data-src'), t.textContent.trim(), 'project');
    } else {
      setActiveNav('home');
      showView('home');
    }
    closeMobileNav();
  });

  document.getElementById('backBtn').addEventListener('click', function () {
    setActiveNav('home');
    showView('home');
  });

  /* ---------- 移动端菜单 ---------- */
  var burger = document.getElementById('navBurger');
  var nav = document.getElementById('nav');
  var scrim = document.getElementById('scrim');
  function closeMobileNav() { nav.classList.remove('open'); scrim.classList.remove('show'); }
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    scrim.classList.toggle('show', open);
  });
  scrim.addEventListener('click', closeMobileNav);

  /* ---------- 页脚年份 ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- 动态粒子背景 ---------- */
  var canvas = document.getElementById('bg');
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(110, (W * H) / 16000));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      // 与鼠标轻微互动
      var dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.sqrt(dxm * dxm + dym * dym);
      if (dm < 130) { p.x += dxm / dm * 0.6; p.y += dym / dm * 0.6; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(150,180,255,0.85)';
      ctx.fill();
    }
    // 连线
    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx = particles[a].x - particles[b].x, dy = particles[a].y - particles[b].y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = 'rgba(124,92,255,' + (0.16 * (1 - d / 130)) + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseout', function () { mouse.x = -999; mouse.y = -999; });
  resize(); draw();

  /* ---------- 技术教程 Hub ---------- */
  var TUT = window.TECH_TUTORIALS || [];
  var grid = document.getElementById('hubGrid');
  var filtersEl = document.getElementById('filters');
  var searchInput = document.getElementById('searchInput');
  var hubCount = document.getElementById('hubCount');
  var hubEmpty = document.getElementById('hubEmpty');
  var heroTags = document.getElementById('heroTags');

  var categories = [];
  TUT.forEach(function (t) { if (categories.indexOf(t.category) === -1) categories.push(t.category); });
  var activeCat = '全部';

  // 分类筛选条
  var cats = ['全部'].concat(categories);
  cats.forEach(function (c) {
    var b = document.createElement('button');
    b.className = 'chip' + (c === '全部' ? ' active' : '');
    b.textContent = c;
    b.addEventListener('click', function () {
      activeCat = c;
      Array.prototype.forEach.call(filtersEl.children, function (ch) { ch.classList.remove('active'); });
      b.classList.add('active');
      render();
    });
    filtersEl.appendChild(b);
  });

  function match(t, q) {
    if (!q) return true;
    q = q.toLowerCase();
    var hay = (t.title + ' ' + t.category + ' ' + t.summary + ' ' + (t.tags || []).join(' ')).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function render() {
    var q = searchInput.value.trim();
    var list = TUT.filter(function (t) {
      return (activeCat === '全部' || t.category === activeCat) && match(t, q);
    });
    grid.innerHTML = '';
    hubEmpty.hidden = list.length !== 0;
    list.forEach(function (t) {
      var card = document.createElement('div');
      card.className = 'tut-card';
      card.innerHTML =
        '<div class="tut-cat">' + t.category + '</div>' +
        '<h3>' + t.title + '</h3>' +
        '<p>' + t.summary + '</p>' +
        '<div class="tut-tags">' + (t.tags || []).map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>';
      card.addEventListener('click', function () { window.open(t.file, '_blank', 'noopener'); });
      grid.appendChild(card);
    });
    hubCount.textContent = '共 ' + list.length + ' 篇技术教程' + (q ? '（已筛选 “' + q + '”）' : '');
  }

  searchInput.addEventListener('input', render);
  render();

  // 首页标签云（取前 14 个技术名）
  heroTags.innerHTML = TUT.slice(0, 14).map(function (t) { return '<span>' + t.title + '</span>'; }).join('');

})();
