# 王越的个人博客 · 技术作品集

一个纯静态（HTML/CSS/JS，零后端）的个人技术博客与作品集，托管于 **GitHub Pages**。

## 内容

- **首页**：动态粒子背景 + 三个作品项目卡片 + 技术教程库入口。
- **作品项目**（直接复用实战讲解手册）：
  - `projects/resume.html` —— 简历工坊（前端 Next.js/React，后端 Spring Boot）
  - `projects/game.html` —— 网页游戏平台（TypeScript/React/PixiJS/WebSocket）
  - `projects/memora.html` —— Memora AI 客服（Node/Express/RAG/Agent）
- **技术教程库**：`tutorials/` 下 40 篇面向小白的通关教程（是什么 → 怎么装 → 第一个例子 → 常见坑），支持**关键词搜索**与**分类筛选**（前端 / 后端 / 实时通信 / 数据库 / AI / 运维 / 安全 / 游戏）。
  - 清单由 `tutorials/manifest.js` 驱动，主页 Hub 自动渲染。

## 目录结构

```
index.html              首页 SPA（导航/动态背景/教程 Hub）
assets/css/style.css    主页与 Hub 样式（暗色、响应式）
assets/css/tech.css     教程页共享样式（仿原手册：深色+代码块+提示框）
assets/js/app.js        交互：视图切换、粒子背景、搜索、筛选、移动端菜单
tutorials/manifest.js   技术清单（标题/分类/标签/简介/文件路径）
tutorials/*.html        40 篇技术教程
projects/*.html         3 篇作品项目讲解
.nojekyll               禁用 GitHub Pages 的 Jekyll 处理
```

## 本地预览

直接双击 `index.html` 即可；或用任意静态服务器（避免某些浏览器对本地文件的限制）：

```bash
npx serve .
# 或
python -m http.server 8080
```

## 部署到 GitHub Pages

1. 把本仓库推送到 GitHub（`main` 分支）。
2. 仓库 **Settings → Pages → Build and deployment → Source 选 "Deploy from a branch"**，分支选 `main`、目录选 `/ (root)`。
3. 稍等约 1 分钟，访问 `https://<用户名>.github.io/<仓库名>/`。

> 提示：仓库根目录已包含 `.nojekyll`，确保 `tutorials/`、`assets/` 等下划线外的文件都被原样托管。

## 自定义

- 站点标题 / 署名：编辑 `index.html` 顶部 `<title>` 与 `.brand-name`。
- 新增技术教程：在 `tutorials/` 放一个 `<id>.html`，并在 `tutorials/manifest.js` 数组里加一条 `{ id, title, category, file, tags, summary }` 即可自动出现在 Hub。
- 作品项目：替换 `projects/` 下的三个 HTML。
