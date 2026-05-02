import { siteContent } from "./site-content.js";

const notesStorageKey = "ani-pari-anniversary";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const heroEyebrow = document.getElementById("hero-eyebrow");
const heroTitle = document.getElementById("hero-title");
const heroSubtitle = document.getElementById("hero-subtitle");
const todayNote = document.getElementById("today-note");
const todayNoteButton = document.getElementById("today-note-button");
const featuredQuote = document.getElementById("featured-quote");
const featuredQuoteAuthor = document.getElementById("featured-quote-author");
const storyIntro = document.getElementById("story-intro");
const pillarGrid = document.getElementById("pillar-grid");
const timeline = document.getElementById("timeline");
const letterCard = document.getElementById("letter-card");
const galleryGrid = document.getElementById("gallery-grid");
const promiseGrid = document.getElementById("promise-grid");
const footerMessage = document.getElementById("footer-message");
const countGrid = document.getElementById("count-grid");
const anniversaryInput = document.getElementById("anniversary-input");
const dateForm = document.getElementById("date-form");
const clearDateButton = document.getElementById("clear-date-button");
const savedDateLabel = document.getElementById("saved-date-label");
const lightbox = document.getElementById("lightbox");
const lightboxMedia = document.getElementById("lightbox-media");
const lightboxKicker = document.getElementById("lightbox-kicker");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const lightboxClose = document.getElementById("lightbox-close");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");

let activeQuoteIndex = 0;
let quoteTimer = null;

function pickRandomNote() {
  const index = Math.floor(Math.random() * siteContent.notes.length);
  return siteContent.notes[index];
}

function renderHero() {
  heroEyebrow.textContent = siteContent.hero.eyebrow;
  heroTitle.innerHTML = `<em>${siteContent.hero.title[0]}</em><span>&</span>${siteContent.hero.title[1]}`;
  heroSubtitle.textContent = siteContent.hero.subtitle;
  todayNote.textContent = pickRandomNote();
}

function renderStory() {
  storyIntro.textContent = siteContent.storyIntro;

  pillarGrid.innerHTML = siteContent.pillars
    .map(
      (pillar) => `
        <article class="pillar-card reveal">
          <p class="pillar-icon">${pillar.icon}</p>
          <h3>${pillar.title}</h3>
          <p>${pillar.text}</p>
        </article>
      `
    )
    .join("");

  timeline.innerHTML = siteContent.timeline
    .map(
      (item, index) => `
        <article class="timeline-item reveal">
          <div class="timeline-marker">${String(index + 1).padStart(2, "0")}</div>
          <div class="timeline-copy">
            <p class="timeline-label">${item.label}</p>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join("");

  letterCard.innerHTML = siteContent.letter
    .map((paragraph, index) =>
      index === 0 || index === siteContent.letter.length - 1
        ? `<p class="letter-line accent">${paragraph}</p>`
        : `<p class="letter-line">${paragraph}</p>`
    )
    .join("");

  promiseGrid.innerHTML = siteContent.promises
    .map(
      (promise) => `
        <article class="promise-card reveal">
          <p>${promise}</p>
        </article>
      `
    )
    .join("");

  footerMessage.textContent = siteContent.footer;
}

function renderGallery() {
  galleryGrid.innerHTML = siteContent.gallery
    .map((item, index) => {
      const isVideo = item.type === "video";
      const hasMedia = Boolean(item.src);
      const previewStyle = item.previewStyle ? ` style="${item.previewStyle}"` : "";
      const media = hasMedia
        ? isVideo
          ? `<div class="gallery-media-shell">
              <video class="gallery-media" src="${item.src}" muted playsinline preload="metadata"></video>
              <span class="gallery-badge">Play</span>
            </div>`
          : `<img class="gallery-media" src="${item.src}" alt="${item.title}" loading="lazy"${previewStyle}>`
        : `<div class="gallery-placeholder placeholder-${(index % 4) + 1}">
            <span>${item.tag}</span>
          </div>`;

      return `
        <button class="gallery-card reveal ${isVideo ? "gallery-card-video" : ""}" type="button" data-gallery-index="${index}">
          ${media}
          <span class="gallery-card-meta">${item.type}</span>
          <strong>${item.title}</strong>
          <span>${item.description}</span>
        </button>
      `;
    })
    .join("");

  galleryGrid.querySelectorAll("[data-gallery-index]").forEach((button) => {
    button.addEventListener("click", () => openLightbox(Number(button.dataset.galleryIndex)));
  });
}

function renderQuote(index) {
  const quote = siteContent.quotes[index];
  featuredQuote.textContent = quote.text;
  featuredQuoteAuthor.textContent = quote.author;
}

function cycleQuote(direction) {
  activeQuoteIndex =
    (activeQuoteIndex + direction + siteContent.quotes.length) % siteContent.quotes.length;
  renderQuote(activeQuoteIndex);
  restartQuoteTimer();
}

function restartQuoteTimer() {
  if (quoteTimer) {
    window.clearInterval(quoteTimer);
  }

  if (!reduceMotion) {
    quoteTimer = window.setInterval(() => {
      cycleQuote(1);
    }, 5500);
  }
}

function renderCounters(dateValue) {
  const cards = [
    { label: "Years", value: "0" },
    { label: "Months", value: "0" },
    { label: "Days", value: "0" },
    { label: "Hours", value: "0" }
  ];

  if (dateValue) {
    const now = new Date();
    const start = new Date(`${dateValue}T00:00:00`);
    const diffMs = Math.max(now.getTime() - start.getTime(), 0);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365.25);
    const months = Math.floor(totalDays / 30.44);

    cards[0].value = String(years);
    cards[1].value = String(months);
    cards[2].value = String(totalDays);
    cards[3].value = String(totalHours);
    savedDateLabel.textContent = `Remembering ${start.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric"
    })}`;
  } else {
    savedDateLabel.textContent = "First hello not set yet";
  }

  countGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="count-card reveal">
          <strong>${card.value}</strong>
          <span>${card.label}</span>
        </article>
      `
    )
    .join("");

  revealObserved();
}

