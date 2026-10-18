/* ===== 技术名词点击弹窗解释 ===== */
(function () {
  'use strict';

  // 名词库：技术专有名词与英文缩写的中文解释（可按需继续补充）
  window.GLOSSARY = {
    "React": "Meta 开源的前端 JavaScript 库，核心理念是“用组件拼界面、UI 是状态的函数”。本博客所有前端项目的基石。",
    "JSX": "JavaScript XML，React 允许在 JS 里写类似 HTML 的语法，编译后变成 React.createElement() 调用。",
    "SPA": "Single Page Application 单页应用：首次加载后页面不整体刷新，靠 JS 动态切换视图，体验接近原生 App。",
    "SSR": "Server Side Rendering 服务端渲染：页面 HTML 在服务器生成后再发给浏览器，利于首屏速度与 SEO。",
    "CSR": "Client Side Rendering 客户端渲染：浏览器先拿到空 HTML 再拉 JS 画页面，首屏慢但交互灵活。",
    "VDOM": "Virtual DOM 虚拟 DOM：用 JS 对象描述真实 DOM，通过 diff 算出最小变更再更新，提升渲染性能。",
    "Hook": "React 的钩子函数（如 useState/useEffect），让你在函数组件里“钩入”状态与生命周期能力。",
    "Props": "Properties 的缩写，父组件传给子组件的数据，子组件只读、不可修改。",
    "State": "组件自己管理的可变数据，变化会触发界面重新渲染。",
    "Component": "组件：可复用的界面单元，React/Vue 等框架都用它来拼装页面。",
    "TypeScript": "微软给 JavaScript 加静态类型的超集，编译期就能发现类型错误，大型项目更稳。",
    "interface": "接口：TypeScript 里用来描述“对象长什么样”的类型契约。",
    "泛型": "Generic：让函数/类能适配多种类型的写法，如 Array<T>，写一次通用逻辑。",
    "Vite": "新一代前端构建工具，基于原生 ESM，秒级冷启动、热更新极快。",
    "HMR": "Hot Module Replacement 热模块替换：改代码后页面不刷新局部更新，开发体验飞快。",
    "ESM": "ECMAScript Modules，JavaScript 官方的 import/export 模块标准。",
    "Tree Shaking": "摇树优化：打包时自动剔除没被用到的代码，减小体积。",
    "Tailwind": "原子化 CSS 框架，直接在 class 里写样式，不必单独写 CSS 文件。",
    "Zustand": "极简的 React 状态管理库，一个 create 就能建全局 Store，比 Redux 轻量。",
    "Store": "状态仓库：集中存放全局可共享的数据。",
    "Ant Design": "蚂蚁出品的企业级 React 组件库，自带表单、表格、弹窗等成熟组件。",
    "PixiJS": "基于 WebGL 的 2D 渲染库，用 GPU 画大量精灵，性能远超 DOM。",
    "WebGL": "浏览器里的 3D/2D 绘图标准，直接调用 GPU 渲染。",
    "Canvas 2D": "浏览器原生 2D 绘图 API，用代码画点、线、图形与动画。",
    "Sprite": "精灵：游戏里可移动的一张小图或动画单元。",
    "Vue 3": "渐进式前端框架，用组合式 API + 响应式数据构建界面，国内项目常用。",
    "Composition API": "Vue 3 的组合式 API，用 setup/ref/reactive 组织逻辑，比 Options API 更灵活。",
    "响应式": "数据变化时界面自动更新，无需手动操作 DOM。",
    "SFC": "Single File Component 单文件组件，Vue 把模板/逻辑/样式写在同一个 .vue 文件里。",
    "uni-app": "用 Vue 语法一套代码发布到 H5、小程序、App 的跨端框架。",
    "Spring Boot": "Java 后端一站式框架，约定优于配置，几行注解就能跑起服务。",
    "IoC": "Inversion of Control 控制反转：对象创建交给容器，而非自己 new。",
    "DI": "Dependency Injection 依赖注入：容器把依赖“注入”到对象里，解耦更易测。",
    "MyBatis-Plus": "MyBatis 增强工具，单表 CRUD 几乎零 SQL，还带分页、条件构造器。",
    "ORM": "对象关系映射：把数据库表映射成代码里的对象，少写 SQL。",
    "Node.js": "让 JavaScript 跑在服务端的运行时，基于事件循环处理高并发。",
    "npm": "Node 的包管理器，用来安装第三方库与脚本。",
    "事件循环": "Event Loop：JS 异步的核心机制，单线程下排队处理任务。",
    "Express": "最经典的 Node.js Web 框架，用中间件 + 路由写接口。",
    "中间件": "Middleware：请求处理流水线上的“关卡”，可改写请求/响应或做鉴权。",
    "Bun": "比 Node 更快的 JS/TS 运行时，自带打包、测试，启动极快。",
    "Elysia": "运行在 Bun 上的轻量后端框架，类型友好、性能高。",
    "JVM": "Java 虚拟机，让 Java 一次编译到处运行。",
    "指针": "Pointer：C 语言里存“内存地址”的变量，是操作底层内存的钥匙。",
    "Socket.IO": "封装 WebSocket 的实时通信库，自动降级、房间与广播开箱即用。",
    "WebSocket": "一次握手后持久双向通信的协议，适合实时游戏与流式输出。",
    "ws": "WebSocket 的常用缩写/协议标识。",
    "MySQL": "最流行的开源关系型数据库，用 SQL 管理结构化数据。",
    "SQL": "Structured Query Language 结构化查询语言，用来增删改查数据库。",
    "索引": "Index：数据库里加速查询的数据结构，类似书的目录。",
    "事务": "Transaction：一组操作要么全成功要么全失败，保证数据一致。",
    "Redis": "内存键值数据库，用作缓存/会话存储，速度极快。",
    "KV": "Key-Value 键值对：最简单的存储模型，按 key 取 value。",
    "缓存": "Cache：把热点数据放更快的介质（内存）里，减少慢查询。",
    "Docker": "容器引擎，把应用和依赖打包成镜像，到处一致运行。",
    "容器": "Container：轻量级隔离的运行环境，比虚拟机更省资源。",
    "镜像": "Image：容器的只读模板，包含运行所需的一切。",
    "Nginx": "高性能 Web 服务器/反向代理，可做负载均衡与静态托管。",
    "反向代理": "Reverse Proxy：由它统一接收外网请求再转发给后端服务。",
    "PM2": "Node 进程管理器，守护、集群、零停机重启 Node 服务。",
    "Git": "分布式版本控制系统，记录代码历史、协作开发。",
    "Commit": "提交：把一次改动快照存进 Git 历史。",
    "Branch": "分支：独立开发线，可在上面改而不影响主线。",
    "HTTPS": "HTTP + TLS 加密，保证网页传输不被窃听篡改。",
    "TLS": "传输层安全协议，为网络通信提供加密。",
    "SSH": "安全外壳协议，用于远程登录服务器、传文件。",
    "Systemd": "Linux 的系统与服务管理器，用 unit 文件托管后台服务。",
    "n8n": "开源的可视化工作流自动化工具，拖节点连成自动化流程。",
    "RAG": "Retrieval-Augmented Generation 检索增强生成：先检索资料再让大模型基于资料作答。",
    "Embedding": "嵌入：把文字变成高维向量，语义相近的向量也相近。",
    "向量": "Vector：高维空间里的一个点，用来表示语义。",
    "BM25": "经典全文检索打分算法，衡量词与文档的相关度。",
    "RRF": "Reciprocal Rank Fusion 倒数排名融合：把多路召回结果按排名融合。",
    "LLM": "Large Language Model 大语言模型，如 GPT 系列，能理解与生成自然语言。",
    "Provider": "供应商/模型提供方：如 OpenAI、通义、DeepSeek 等大模型接口来源。",
    "Function Calling": "函数调用：让大模型输出结构化参数去调用你定义的函数/工具。",
    "Prompt Injection": "提示注入：攻击者通过输入诱导模型绕过指令或泄密，需做护栏。",
    "SSE": "Server-Sent Events 服务器推送事件，用一条长连接把流式结果推给前端。",
    "JWT": "JSON Web Token，无状态身份凭证，常用于接口鉴权。",
    "Token": "令牌：代表身份或计费单位（大模型的 token 即“字/词”的计数单位）。",
    "Agent": "智能体：能感知、规划、调用工具去完成目标的 AI 程序。",
    "AI Agent": "见 Agent。能自主使用工具、记忆与规划完成复杂任务的 AI。",
    "记忆": "Memory：AI 保存的上下文/历史，让对话有连续性与个性化。",
    "脚手架": "Scaffold：一键生成项目初始结构的工具，免去手动搭目录。",
    "渲染": "Render：把数据/代码变成用户可见的界面或画面的过程。"
  };

  var main = document.querySelector('.tmain');
  var pop = null;

  function buildPop() {
    pop = document.createElement('div');
    pop.className = 'gloss-pop';
    pop.innerHTML = '<span class="gp-close">✕</span><div class="gp-t"></div><div class="gp-d"></div>';
    document.body.appendChild(pop);
    pop.querySelector('.gp-close').addEventListener('click', hidePop);
  }

  function hidePop() { if (pop) pop.classList.remove('show'); }

  function showPop(term, el) {
    var def = window.GLOSSARY[term];
    if (!def) return;
    pop.querySelector('.gp-t').textContent = term;
    pop.querySelector('.gp-d').textContent = def;
    pop.classList.add('show');
    var r = el.getBoundingClientRect();
    var top = r.bottom + window.scrollY + 8;
    var left = r.left + window.scrollX;
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
    // 防止超出右边界
    var maxLeft = window.scrollX + document.documentElement.clientWidth - pop.offsetWidth - 10;
    if (left > maxLeft) pop.style.left = Math.max(window.scrollX + 10, maxLeft) + 'px';
  }

  function wrapTerms(root) {
    if (!root || !window.GLOSSARY) return;
    var terms = Object.keys(window.GLOSSARY).sort(function (a, b) { return b.length - a.length; });
    var re = new RegExp('\\b(' + terms.map(function (t) {
      return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('|') + ')\\b', 'g');

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        var tag = p && p.tagName ? p.tagName.toLowerCase() : '';
        if (tag === 'script' || tag === 'style' || tag === 'pre' || tag === 'code' ||
            tag === 'a' || p.classList && p.classList.contains('gloss')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var text = node.nodeValue;
      if (!re.test(text)) return;
      re.lastIndex = 0;
      var frag = document.createDocumentFragment();
      var last = 0, m;
      while ((m = re.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var span = document.createElement('span');
        span.className = 'gloss';
        span.textContent = m[0];
        span.setAttribute('data-term', m[0]);
        frag.appendChild(span);
        last = m.index + m[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  function init() {
    if (!main) return;
    buildPop();
    wrapTerms(main);
    main.addEventListener('click', function (e) {
      var t = e.target.closest('.gloss');
      if (t) { e.stopPropagation(); showPop(t.getAttribute('data-term'), t); }
    });
    document.addEventListener('click', function (e) {
      if (pop && pop.classList.contains('show') && !e.target.closest('.gloss') && !e.target.closest('.gloss-pop')) hidePop();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
