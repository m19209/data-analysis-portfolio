// ===== Theme Management =====
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const targetTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);

  // Re-trigger visual updates on canvases for theme adjustments
  initHeroParticles();
  renderProjectCardVisuals();
});

// ===== Mobile Hamburger Menu (DES-03) =====
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');

if (hamburgerBtn && mobileNav) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });
}

// ===== Mock Project Database (IMP-05: 6 projects now) =====
const projects = [
  {
    id: 'churn-predictor',
    title: 'Predictive Churn Modeling Pipeline',
    category: 'ml',
    shortDesc: 'End-to-end classification pipeline predicting customer churn with gradient boosted trees and explainable AI SHAP values.',
    longDesc: 'Engineered an end-to-end churn prediction framework. Cleansed transactional logs, extracted temporal behavioral features, trained an optimized XGBoost classifier, and integrated SHAP (SHapley Additive exPlanations) values to explain individual subscriber churn risks.',
    tags: ['XGBoost', 'Python', 'SHAP', 'Pandas'],
    metric: '91.8% AUC-ROC',
    tools: 'Scikit-Learn, Pandas, Python, XGBoost',
    methodology: 'Processed 5.2M historical interaction logs. Features included average session duration shifts and customer support request rates. Deployed model using a fast lightweight inference pipeline that delivers customer churn probability metrics directly to CRM dashboards.',
    chartType: 'line',
    chartData: [
      { label: 'Q1', value: 82 },
      { label: 'Q2', value: 85 },
      { label: 'Q3', value: 89 },
      { label: 'Q4', value: 92 }
    ]
  },
  {
    id: 'logistics-warehouse',
    title: 'Logistics Warehousing ETL Optimizer',
    category: 'sql',
    shortDesc: 'Database optimization scheme reshaping schema architectures and indexing structures to streamline supply chain routing pipelines.',
    longDesc: 'Architected structural migrations and materialized view indexing overlays for a global supply chain warehousing system. Redesigned heavy multi-table join structures into denormalized dimensional models that vastly reduce disk read latencies.',
    tags: ['PostgreSQL', 'dbt', 'Schema Design', 'Index Perf'],
    metric: '4.2x Latency Cut',
    tools: 'PostgreSQL, dbt (data build tool), Query Optimization',
    methodology: 'Identified query bottlenecks using PG Explain Analyze. Redesigned schemas using snowflake dimension models and implemented partial indexing based on typical warehouse routing filters, reducing critical route search times from 8.2s to 1.9s.',
    chartType: 'bar',
    chartData: [
      { label: 'Original', value: 82 },
      { label: 'Index Fix', value: 45 },
      { label: 'dbt Model', value: 31 },
      { label: 'Final Query', value: 19 }
    ]
  },
  {
    id: 'stream-ingest',
    title: 'Real-Time User Engagement Stream',
    category: 'python',
    shortDesc: 'High-throughput event streaming collector utilizing parallel consumers to compute live scrolling user interaction analytics.',
    longDesc: 'Created a multithreaded Python event processing system capable of pulling user clickstreams off event brokers, calculating running aggregates over dynamic time windows, and loading result states to low-latency memory stores.',
    tags: ['Python', 'Kafka', 'Redis', 'Parallelism'],
    metric: '100K Events/Sec',
    tools: 'Python Asyncio, Apache Kafka, Redis, Multi-threading',
    methodology: 'Built using Python asyncio streams and partition-aware Kafka consumers. Implemented a sliding window aggregator using Redis sorted sets to store user session click behaviors, supplying dynamic dashboard widgets with active session metrics under 15ms.',
    chartType: 'line',
    chartData: [
      { label: '10s', value: 35 },
      { label: '20s', value: 68 },
      { label: '30s', value: 95 },
      { label: '40s', value: 102 }
    ]
  },
  {
    id: 'fintech-growth',
    title: 'Fintech Market Growth Intelligence',
    category: 'viz',
    shortDesc: 'A financial dashboard translating complex portfolio performance vectors into interactive metric matrices and risk curves.',
    longDesc: 'Constructed an analytical interface presenting portfolio asset allocations, real-time risk indicators, and historical yield distributions. Built from scratch using native responsive SVG vector layers to support high-fidelity zoom interactions.',
    tags: ['SVG Viz', 'D3 Algorithms', 'Vanilla JS', 'Finance'],
    metric: '+$180K Identified',
    tools: 'Vanilla HTML5 Canvas, SVG vectors, D3.js Math, Finance Data',
    methodology: 'Integrated mathematical modeling scripts in JavaScript to simulate asset yield curves and risk variances. The resulting analytics interface gives corporate clients the power to adjust allocation sliders and immediately witness simulated returns.',
    chartType: 'bar',
    chartData: [
      { label: 'Asset A', value: 30 },
      { label: 'Asset B', value: 55 },
      { label: 'Asset C', value: 78 },
      { label: 'Asset D', value: 110 }
    ]
  },
  // IMP-05: Two additional projects for better grid fill
  {
    id: 'nlp-sentiment',
    title: 'NLP Sentiment Analysis Engine',
    category: 'ml',
    shortDesc: 'Deep learning NLP pipeline classifying customer feedback sentiment across multilingual support channels with transformer embeddings.',
    longDesc: 'Developed a multi-class sentiment analysis engine leveraging fine-tuned DistilBERT transformer embeddings on domain-specific customer review corpora. The system processes incoming support tickets and social mentions in real-time, producing actionable sentiment scores for product teams.',
    tags: ['NLP', 'Transformers', 'PyTorch', 'BERT'],
    metric: '94.3% F1 Score',
    tools: 'PyTorch, HuggingFace Transformers, spaCy, FastAPI',
    methodology: 'Fine-tuned DistilBERT on 120K labeled product reviews spanning 3 languages. Built a FastAPI microservice deployment with batch inference capabilities. Integrated LIME explainability to highlight key phrases driving sentiment predictions for stakeholder trust.',
    chartType: 'bar',
    chartData: [
      { label: 'Positive', value: 94 },
      { label: 'Neutral', value: 88 },
      { label: 'Negative', value: 96 },
      { label: 'Mixed', value: 79 }
    ]
  },
  {
    id: 'tableau-executive',
    title: 'Executive KPI Tableau Dashboard',
    category: 'viz',
    shortDesc: 'Interactive executive dashboard aggregating cross-departmental KPIs into drill-down visuals for C-suite strategic briefings.',
    longDesc: 'Designed and deployed a comprehensive Tableau dashboard suite that aggregates real-time data from sales, marketing, operations, and finance departments. Features drill-down capabilities, automated data refresh pipelines, and mobile-optimized views for executive consumption.',
    tags: ['Tableau', 'Data Modeling', 'KPI Design', 'ETL'],
    metric: '32% Faster Decisions',
    tools: 'Tableau Desktop & Server, SQL Server, Python ETL Scripts',
    methodology: 'Built a medallion data architecture (bronze/silver/gold) feeding Tableau extracts. Designed 14 interconnected worksheets with parameter-driven filtering. Automated daily ETL refresh cycles and implemented row-level security for department-specific data access controls.',
    chartType: 'line',
    chartData: [
      { label: 'Jan', value: 45 },
      { label: 'Apr', value: 62 },
      { label: 'Jul', value: 85 },
      { label: 'Oct', value: 105 }
    ]
  }
];