function saveAnniversary(dateValue) {
  if (!dateValue) {
    localStorage.removeItem(notesStorageKey);
    anniversaryInput.value = "";
    renderCounters("");
    return;
  }

  localStorage.setItem(notesStorageKey, dateValue);
  renderCounters(dateValue);
}

function loadAnniversary() {
  const saved = localStorage.getItem(notesStorageKey) || "";
  anniversaryInput.value = saved;
  renderCounters(saved);
}

function openLightbox(index) {
  const item = siteContent.gallery[index];
  lightboxKicker.textContent = item.tag;
  lightboxTitle.textContent = item.title;
  lightboxDescription.textContent = item.description;

  if (item.src && item.type === "video") {
    lightboxMedia.innerHTML = `
      <video class="lightbox-video" src="${item.src}" controls autoplay playsinline preload="metadata"></video>
    `;
  } else if (item.src) {
    lightboxMedia.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
  } else {
    lightboxMedia.innerHTML = `
      <div class="gallery-placeholder lightbox-placeholder placeholder-${(index % 4) + 1}">
        <span>${item.type}</span>
      </div>
    `;
  }

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  }
}

function closeLightbox() {
  const media = lightboxMedia.querySelector("video");
  if (media) {
    media.pause();
  }

  if (lightbox.open) {
    lightbox.close();
  }
}

function buildPetals() {
  const field = document.querySelector(".petal-field");
  const petalCount = reduceMotion ? 10 : 20;

  for (let index = 0; index < petalCount; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.top = `${Math.random() * 30 - 20}%`;
    petal.style.animationDelay = `${Math.random() * 8}s`;
    petal.style.animationDuration = `${9 + Math.random() * 8}s`;
    petal.style.opacity = `${0.2 + Math.random() * 0.6}`;
    petal.style.transform = `scale(${0.7 + Math.random() * 1.2}) rotate(${Math.random() * 180}deg)`;
    field.appendChild(petal);
  }
}

function revealObserved() {
  document.querySelectorAll(".reveal").forEach((element) => {
    if (element.dataset.bound === "true") {
      return;
    }

    element.dataset.bound = "true";
    observer.observe(element);
  });
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
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18
  }
);

function bindEvents() {
  todayNoteButton.addEventListener("click", () => {
    todayNote.textContent = pickRandomNote();
  });

  document.getElementById("prev-quote").addEventListener("click", () => cycleQuote(-1));
  document.getElementById("next-quote").addEventListener("click", () => cycleQuote(1));

  dateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveAnniversary(anniversaryInput.value);
  });

  clearDateButton.addEventListener("click", () => {
    saveAnniversary("");
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    const target = event.target;
    if (target === lightbox) {
      closeLightbox();
    }
  });

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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

function init() {
  renderHero();
  renderStory();
  renderGallery();
  renderQuote(activeQuoteIndex);
  loadAnniversary();
  buildPetals();
  bindEvents();
  revealObserved();
  setActiveNav();
  restartQuoteTimer();
}

init();
