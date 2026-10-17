/* 教程页动态粒子背景 + 导航增强 */
(function () {
  'use strict';

  // 注入返回教程库按钮
  (function injectNav() {
    var side = document.querySelector('.tside');
    if (side && !side.querySelector('.tback-dt')) {
      var backDt = document.createElement('a');
      backDt.className = 'tback-dt';
      backDt.href = '../index.html';
      backDt.textContent = '← 返回教程库';
      side.insertBefore(backDt, side.firstChild);
    }
    var burger = document.getElementById('tburger');
    if (burger && !burger.parentElement.classList.contains('tbar')) {
      var bar = document.createElement('div');
      bar.className = 'tbar';
      burger.parentNode.insertBefore(bar, burger);
      bar.appendChild(burger);
      var backM = document.createElement('a');
      backM.className = 'tback-m';
      backM.href = '../index.html';
      backM.textContent = '← 返回';
      bar.insertBefore(backM, burger);
    }
  })();

  var canvas = document.getElementById('bg');
  if (!canvas) return;
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
      var dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.sqrt(dxm * dxm + dym * dym);
      if (dm < 130) { p.x += dxm / dm * 0.6; p.y += dym / dm * 0.6; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(150,180,255,0.85)';
      ctx.fill();
    }
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
})();