// ===== Dynamic Project Cards Rendering =====
const gridContainer = document.getElementById('project-grid-container');

function renderProjects(filter = 'all') {
  gridContainer.style.opacity = 0;

  setTimeout(() => {
    gridContainer.innerHTML = '';

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    // JS-05 FIX: Empty state when no results
    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p>No projects match this filter.</p>
        </div>
      `;
      gridContainer.style.opacity = 1;
      gridContainer.style.transition = 'opacity 0.3s ease';
      return;
    }

    filtered.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'project-card glass-panel';
      card.setAttribute('data-id', proj.id);
      // A11Y-03 FIX: Keyboard accessible cards
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${proj.title}`);

      card.innerHTML = `
        <div class="project-card-image">
          <canvas id="canvas-thumb-${proj.id}"></canvas>
          <div class="project-card-badge">${proj.category.toUpperCase()}</div>
        </div>
        <div class="project-card-content">
          <h3>${proj.title}</h3>
          <p>${proj.shortDesc}</p>
          <div class="project-card-footer">
            <div class="project-card-metric">${proj.metric}</div>
            <div class="project-card-tags">
              ${proj.tags.slice(0, 3).map(t => `<span class="project-card-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="project-card-cta">
            View Details
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      `;

      gridContainer.appendChild(card);

      // Click and keyboard events
      card.addEventListener('click', () => openProjectModal(proj.id));
      // A11Y-03 FIX: Keyboard activation
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(proj.id);
        }
      });

      // Stagger reveal for cards
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, idx * 80);
    });

    // Render the abstract visual thumbnails
    renderProjectCardVisuals();

    gridContainer.style.opacity = 1;
    gridContainer.style.transition = 'opacity 0.3s ease';
  }, 200);
}

// ===== Canvas Particle System (BUG-05 FIX: pausable) =====
let heroCanvas = document.getElementById('particle-canvas');
let heroCtx = heroCanvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 140 };
let particleAnimationId = null;
let heroIsVisible = true;

function initHeroParticles() {
  heroCanvas.width = heroCanvas.parentElement.clientWidth;
  heroCanvas.height = heroCanvas.parentElement.clientHeight;
  particles = [];

  const particleCount = Math.min(80, Math.floor((heroCanvas.width * heroCanvas.height) / 15000));

  const isLight = htmlEl.getAttribute('data-theme') === 'light';
  // JS-02 FIX: Store RGB values separately for clean alpha construction
  const particleRGB = isLight ? '37, 99, 235' : '0, 242, 254';
  const particleAlpha = isLight ? 0.25 : 0.4;
  const lineRGB = isLight ? '37, 99, 235' : '0, 242, 254';
  const lineBaseAlpha = isLight ? 0.08 : 0.1;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * heroCanvas.width,
      y: Math.random() * heroCanvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5,
      rgb: particleRGB,
      alpha: particleAlpha,
      lineRGB: lineRGB,
      lineBaseAlpha: lineBaseAlpha
    });
  }
}

function animateHeroParticles() {
  if (!heroIsVisible) {
    particleAnimationId = null;
    return;
  }

  heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > heroCanvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > heroCanvas.height) p.vy *= -1;

    // Mouse proximity repulsion
    if (mouse.x !== null && mouse.y !== null) {
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouse.radius) {
        let force = (mouse.radius - dist) / mouse.radius;
        let angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * force * 2;
        p.y += Math.sin(angle) * force * 2;
      }
    }

    // Draw Node
    heroCtx.beginPath();
    heroCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    heroCtx.fillStyle = `rgba(${p.rgb}, ${p.alpha})`;
    heroCtx.fill();
  });

  // Draw connection vectors (constellation) — JS-02 FIX: clean alpha
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        let alpha = ((120 - dist) / 120) * particles[i].lineBaseAlpha;
        heroCtx.beginPath();
        heroCtx.moveTo(particles[i].x, particles[i].y);
        heroCtx.lineTo(particles[j].x, particles[j].y);
        heroCtx.strokeStyle = `rgba(${particles[i].lineRGB}, ${alpha})`;
        heroCtx.lineWidth = 1;
        heroCtx.stroke();
      }
    }
  }

  particleAnimationId = requestAnimationFrame(animateHeroParticles);
}

function startParticles() {
  if (!particleAnimationId && heroIsVisible) {
    particleAnimationId = requestAnimationFrame(animateHeroParticles);
  }
}

function stopParticles() {
  if (particleAnimationId) {
    cancelAnimationFrame(particleAnimationId);
    particleAnimationId = null;
  }
}

// BUG-05 FIX: Pause particles when hero is off-screen
const heroSection = document.getElementById('hero');
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    heroIsVisible = entry.isIntersecting;
    if (heroIsVisible) {
      startParticles();
    } else {
      stopParticles();
    }
  });
}, { threshold: 0.05 });

heroObserver.observe(heroSection);

// Mouse interaction listeners
heroCanvas.addEventListener('mousemove', (e) => {
  let rect = heroCanvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

heroCanvas.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

// JS-03 FIX: Debounced resize handler
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initHeroParticles();
  }, 150);
});

// ===== Programmatic Abstract Data Art Renderers for Cards =====
// BUG-03 FIX: Deterministic pseudo-random using seeded sine function
function seededRandom(seed) {
  return Math.abs(Math.sin(seed * 9.8765 + 4.321) * 43758.5453) % 1;
}

function renderProjectCardVisuals() {
  const isLight = htmlEl.getAttribute('data-theme') === 'light';

  projects.forEach(proj => {
    const canvas = document.getElementById(`canvas-thumb-${proj.id}`);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 340;
    canvas.height = 200;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const accent = isLight ? '#2563eb' : '#00f2fe';
    const accentSecondary = isLight ? '#ea580c' : '#ff7b00';
    const gridColor = isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)';

    // Draw Grid Lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (proj.category === 'ml') {
      // Regression curves & scatter dots
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.7);
      for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height * 0.7 - Math.sin(x * 0.02) * 40 - (x * 0.2);
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = accentSecondary;
      for (let i = 0; i < 15; i++) {
        let x = 40 + i * 20;
        let baseY = canvas.height * 0.7 - Math.sin(x * 0.02) * 40 - (x * 0.2);
        // BUG-03 FIX: deterministic scatter
        let y = baseY + (seededRandom(i + proj.id.charCodeAt(0)) - 0.5) * 20;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (proj.category === 'sql') {
      // Abstract database indexing tables
      ctx.fillStyle = gridColor;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;

      for (let i = 0; i < 3; i++) {
        let x = 40 + i * 90;
        let y = 50 + i * 20;
        ctx.beginPath();
        ctx.roundRect(x, y, 70, 80, 6);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
        for (let l = 0; l < 4; l++) {
          ctx.beginPath();
          ctx.moveTo(x + 10, y + 15 + l * 15);
          ctx.lineTo(x + 60, y + 15 + l * 15);
          ctx.stroke();
        }
        ctx.strokeStyle = accent;
      }
    } else if (proj.category === 'python') {
      // BUG-03 FIX: Event streaming peaks with deterministic heights
      ctx.fillStyle = isLight ? 'rgba(37,99,235,0.05)' : 'rgba(0,242,254,0.05)';
      ctx.strokeStyle = accent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x < canvas.width; x += 15) {
        let y = canvas.height - 40 - (seededRandom(x * 0.1 + proj.id.charCodeAt(2)) * 100);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      // BI / Viz: Bar charts
      ctx.fillStyle = accent;
      const barCount = 7;
      const barWidth = 20;
      const gap = 15;
      const startX = (canvas.width - (barCount * (barWidth + gap))) / 2;

      for (let i = 0; i < barCount; i++) {
        let h = 40 + i * 18;
        let x = startX + i * (barWidth + gap);
        let y = canvas.height - h - 30;

        ctx.fillStyle = i === barCount - 1 ? accentSecondary : accent;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, h, [4, 4, 0, 0]);
        ctx.fill();
      }
    }
  });
}

// ===== Modal Presentation Controller =====
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-project-title');
const modalDesc = document.getElementById('modal-project-desc');
const modalCategory = document.getElementById('modal-project-category');
const modalMetric = document.getElementById('modal-project-metric');
const modalTools = document.getElementById('modal-project-tools');
const modalMethod = document.getElementById('modal-project-methodology');

// A11Y-05 FIX: Focus trap variables
let previouslyFocusedElement = null;

function openProjectModal(id) {
  const proj = projects.find(p => p.id === id);
  if (!proj) return;

  // A11Y-05: Store previously focused element
  previouslyFocusedElement = document.activeElement;

  // Populate data fields
  modalTitle.textContent = proj.title;
  modalDesc.textContent = proj.longDesc;
  modalCategory.textContent = proj.category.toUpperCase();
  modalMetric.textContent = proj.metric;
  modalTools.textContent = proj.tools;
  modalMethod.textContent = proj.methodology;

  // Activate modal overlay
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // A11Y-05: Move focus to close button
  setTimeout(() => {
    modalClose.focus();
  }, 100);

  // JS-06 FIX: Delay chart render until modal transition settles
  setTimeout(() => {
    renderModalSVGChart(proj);
  }, 450);
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';

  // JS-04 FIX: Hide tooltip on modal close
  const tooltip = document.getElementById('svg-chart-tooltip');
  if (tooltip) tooltip.style.opacity = 0;

  // A11Y-05: Restore focus to previously focused element
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// A11Y-05 FIX: Focus trap inside modal
modal.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  if (!modal.classList.contains('active')) return;

  const focusableEls = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstEl = focusableEls[0];
  const lastEl = focusableEls[focusableEls.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === firstEl) {
      lastEl.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastEl) {
      firstEl.focus();
      e.preventDefault();
    }
  }
});

// ===== Programmatic Interactive SVG Chart Generator =====
const chartContainer = document.getElementById('chart-svg-container');

function renderModalSVGChart(proj) {
  const isLight = htmlEl.getAttribute('data-theme') === 'light';
  chartContainer.innerHTML = '';

  const width = chartContainer.clientWidth || 350;
  const height = 240;

  const accentColor = isLight ? '#2563eb' : '#00f2fe';
  const accentWarm = isLight ? '#ea580c' : '#ff7b00';
  const textColor = isLight ? '#475569' : '#94a3b8';
  const strokeColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';

  // Tooltip
  let tooltip = document.getElementById('svg-chart-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'svg-chart-tooltip';
    tooltip.className = 'chart-tooltip';
    document.body.appendChild(tooltip);
  }

  // A11Y-06 FIX: Accessible SVG with role and title
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', `${proj.title} data visualization chart`);

  // Add <title> element for screen readers
  const svgTitle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
  svgTitle.textContent = `${proj.chartType === 'line' ? 'Line' : 'Bar'} chart showing ${proj.title} performance data`;
  svg.appendChild(svgTitle);

  // Grid lines
  const gridLinesCount = 5;
  for (let i = 0; i <= gridLinesCount; i++) {
    const y = 30 + i * ((height - 70) / gridLinesCount);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '40');
    line.setAttribute('y1', y);
    line.setAttribute('x2', width - 20);
    line.setAttribute('y2', y);
    line.setAttribute('stroke', strokeColor);
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '10');
    text.setAttribute('y', y + 4);
    text.setAttribute('fill', textColor);
    text.setAttribute('font-size', '10px');
    text.textContent = Math.round(120 - i * 20);
    svg.appendChild(text);
  }

  const data = proj.chartData;
  const paddingX = 60;
  const graphWidth = width - paddingX - 40;
  const stepX = graphWidth / (data.length - 1 || 1);

  if (proj.chartType === 'line') {
    let pathD = '';
    const points = [];

    data.forEach((d, idx) => {
      const x = paddingX + idx * stepX;
      const valRatio = Math.min(120, d.value) / 120;
      const y = height - 40 - valRatio * (height - 70);

      points.push({ x, y, label: d.label, val: d.value });
      if (idx === 0) pathD += `M ${x} ${y}`;
      else pathD += ` L ${x} ${y}`;
    });

    // Glowing area fill
    const pathFill = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathFill.setAttribute('d', `${pathD} L ${points[points.length-1].x} ${height-40} L ${points[0].x} ${height-40} Z`);
    pathFill.setAttribute('fill', isLight ? 'rgba(37,99,235,0.06)' : 'rgba(0, 242, 254, 0.08)');
    svg.appendChild(pathFill);

    // Primary line
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', accentColor);
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);

    // Interactive data nodes
    points.forEach(p => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', p.x);
      circle.setAttribute('cy', p.y);
      circle.setAttribute('r', '5');
      circle.setAttribute('fill', accentWarm);
      circle.setAttribute('stroke', isLight ? '#fff' : '#070a13');
      circle.setAttribute('stroke-width', '2');
      circle.style.cursor = 'pointer';
      circle.style.transition = 'r 0.15s ease';

      circle.addEventListener('mouseenter', () => {
        circle.setAttribute('r', '8');
        tooltip.innerHTML = `<strong>${p.label}</strong>: ${p.val}`;
        tooltip.style.opacity = 1;
      });
      circle.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY - 25}px`;
      });
      circle.addEventListener('mouseleave', () => {
        circle.setAttribute('r', '5');
        tooltip.style.opacity = 0;
      });

      svg.appendChild(circle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', p.x);
      text.setAttribute('y', height - 15);
      text.setAttribute('fill', textColor);
      text.setAttribute('font-size', '10px');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = p.label;
      svg.appendChild(text);
    });
  } else {
    // Bar Chart
    const barWidth = Math.min(45, graphWidth / data.length - 20);
    const spacingX = graphWidth / data.length;

    data.forEach((d, idx) => {
      const valRatio = Math.min(120, d.value) / 120;
      const barHeight = valRatio * (height - 70);
      const x = paddingX + idx * spacingX + (spacingX - barWidth) / 2;
      const y = height - 40 - barHeight;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', barWidth);
      rect.setAttribute('height', barHeight);
      rect.setAttribute('fill', idx % 2 === 0 ? accentColor : accentWarm);
      rect.setAttribute('rx', '4');
      rect.style.cursor = 'pointer';
      rect.style.transition = 'opacity 0.15s ease';

      rect.addEventListener('mouseenter', () => {
        rect.style.opacity = '0.8';
        tooltip.innerHTML = `<strong>${d.label}</strong>: ${d.value}`;
        tooltip.style.opacity = 1;
      });
      rect.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY - 25}px`;
      });
      rect.addEventListener('mouseleave', () => {
        rect.style.opacity = '1';
        tooltip.style.opacity = 0;
      });

      svg.appendChild(rect);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x + barWidth / 2);
      text.setAttribute('y', height - 15);
      text.setAttribute('fill', textColor);
      text.setAttribute('font-size', '10px');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = d.label;
      svg.appendChild(text);
    });
  }

  chartContainer.appendChild(svg);
}

// ===== Portfolio Grid Filter Mechanics (A11Y-04 FIX) =====
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // A11Y-04 FIX: Toggle aria-pressed
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.getAttribute('data-filter');
    renderProjects(filter);
  });
});

// ===== Scroll Event for Explore Button =====
const exploreBtn = document.getElementById('explore-btn');
const showroomSec = document.getElementById('showroom');

exploreBtn.addEventListener('click', () => {
  showroomSec.scrollIntoView({ behavior: 'smooth' });
});

// ===== Form Submission Micro-Interaction =====
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const origContent = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.style.opacity = 0.8;
  submitBtn.innerHTML = `Connecting Protocol...`;

  setTimeout(() => {
    submitBtn.innerHTML = `Transmission Sent Successfully!`;
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    submitBtn.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.4)';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.style.opacity = 1;
      submitBtn.style.background = '';
      submitBtn.style.boxShadow = '';
      submitBtn.innerHTML = origContent;
    }, 3000);
  }, 1500);
});

// ===== Skills Animation Observer =====
const skillsGrid = document.getElementById('skills-grid');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillsGrid.classList.add('skills-activated');
    }
  });
}, { threshold: 0.15 });

skillsObserver.observe(skillsGrid);

// ===== IMP-01: Scroll Reveal Animation for .reveal elements =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger the reveal
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, idx * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== IMP-02: Scroll Progress Bar =====
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  }, { passive: true });
}

// ===== IMP-03: Back to Top Button =====
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Initial Execution =====
initHeroParticles();
startParticles();
renderProjects();
