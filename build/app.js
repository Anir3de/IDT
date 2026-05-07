import { siteContent } from "./site-content.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const heroEyebrow = document.getElementById("hero-eyebrow");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const heroFeatures = document.getElementById("hero-features");
const heroStatStrip = document.getElementById("hero-stat-strip");
const heroMontage = document.getElementById("hero-montage");
const teamGrid = document.getElementById("team-grid");
const signalList = document.getElementById("signal-list");
const posterSummary = document.getElementById("poster-summary");
const storyGallery = document.getElementById("story-gallery");
const researchGrid = document.getElementById("research-grid");
const strategyGrid = document.getElementById("strategy-grid");
const frameworkCard = document.getElementById("framework-card");
const prototypeCard = document.getElementById("prototype-card");
const budgetCard = document.getElementById("budget-card");
const timelineCard = document.getElementById("timeline-card");
const closingTitle = document.getElementById("closing-title");
const closingCopy = document.getElementById("closing-copy");
const closingPillars = document.getElementById("closing-pillars");
const footerCopy = document.getElementById("footer-copy");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");

function renderMetricTiles(metrics, compact = false) {
  return metrics
    .map(
      (metric) => `
        <article class="metric-tile ${compact ? "compact" : ""}">
          <strong class="count-up" data-count="${metric.value}" data-suffix="${metric.suffix || ""}">0${metric.suffix || ""}</strong>
          <span>${metric.label}</span>
          <small>${metric.source}</small>
        </article>
      `
    )
    .join("");
}

function renderList(items, className = "bullet-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderImageCrop(item, className) {
  return `
    <div class="${className}">
      <img src="${item.src}" alt="${item.title || item.name}" style="object-position: ${item.position};">
    </div>
  `;
}

function renderHero() {
  heroEyebrow.textContent = siteContent.hero.eyebrow;
  heroTitle.innerHTML = siteContent.hero.title
    .map((line, index) => `<span class="title-line title-line-${index + 1}">${line}</span>`)
    .join("");
  heroDescription.textContent = siteContent.hero.description;

  heroFeatures.innerHTML = siteContent.heroFeatures
    .map(
      (feature, index) => `
        <div class="feature-chip feature-chip-${index + 1}">
          <span class="feature-index">0${index + 1}</span>
          <strong>${feature}</strong>
        </div>
      `
    )
    .join("");

  heroStatStrip.innerHTML = renderMetricTiles(siteContent.metrics, true);

  heroMontage.innerHTML = siteContent.heroMontage
    .map(
      (item, index) => `
        <article class="montage-card montage-card-${index + 1} ${item.tone}">
          ${renderImageCrop(item, "montage-image")}
          <div class="montage-copy">
            <p>${item.title}</p>
            <span>${item.caption}</span>
          </div>
        </article>
      `
    )
    .join("");

  teamGrid.innerHTML = siteContent.team
    .map(
      (member) => `
        <article class="team-card ${member.accent}">
          <div class="team-photo-wrap">
            <img class="team-photo" src="${member.image}" alt="${member.name}" style="object-position: ${member.position};">
          </div>
          <div>
            <h3>${member.name}</h3>
            <p class="team-role">${member.role}</p>
            <p class="team-note">${member.note}</p>
          </div>
        </article>
      `
    )
    .join("");

  signalList.innerHTML = siteContent.heroSignals
    .map(
      (signal, index) => `
        <div class="signal-item">
          <span>${index + 1}</span>
          <p>${signal}</p>
        </div>
      `
    )
    .join("");
}

