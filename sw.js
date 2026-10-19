const CACHE = 'bolge-cache-v1';
const CORE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/css/style.css',
    '/assets/css/tech.css',
    '/assets/js/theme.js',
    '/assets/js/app.js',
    '/assets/js/glossary.js',
    '/assets/js/tech-bg.js',
    '/tutorials/manifest.js'
];
const TUTORIALS = [
    '/tutorials/aabb.html',
    '/tutorials/agent.html',
    '/tutorials/antd.html',
    '/tutorials/bettersqlite.html',
    '/tutorials/bm25.html',
    '/tutorials/bun.html',
    '/tutorials/canvas.html',
    '/tutorials/canvas2d.html',
    '/tutorials/clang.html',
    '/tutorials/css.html',
    '/tutorials/docker.html',
    '/tutorials/edgeauthority.html',
    '/tutorials/embedding.html',
    '/tutorials/express.html',
    '/tutorials/functioncalling.html',
    '/tutorials/git.html',
    '/tutorials/html.html',
    '/tutorials/https.html',
    '/tutorials/java.html',
    '/tutorials/javaspring.html',
    '/tutorials/jwt.html',
    '/tutorials/llm.html',
    '/tutorials/memory.html',
    '/tutorials/mybatisplus.html',
    '/tutorials/mysql.html',
    '/tutorials/n8n.html',
    '/tutorials/nextjs.html',
    '/tutorials/nginx.html',
    '/tutorials/nodejs.html',
    '/tutorials/pixijs.html',
    '/tutorials/pm2.html',
    '/tutorials/promptinject.html',
    '/tutorials/provider.html',
    '/tutorials/python.html',
    '/tutorials/rag.html',
    '/tutorials/react.html',
    '/tutorials/redis.html',
    '/tutorials/richtext.html',
    '/tutorials/rrf.html',
    '/tutorials/socketio.html',
    '/tutorials/springboot.html',
    '/tutorials/sse.html',
    '/tutorials/ssh.html',
    '/tutorials/systemd.html',
    '/tutorials/tailwind.html',
    '/tutorials/typescript.html',
    '/tutorials/uniapp.html',
    '/tutorials/vite.html',
    '/tutorials/vue3.html',
    '/tutorials/websocket.html',
    '/tutorials/zustand.html'
];
const PROJECTS = [
    '/projects/resume.html',
    '/projects/game.html',
    '/projects/memora.html'
];
const ASSETS = CORE.concat(TUTORIALS, PROJECTS);

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return cached;
      });
    })
  );
});
