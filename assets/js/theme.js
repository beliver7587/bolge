/* ===== 主题切换（暗/亮） ===== */
(function () {
  'use strict';

  var STORAGE_KEY = 'bolge-theme';

  function applyTheme(theme) {
    var root = document.documentElement;
    if (!theme || theme === 'auto') {
      theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.textContent = theme === 'light' ? '☀️' : '🌙';
    btn.title = theme === 'light' ? '切换暗色主题' : '切换亮色主题';
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    // 同步 iframe
    var frames = document.querySelectorAll('iframe');
    for (var i = 0; i < frames.length; i++) {
      try {
        frames[i].contentWindow.postMessage({ type: 'bolge-theme', theme: next }, '*');
      } catch (e) {}
    }
  }

  // 初始化
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  applyTheme(saved || 'dark');

  // 页面加载后绑定按钮
  function bind() {
    var btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggleTheme);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();

  // 接收父页面/其他标签页的主题广播
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'bolge-theme') applyTheme(e.data.theme);
  });
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY) applyTheme(e.newValue);
  });
})();