function renderPosterSummary() {
  posterSummary.innerHTML = `
    <div class="deck-card summary-card highlight-card">
      <p class="card-kicker">Deck advantage</p>
      <h3>${siteContent.posterSummary.title}</h3>
      <p>${siteContent.posterSummary.text}</p>
    </div>
    <div class="deck-card summary-card glow-card">
      <p class="card-kicker">What improves</p>
      ${renderList(siteContent.posterSummary.highlights)}
    </div>
    <div class="deck-card summary-card light-card">
      <p class="card-kicker">Core system</p>
      <div class="summary-pills">
        ${siteContent.heroFeatures.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderVisualStory() {
  storyGallery.innerHTML = siteContent.visualStory
    .map(
      (item, index) => `
        <article class="gallery-card reveal ${item.tone} gallery-card-${index + 1}">
          ${renderImageCrop(item, "gallery-photo")}
          <div class="gallery-content">
            <p class="gallery-tag">${item.tag}</p>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderResearch() {
  const { problem, bigIdea, persona, stakeholders, inspirationTools, insights } = siteContent.research;

  researchGrid.innerHTML = `
    <article class="deck-card reveal tone-violet">
      <p class="card-kicker">1.1 ${problem.title}</p>
      <h3>Burnout is affecting both well-being and performance.</h3>
      <p>${problem.intro}</p>
      <div class="metrics-grid">
        ${renderMetricTiles(siteContent.metrics)}
      </div>
      <p class="result-note">${problem.outcome}</p>
    </article>

    <article class="deck-card reveal tone-mint">
      <p class="card-kicker">1.2 ${bigIdea.title}</p>
      <h3>One intelligent support ecosystem.</h3>
      ${bigIdea.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      <div class="check-grid">
        ${bigIdea.checklist.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </article>

    <article class="deck-card reveal persona-card tone-cyan">
      <p class="card-kicker">1.3 User persona and interviews</p>
      <div class="persona-header">
        <img class="persona-photo" src="${persona.image}" alt="${persona.name}" style="object-position: ${persona.position};">
        <div>
          <h3>${persona.name}</h3>
          <p>${persona.role} • Age ${persona.age} • ${persona.location}</p>
        </div>
      </div>
      <div class="persona-columns">
        <div>
          <h4>Goals</h4>
          ${renderList(persona.goals)}
        </div>
        <div>
          <h4>Frustrations</h4>
          ${renderList(persona.frustrations)}
        </div>
      </div>
      <blockquote>${persona.quote}</blockquote>
      <p class="interview-note">
        Interviews with 15 students revealed repeated themes around overload, procrastination, lack of structure, and the need for support that feels personal instead of generic.
      </p>
    </article>

    <article class="deck-card reveal tone-orange">
      <p class="card-kicker">1.4 Stakeholders</p>
      <h3>Support around the student matters too.</h3>
      ${renderList(stakeholders, "stakeholder-list")}
    </article>

    <article class="deck-card reveal tools-card tone-sunset">
      <p class="card-kicker">1.5 Inspiration tools</p>
      <h3>Empathy map and AEIOU analysis.</h3>
      <div class="tools-layout">
        <div class="tool-panel">
          <h4>Empathy map</h4>
          <div class="mini-columns">
            <div>
              <strong>Says</strong>
              ${renderList(inspirationTools.empathyMap.says, "micro-list")}
            </div>
            <div>
              <strong>Thinks</strong>
              ${renderList(inspirationTools.empathyMap.thinks, "micro-list")}
            </div>
            <div>
              <strong>Does</strong>
              ${renderList(inspirationTools.empathyMap.does, "micro-list")}
            </div>
            <div>
              <strong>Feels</strong>
              ${renderList(inspirationTools.empathyMap.feels, "micro-list")}
            </div>
          </div>
        </div>
        <div class="tool-panel">
          <h4>AEIOU</h4>
          <div class="aeiou-table">
            ${inspirationTools.aeiou
              .map(
                (item) => `
                  <div class="aeiou-row">
                    <span>${item.label}</span>
                    <p>${item.value}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </article>

    <article class="deck-card reveal tone-deep">
      <p class="card-kicker">Key insights</p>
      <h3>What the research made impossible to ignore.</h3>
      ${renderList(insights)}
    </article>
  `;
}

function renderStrategy() {
  const { strategicDefinition, boundaries, valueCanvas, operationalPlan, practicalTools } = siteContent.strategy;

  strategyGrid.innerHTML = `
    <article class="deck-card reveal tone-violet">
      <p class="card-kicker">2.1 Strategic definition</p>
      <h3>Problem statement and SMART goal.</h3>
      <p>${strategicDefinition.problemStatement}</p>
      ${renderList(strategicDefinition.smartGoal)}
    </article>

    <article class="deck-card reveal tone-cyan">
      <p class="card-kicker">2.2 Project boundaries</p>
      <h3>What belongs in the first release.</h3>
      <div class="scope-columns">
        <div>
          <h4>In scope</h4>
          ${renderList(boundaries.inScope)}
        </div>
        <div>
          <h4>Out of scope</h4>
          ${renderList(boundaries.outOfScope)}
        </div>
      </div>
    </article>

    <article class="deck-card reveal tone-mint">
      <p class="card-kicker">2.3 Value canvas</p>
      <h3>Business and social value.</h3>
      <div class="value-grid">
        ${valueCanvas
          .map(
            (group) => `
              <div class="value-card">
                <h4>${group.title}</h4>
                ${renderList(group.items, "micro-list")}
              </div>
            `
          )
          .join("")}
      </div>
    </article>

    <article class="deck-card reveal tone-orange">
      <p class="card-kicker">2.4 Operational plan</p>
      <h3>From insight to launch.</h3>
      <div class="plan-steps">
        ${operationalPlan
          .map(
            (step, index) => `
              <div class="plan-step">
                <span>${index + 1}</span>
                <p>${step}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </article>

    <article class="deck-card reveal wide-card tone-sunset">
      <p class="card-kicker">2.5 Practical tools</p>
      <h3>SCAMPER thinking and a simple decision matrix.</h3>
      <div class="tools-layout">
        <div class="tool-panel">
          <h4>SCAMPER prompts</h4>
          ${renderList(practicalTools.scamper)}
        </div>
        <div class="tool-panel">
          <h4>Decision matrix</h4>
          <div class="matrix-table">
            <div class="matrix-row matrix-head">
              <span>Solution</span>
              <span>Total</span>
            </div>
            ${practicalTools.matrix
              .map(
                (item) => `
                  <div class="matrix-row">
                    <p>${item.name}</p>
                    <strong>${item.total}</strong>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderImplementation() {
  frameworkCard.innerHTML = `
    <p class="card-kicker">3.1 Structural framework</p>
    <h3>Design thinking drives the build.</h3>
    <div class="framework-steps">
      ${siteContent.implementation.framework
        .map(
          (step, index) => `
            <div class="framework-step">
              <span>${index + 1}</span>
              <strong>${step}</strong>
            </div>
          `
        )
        .join("")}
    </div>
    <p class="support-copy">
      This framework keeps the ecosystem human-centered while still making the concept feel buildable, testable, and realistic in front of an audience.
    </p>
  `;

  prototypeCard.innerHTML = `
    <p class="card-kicker">3.2 Deliverables and prototypes</p>
    <h3>Four product surfaces that make the ecosystem tangible.</h3>
    <div class="prototype-grid">
      ${siteContent.implementation.prototypes
        .map(
          (prototype, index) => `
            <article class="device-card device-tone-${(index % 4) + 1}">
              <div class="device-topbar"></div>
              <p class="device-name">${prototype.name}</p>
              <strong>${prototype.focus}</strong>
              ${renderList(prototype.details, "micro-list")}
            </article>
          `
        )
        .join("")}
    </div>
    <div class="product-metrics">
      ${siteContent.implementation.productMetrics
        .map(
          (metric) => `
            <div class="product-metric">
              <strong>${metric.value}</strong>
              <span>${metric.label}</span>
              <small>${metric.trend}</small>
            </div>
          `
        )
        .join("")}
    </div>
    <div class="presentation-points">
      ${siteContent.implementation.presentationPoints.map((item) => `<span>${item}</span>`).join("")}
    </div>
  `;

  budgetCard.innerHTML = `
    <p class="card-kicker">3.3 Budget</p>
    <h3>Estimated budget in INR.</h3>
    <div class="budget-table">
      ${siteContent.implementation.budget
        .map(
          (row) => `
            <div class="budget-row">
              <span>${row.item}</span>
              <strong>${row.amount}</strong>
            </div>
          `
        )
        .join("")}
    </div>
    <div class="budget-total">
      <span>Total</span>
      <strong>INR ${siteContent.implementation.budgetTotal}</strong>
    </div>
  `;

  timelineCard.innerHTML = `
    <p class="card-kicker">3.4 Timeline</p>
    <h3>Six-month rollout plan.</h3>
    <div class="timeline-head">
      <span>M1</span>
      <span>M2</span>
      <span>M3</span>
      <span>M4</span>
      <span>M5</span>
      <span>M6</span>
    </div>
    <div class="timeline-list">
      ${siteContent.implementation.timeline
        .map(
          (item) => `
            <div class="timeline-row">
              <p>${item.label}</p>
              <div class="timeline-track">
                <span class="timeline-bar ${item.tone}" style="grid-column: ${item.start} / span ${item.span};"></span>
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderClosing() {
  closingTitle.textContent = siteContent.closing.title;
  closingCopy.textContent = siteContent.closing.copy;
  closingPillars.innerHTML = siteContent.closing.pillars.map((item) => `<span>${item}</span>`).join("");
  footerCopy.textContent = siteContent.closing.footer;
}

function animateCounters() {
  const counters = document.querySelectorAll(".count-up");

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.played === "true") {
          return;
        }

        entry.target.dataset.played = "true";
        const target = Number(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || "";

        if (reduceMotion) {
          entry.target.textContent = `${target}${suffix}`;
          return;
        }

        const start = performance.now();
        const duration = 1200;

        const tick = (timestamp) => {
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(target * eased);
          entry.target.textContent = `${value}${suffix}`;

          if (progress < 1) {
            window.requestAnimationFrame(tick);
          }
        };

        window.requestAnimationFrame(tick);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => countObserver.observe(counter));
}

function initReveal() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

function setActiveNav() {
  const sections = document.querySelectorAll(".section-observed");
  const navLinks = [...siteNav.querySelectorAll("a")];

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
        });
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function bindMenu() {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("open", !expanded);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("open");
    });
  });
}

function init() {
  renderHero();
  renderPosterSummary();
  renderVisualStory();
  renderResearch();
  renderStrategy();
  renderImplementation();
  renderClosing();
  animateCounters();
  initReveal();
  setActiveNav();
  bindMenu();
}

init();
