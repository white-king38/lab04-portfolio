/* =========================================================
   个人作品集 · 交互脚本
   1) 项目数据集中定义，渲染时动态生成 DOM（便于扩展更多项目）
   2) 滚动时高亮左侧导航
   ========================================================= */

/* ---------- 项目数据：新增项目只需在数组中追加一项 ---------- */
const IMAGE_API = "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image";

/* 生成项目配图（在线图片，按描述 prompt 生成，便于扩展） */
function projectImage(prompt) {
  const url = `${IMAGE_API}?prompt=${encodeURIComponent(prompt)}&image_size=landscape_16_9`;
  return url;
}

const projects = [
  {
    name: "轻记账",
    date: "2025 年 4 月",
    category: "移动应用",
    techStack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    intro: "“轻记账”是一款面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。",
    features: ["语音快捷记账", "月度收支统计", "预算提醒"],
    technicals: [
      "使用 TypeScript 和微信小程序进行开发",
      "使用微信云开发完成数据存储与后端能力",
      "使用 ECharts 实现统计数据展示"
    ],
    image: "WeChat mini program bookkeeping app UI, simple ledger with monthly statistics charts"
  },
  {
    name: "拾光集市",
    date: "2025 年 9 月",
    category: "Web 应用",
    techStack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    intro: "“拾光集市”是一个面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。",
    features: ["商品发布", "关键词检索", "站内私信", "信用评分"],
    role: "从需求梳理、界面设计到主要接口开发均独立完成。",
    outcome: "上线测试后累计注册用户超过 300 人。",
    technicals: [
      "使用 Java、Spring Boot、MySQL 完成后端与数据存储",
      "使用 TypeScript、Vue 完成前端页面与交互"
    ],
    image: "campus second-hand trading web platform UI, clean marketplace listing interface"
  },
  {
    name: "城市脉搏",
    date: "2026 年 3 月",
    category: "数据可视化",
    techStack: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    intro: "“城市脉搏”是一个城市实时交通与天气数据可视化大屏，用于集中展示交通、天气和城市运行信息。",
    features: ["集中展示交通信息", "集中展示天气信息", "集中展示城市运行信息"],
    technicals: [
      "通过多数据源轮询聚合数据",
      "使用 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示",
      "使用 TypeScript、HTML/CSS、ECharts 进行开发"
    ],
    image: "city traffic and weather data visualization dashboard, clean dashboard screens"
  },
  {
    name: "课语通",
    date: "2026 年 7 月",
    category: "AI 应用",
    techStack: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    intro: "“课语通”是一个基于大语言模型的课程问答助手。用户上传课程资料后，系统能够建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    features: [
      "上传课程资料",
      "建立知识索引",
      "根据课程内容回答问题",
      "提供引用出处",
      "提供知识点小测"
    ],
    technicals: [
      "使用 Python、FastAPI 开发后端",
      "使用 RAG、向量检索和大语言模型 API 实现问答能力",
      "使用 Streamlit 构建交互界面"
    ],
    image: "AI course Q&A assistant interface with RAG knowledge index and upload panel"
  }
];

/* 根据项目字段，条件生成详情区块（无该字段则不输出） */
function detailBlock(title, items) {
  if (!items || (Array.isArray(items) && items.length === 0)) return "";
  const list = Array.isArray(items)
    ? `<ul>${items.map((t) => `<li>${t}</li>`).join("")}</ul>`
    : `<p>${items}</p>`;
  return `
    <div class="project-block">
      <h4>${title}</h4>
      ${list}
    </div>`;
}

/* ---------- 渲染项目列表 ---------- */
function renderProjects() {
  const container = document.getElementById("projects");
  if (!container) return;

  const html = projects
    .map((p) => {
      // 在线配图：按各项目描述生成
      const img = projectImage(p.image);
      return `
        <article class="project">
          <div class="project-media">
            <img src="${img}" alt="${p.name}" loading="lazy" />
          </div>
          <div class="project-info">
            <span class="project-category">${p.category}</span>
            <h3>${p.name}</h3>
            <p class="project-meta">完成时间：${p.date}</p>
            <p class="project-intro">${p.intro}</p>
            ${detailBlock("核心功能", p.features)}
            ${detailBlock("我的工作", p.role)}
            ${detailBlock("成果", p.outcome)}
            ${detailBlock("技术要点", p.technicals)}
            <ul class="tech-list">
              ${p.techStack.map((t) => `<li>${t}</li>`).join("")}
            </ul>
          </div>
        </article>
      `;
    })
    .join("");

  container.innerHTML = html;
}

/* ---------- 滚动时高亮左侧导航 ---------- */
function initNavHighlight() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const sections = Array.from(document.querySelectorAll("section[id]"));

  function onScroll() {
    const scrollPos = scrollY;
    let currentId = sections[0] ? sections[0].id : "";

    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop - 120) {
        currentId = sec.id;
      }
    });

    links.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentId
      );
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- 深浅色主题切换 ---------- */
function initThemeToggle() {
  const TOGGLE_KEY = "portfolio-theme";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  if (!btn) return;

  // 初始化：优先读取用户上次选择，其次跟随系统偏好
  let saved = null;
  try {
    saved = localStorage.getItem(TOGGLE_KEY);
  } catch (e) {
    /* localStorage 不可用时忽略 */
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);

  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(TOGGLE_KEY, next);
    } catch (e) {
      /* 忽略存储失败 */
    }
  });
}

/* ---------- 初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initNavHighlight();
  initThemeToggle();
});