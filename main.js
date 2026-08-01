/* ═══════════════════════════════════════════════════════════
   main.js — Portfolio Interactions
   Preloader · Hero Reveal · Scroll Reveal · Parallax
   Project List · Thumbnail Follow · Cursor · Toggle
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // Force scroll to top immediately on script load to prevent scroll jumps and premature observer triggers
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  /* ══════════════════════════════════════════════
     UTILS
  ══════════════════════════════════════════════ */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /* ══════════════════════════════════════════════
     1. PRELOADER
  ══════════════════════════════════════════════ */
  const preloader = document.getElementById("preloader");
  const preloaderNum = document.getElementById("preloader-number");
  const preloaderBar = document.getElementById("preloader-progress");

  const LOAD_DURATION = 2200;
  const loadStart = performance.now();

  function updatePreloader(now) {
    const elapsed = now - loadStart;
    const progress = Math.min(elapsed / LOAD_DURATION, 1);
    const eased = easeOutCubic(progress);
    const current = Math.floor(eased * 100);

    preloaderNum.textContent = String(current).padStart(2, "0");
    if (preloaderBar) preloaderBar.style.width = current + "%";

    if (progress < 1) {
      requestAnimationFrame(updatePreloader);
    } else {
      preloaderNum.textContent = "100";
      if (preloaderBar) preloaderBar.style.width = "100%";
      setTimeout(hidePreloader, 300);
    }
  }

  function hidePreloader() {
    preloader.classList.add("hidden");
    // Restore scrolling on document elements
    document.documentElement.classList.remove("is-loading");
    document.body.classList.remove("is-loading");
    window.scrollTo(0, 0);
    setTimeout(initHeroReveal, 200);
  }

  window.onload = function () {
    window.scrollTo(0, 0);
    requestAnimationFrame(updatePreloader);
  };

  /* ══════════════════════════════════════════════
     2. HERO REVEAL (REVELADO SIN RETARDOS)
  ══════════════════════════════════════════════ */
  function initHeroReveal() {
    const heroBg = document.getElementById("hero-bg");
    const heroHeader = document.getElementById("hero-header");
    const heroFooter = document.querySelector(".hero-footer");
    const scrollInd = document.getElementById("scroll-indicator");
    const nav = document.getElementById("main-nav");

    if (!heroBg) {
      if (nav) nav.classList.add("visible");
      return;
    }

    // Disparo inmediato del paso 1
    heroBg.classList.add("step-1");

    // Cuando el clip-path del paso 1 termina, salta inmediatamente al paso 2
    heroBg.addEventListener('transitionend', function step1Handler(e) {
      if (e.propertyName !== 'clip-path') return;

      heroBg.removeEventListener('transitionend', step1Handler);

      heroBg.classList.remove("step-1");
      heroBg.classList.add("step-2");

      // Cuando la expansión (paso 2) termina, revelamos todo lo demás instantáneamente
      heroBg.addEventListener('transitionend', function step2Handler(e) {
        if (e.propertyName !== 'clip-path') return;
        heroBg.removeEventListener('transitionend', step2Handler);

        // Revelado en cascada ultra-rápida (casi simultánea)
        if (nav) nav.classList.add("visible");
        if (heroHeader) heroHeader.classList.add("visible");
        if (heroFooter) heroFooter.classList.add("visible");
        if (scrollInd) scrollInd.classList.add("visible");

        // Activación de efectos después de la apertura
        initScrollEffects();
      });
    });
  }

  /* ══════════════════════════════════════════════
     3. SCROLL EFFECTS — IntersectionObserver
  ══════════════════════════════════════════════ */
  function initScrollEffects() {
    // Generic reveal (manifesto, about)
    const revealEls = document.querySelectorAll(".manifesto-text, .manifesto-body");

    const genericObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            genericObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => genericObserver.observe(el));

    initHeroProgress();
    initHeroParallax();
    initWorksShowcase();
  }

  /* ══════════════════════════════════════════════
     6. WORKS SHOWCASE — Video + Carousel
  ══════════════════════════════════════════════ */
  function initWorksShowcase() {

    // ── Project data ─────────────────────────────
    const PROJECTS = [
      {
        title: "GOLONDRINAS",
        tag: "Brand Identity\u00a0•\u00a0Product Design\u00a0•\u00a0User Journey",
        ref: "OSCAR C.\u00a0•\u00a0FIN\u00a0•\u00a0001",
        discipline: "Senior Designer\u00a0•\u00a0UX Tester",
        year: "2025",
        thumb: "Assets/Carrusel/Golondrinas.jpg",
        href: "projects/project-1/index.html",
        video: "Assets/Swall/SF1.mp4"
      },
      {
        title: "Vibe Coding",
        tag: "UX/UI Design\u00a0•\u00a0Vibe Coding",
        ref: "OSCAR C.\u00a0•\u00a0ON\u00a0•\u00a0002",
        discipline: "Vibe Coder",
        year: "On Going",
        thumb: "Assets/Carrusel/Vibe Coding.jpg",
        href: "projects/project-2/index.html",
        video: "Assets/Vibec/VF1.mp4"
      },
      {
        title: "Mi ITESO",
        tag: "Product Design\u00a0•\u00a0UX Research and Testing",
        ref: "OSCAR C.\u00a0•\u00a0PEN\u00a0•\u00a0003",
        discipline: "Senior Designer\u00a0•\u00a0UX Tester",
        year: "2025",
        thumb: "Assets/Carrusel/Mi ITESO.jpg",
        href: "projects/project-3/index.html",
        video: "Assets/MiITESO/MF1.mp4"
      },
      {
        title: "OKDJ",
        tag: "Variable Typeface & Editorial Publication",
        ref: "OSCAR C.\u00a0•\u00a0FIN\u00a0•\u00a0004",
        discipline: "Branding\u00a0•\u00a0UX/UI Design\u00a0•\u00a0Animation",
        year: "2025",
        thumb: "Assets/Carrusel/OKDJ.jpg",
        href: "projects/project-4/index.html",
        video: "Assets/OKDJ/OF1.mp4"
      },
      {
        title: "Nutricia Mobile",
        tag: "Product Design\u00a0•\u00a0User Journeys\u00a0•\u00a0Branding",
        ref: "OSCAR C.\u00a0•\u00a0FIN\u00a0•\u00a0005",
        discipline: "UX/UI Designer",
        year: "2023",
        thumb: "Assets/Carrusel/Nutricia M.jpg",
        href: "projects/project-5/index.html",
        video: "Assets/NutM/NMF1.mp4"
      },
      {
        title: "Nutricia Desktop",
        tag: "Product Design\u00a0•\u00a0User Journeys\u00a0•\u00a0Branding",
        ref: "OSCAR C.\u00a0•\u00a0FIN\u00a0•\u00a0006",
        discipline: "UX/UI Designer",
        year: "2024",
        thumb: "Assets/Carrusel/Nutricia D.jpg",
        href: "projects/project-6/index.html",
        video: "Assets/NutD/NDF1.mp4"
      }
    ];

    const TOTAL = PROJECTS.length;
    let current = 0;
    let progressRaf = null;

    // ── DOM refs ──────────────────────────────────
    const titleEl = document.getElementById("works-title");
    const tagEl = document.getElementById("works-tag");
    const refEl = document.getElementById("works-ref");
    const discEl = document.getElementById("works-discipline");
    const yearEl2 = document.getElementById("works-year");
    const posterImg = document.getElementById("works-poster-img");
    const videoLink = document.getElementById("works-video-link");
    const skipBtn = document.getElementById("works-skip-btn");
    const prevBtn = document.getElementById("works-prev");
    const nextBtn = document.getElementById("works-next");
    const track = document.getElementById("works-carousel-track");
    const viewport = document.getElementById("works-carousel-viewport");
    const progressFill = document.getElementById("works-video-progress-fill");
    const carouselItems = document.querySelectorAll(".works-carousel-item");
    const videos = document.querySelectorAll(".works-video");

    if (!titleEl || !track) return;

    // ── Carousel drag (mouse click + drag horizontal) ─────────
    let isDragging = false;
    let dragStartX = 0;
    let dragCurrentX = 0;
    let didDrag = false;      // true if mouse actually moved during drag
    let baseTranslate = 0;   // translateX value at drag start

    // Read current translateX from the track's inline style
    function getTrackTranslate() {
      const mat = new DOMMatrix(getComputedStyle(track).transform);
      return mat.m41; // translateX
    }

    viewport.addEventListener("mousedown", (e) => {
      isDragging = true;
      didDrag = false;
      dragStartX = e.clientX;
      dragCurrentX = e.clientX;
      baseTranslate = getTrackTranslate();
      track.style.transition = "none"; // disable smooth during drag
      e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 4) didDrag = true;
      dragCurrentX = e.clientX;
      track.style.transform = `translateX(${baseTranslate + dx}px)`;
    });

    window.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      track.style.transition = ""; // restore smooth transition

      const dx = e.clientX - dragStartX;
      // Only change project if dragged more than a threshold, not just a click
      if (didDrag && Math.abs(dx) > 40) {
        goTo(dx < 0 ? (current + 1) % TOTAL : (current - 1 + TOTAL) % TOTAL);
      } else {
        // Snap back to current position
        scrollCarouselTo(current);
      }
      didDrag = false;
    });

    // Prevent click on carousel items from firing if we just dragged
    viewport.addEventListener("click", (e) => {
      if (didDrag) e.stopPropagation();
    }, true);

    // Touch drag on track
    let touchStartX = 0;
    track.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 30) {
        goTo(dx < 0 ? (current + 1) % TOTAL : (current - 1 + TOTAL) % TOTAL);
      }
    }, { passive: true });

    // Wheel scroll on viewport → change project (keep as fallback)
    let wheelCooldown = false;
    viewport.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (wheelCooldown) return;
      wheelCooldown = true;
      if (e.deltaX > 30 || e.deltaY > 30) goTo((current + 1) % TOTAL);
      if (e.deltaX < -30 || e.deltaY < -30) goTo((current - 1 + TOTAL) % TOTAL);
      setTimeout(() => { wheelCooldown = false; }, 480);
    }, { passive: false });

    // ── Arrow buttons ──────────────────────────────
    prevBtn.addEventListener("click", () => goTo((current - 1 + TOTAL) % TOTAL));
    nextBtn.addEventListener("click", () => goTo((current + 1) % TOTAL));
    skipBtn.addEventListener("click", () => goTo((current + 1) % TOTAL));

    // ── Carousel item click ────────────────────────
    carouselItems.forEach((item) => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.dataset.index, 10);
        goTo(idx);
      });
    });

    // ── Video project link ─────────────────────────
    videoLink.addEventListener("click", (e) => {
      e.preventDefault();
      const href = PROJECTS[current].href;
      if (href && href !== "#") window.location.href = href;
    });

    // ── Video ended → advance ─────────────────────
    videos.forEach((vid) => {
      vid.addEventListener("ended", () => {
        goTo((current + 1) % TOTAL);
      });
    });

    // ── Video timeupdate → progress bar ──────────
    function startProgressTracking(vid) {
      cancelAnimationFrame(progressRaf);
      if (!vid || !vid.duration) {
        progressFill.style.transform = "scaleX(0)";
        // Fallback: animate progress over 6s for poster/image mode
        let start = null;
        const DURATION = 6000;
        function fallbackTick(ts) {
          if (!start) start = ts;
          const ratio = Math.min((ts - start) / DURATION, 1);
          progressFill.style.transform = `scaleX(${ratio})`;
          if (ratio < 1) progressRaf = requestAnimationFrame(fallbackTick);
          else goTo((current + 1) % TOTAL);
        }
        progressRaf = requestAnimationFrame(fallbackTick);
        return;
      }
      function tick() {
        if (vid.paused || vid.ended) return;
        const ratio = vid.duration ? vid.currentTime / vid.duration : 0;
        progressFill.style.transform = `scaleX(${ratio})`;
        progressRaf = requestAnimationFrame(tick);
      }
      progressRaf = requestAnimationFrame(tick);
    }

    // ── goTo: the main switch function ─────────────
    function goTo(idx) {
      if (idx === current && idx !== 0) return;
      const prev = current;
      current = idx;

      // Swap carousel active state
      carouselItems.forEach((item, i) => {
        item.classList.toggle("works-carousel-item--active", i === current);
      });

      // Scroll carousel track to center the active item
      scrollCarouselTo(current);

      // Swap video / poster
      swapMedia(prev, current);

      // Swap side text
      swapText(current);

      // Update link
      if (videoLink) videoLink.href = PROJECTS[current].href || "#";
    }

    function scrollCarouselTo(idx) {
      const item = carouselItems[idx];
      if (!item || !viewport) return;
      const itemRect = item.getBoundingClientRect();
      const viewRect = viewport.getBoundingClientRect();
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const viewCenter = viewport.offsetWidth / 2;
      const targetOffset = itemCenter - viewCenter;
      track.style.transform = `translateX(${-targetOffset}px)`;
    }

    function swapMedia(prevIdx, nextIdx) {
      cancelAnimationFrame(progressRaf);
      progressFill.style.transform = "scaleX(0)";

      const prevVid = videos[prevIdx];
      const nextVid = videos[nextIdx];

      // Deactivate previous
      if (prevVid) {
        prevVid.classList.remove("works-video--active");
        prevVid.pause();
      }

      // Update poster
      if (posterImg) {
        posterImg.src = PROJECTS[nextIdx].thumb;
      }

      // Activate next video (if src available)
      if (nextVid) {
        nextVid.classList.add("works-video--active");
        const vidSrc = PROJECTS[nextIdx].video;
        if (vidSrc) {
          if (nextVid.src !== vidSrc) nextVid.src = vidSrc;
          nextVid.currentTime = 0;
          const playPromise = nextVid.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => { });
          }
          nextVid.addEventListener("playing", () => startProgressTracking(nextVid), { once: true });
        } else {
          // No video — use timed fallback progress
          startProgressTracking(null);
        }
      }
    }

    function swapText(idx) {
      const p = PROJECTS[idx];
      const swappables = [titleEl, tagEl, refEl, discEl, yearEl2];

      swappables.forEach(el => { if (el) el.classList.add("is-swapping"); });

      setTimeout(() => {
        if (titleEl) titleEl.textContent = p.title;
        if (tagEl) tagEl.textContent = p.tag;
        if (refEl) refEl.textContent = p.ref;
        if (discEl) discEl.textContent = p.discipline;
        if (yearEl2) yearEl2.textContent = p.year;
        swappables.forEach(el => { if (el) el.classList.remove("is-swapping"); });
      }, 280);
    }

    // ── Init first project ─────────────────────────
    goTo(0);
  }

  /* ══════════════════════════════════════════════
     4. HERO PROGRESS BAR
  ══════════════════════════════════════════════ */
  function initHeroProgress() {
    const progressFill = document.getElementById("progress-fill");
    const hero = document.querySelector(".hero");
    if (!progressFill || !hero) return;

    function updateProgress() {
      const ratio = Math.min(window.scrollY / hero.offsetHeight, 1);
      progressFill.style.transform = "scaleX(" + ratio + ")";
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  /* ══════════════════════════════════════════════
     5. HERO PARALLAX
  ══════════════════════════════════════════════ */
  function initHeroParallax() {
    const heroSection = document.querySelector(".hero");
    const heroImg = document.querySelector(".hero-bg img");
    if (!heroSection || !heroImg) return;

    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const sectionHeight = heroSection.offsetHeight;

          // Solo aplicar si estamos dentro de la sección hero
          if (scrollY <= sectionHeight) {
            // El factor 0.3 controla la velocidad (menor es más lento)
            // Usamos transformY negativo para que la imagen "suba" ligeramente al bajar
            const offset = scrollY * 0.3;
            heroImg.style.transform = `translateY(-${offset}px) scale(1.05)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════
     6. FLOATING THUMBNAIL — follows mouse per row
  ══════════════════════════════════════════════ */
  function initProjectThumbnails() {
    const rows = document.querySelectorAll(".project-row");

    rows.forEach((row) => {
      const thumb = row.querySelector(".project-thumb");
      if (!thumb) return;

      let tx = 0, ty = 0;   // target position
      let cx = 0, cy = 0;   // current (lerped) position
      let raf = null;
      let active = false;

      const THUMB_W = thumb.offsetWidth || 200;
      const THUMB_H = thumb.offsetHeight || 200;
      const OFFSET_X = 28;
      const OFFSET_Y = -60;
      const LERP = 0.12;     // thumbnail lags behind cursor for a fluid feel

      function lerp(a, b, t) { return a + (b - a) * t; }

      function animateThumb() {
        if (!active) return;
        cx = lerp(cx, tx, LERP);
        cy = lerp(cy, ty, LERP);
        thumb.style.left = cx + "px";
        thumb.style.top = cy + "px";
        raf = requestAnimationFrame(animateThumb);
      }

      row.addEventListener("mouseenter", (e) => {
        active = true;
        tx = e.clientX + OFFSET_X;
        ty = e.clientY + OFFSET_Y;
        cx = tx; cy = ty; // snap on enter, then lag
        thumb.style.left = cx + "px";
        thumb.style.top = cy + "px";
        cancelAnimationFrame(raf);
        animateThumb();
      });

      row.addEventListener("mousemove", (e) => {
        tx = e.clientX + OFFSET_X;
        ty = e.clientY + OFFSET_Y;
      });

      row.addEventListener("mouseleave", () => {
        active = false;
        cancelAnimationFrame(raf);
      });
    });
  }

  /* ══════════════════════════════════════════════
     7. "SEE ALL WORK" TOGGLE
  ══════════════════════════════════════════════ */
  function initProjectToggle() {
    const btn = document.getElementById("projects-toggle");
    const label = document.getElementById("toggle-label");
    const countEl = document.getElementById("projects-visible-count");
    const hidden = document.querySelectorAll(".project-row--hidden");

    if (!btn || !hidden.length) return;

    let expanded = false;

    btn.addEventListener("click", () => {
      expanded = !expanded;
      btn.setAttribute("aria-expanded", String(expanded));

      if (expanded) {
        label.textContent = "Show less";
        if (countEl) countEl.textContent = "08";

        hidden.forEach((row, i) => {
          row.classList.add("revealed");
          // Stagger the reveal
          setTimeout(() => {
            row.classList.add("visible");
          }, 40 + i * 80);
        });
      } else {
        label.textContent = "See all work";
        if (countEl) countEl.textContent = "05";

        hidden.forEach((row) => {
          row.classList.remove("visible");
          setTimeout(() => {
            row.classList.remove("revealed");
          }, 400);
        });
      }
    });
  }

  /* ══════════════════════════════════════════════
     8. YEAR COUNTER
  ══════════════════════════════════════════════ */
  const yearEl = document.getElementById("year-number");
  if (yearEl) {
    const yearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateYear(2020, 2026, 900);
          yearObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    yearObserver.observe(yearEl);
  }

  function animateYear(from, to, ms) {
    const start = performance.now();
    function frame(now) {
      const p = Math.min((now - start) / ms, 1);
      const v = Math.round(from + (to - from) * easeOutCubic(p));
      yearEl.textContent = v;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ══════════════════════════════════════════════
     9. CUSTOM CURSOR (desktop only)
     — Lower delay (lerp 0.38)
     — Hide/disable completely on touch devices (including hybrids)
     — Reveal ring/dot only upon first mouse movement
  ══════════════════════════════════════════════ */
  if (window.matchMedia("(pointer: fine)").matches) {

    /* Inject cursor DOM */
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.innerHTML = `
      <div class="cursor-ring"></div>
      <div class="cursor-dot-center"></div>
    `;
    document.body.appendChild(cursor);

    /* Inject cursor CSS */
    const cursorStyle = document.createElement("style");
    cursorStyle.textContent = `
      * { cursor: none !important; }

      #custom-cursor {
        position: fixed;
        top: 0; left: 0;
        width: 0; height: 0;
        pointer-events: none;
        z-index: 999999;
        mix-blend-mode: exclusion;
        opacity: 0; /* Hidden initially, shown only on mouse move */
        transition: opacity 0.25s ease;
      }

      /* Outer ring — follows with slight lag */
      .cursor-ring {
        position: absolute;
        top: -18px; left: -18px;
        width: 36px; height: 36px;
        border: 1.5px solid rgba(255, 255, 255, 0.85);
        border-radius: 50%;
        transition:
          transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
          background-color 0.2s ease,
          border-color 0.2s ease,
          width 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
          height 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
          top 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
          left 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
        background-color: transparent;
      }

      /* Center dot — snaps instantly */
      .cursor-dot-center {
        position: absolute;
        top: -3px; left: -3px;
        width: 6px; height: 6px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        transition: transform 0.15s ease, opacity 0.15s ease;
      }

      /* HOVER STATE: white fill */
      #custom-cursor.is-hovering .cursor-ring {
        width: 52px; height: 52px;
        top: -26px; left: -26px;
        background-color: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.6);
      }

      #custom-cursor.is-hovering .cursor-dot-center {
        transform: scale(0);
        opacity: 0;
      }

      /* CLICK state */
      #custom-cursor.is-clicking .cursor-ring {
        transform: scale(0.82);
        background-color: rgba(255, 255, 255, 0.35);
      }
    `;
    document.head.appendChild(cursorStyle);

    /* Tracking variables */
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let isTouch = false;
    let hasMoved = false;

    /* Higher lerp = less delay. 0.38 gives crisp but not instant feel */
    const CURSOR_LERP = 0.38;

    /* Reveal custom cursor only when mouse actually moves for the first time */
    document.addEventListener("mousemove", (e) => {
      if (isTouch) return;
      if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = "1";
      }
      mx = e.clientX;
      my = e.clientY;
    });

    /* Permanent disable upon touch interaction (for tablet/hybrid devices) */
    document.addEventListener("touchstart", function handleTouchStart() {
      isTouch = true;
      cursor.style.display = "none";
      cursor.style.opacity = "0";
      // Restore default cursor fallback
      const restoreStyle = document.createElement("style");
      restoreStyle.textContent = `* { cursor: auto !important; }`;
      document.head.appendChild(restoreStyle);
      document.removeEventListener("touchstart", handleTouchStart);
    }, { passive: true });

    /* RAF loop — smooth follow */
    function animateCursor() {
      if (isTouch) return;
      cx += (mx - cx) * CURSOR_LERP;
      cy += (my - cy) * CURSOR_LERP;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    /* Hover detection — selectable elements */
    const HOVER_SELECTORS = "a, button, [role='button'], .works-carousel-item, .works-arrow, .works-skip-btn, .works-video-link, input, label, select, textarea, .nav-logo, .social-link, .cta-link, .about-link, .footer-email";

    function onEnterSelectable() {
      if (isTouch) return;
      cursor.classList.add("is-hovering");
    }
    function onLeaveSelectable() {
      if (isTouch) return;
      cursor.classList.remove("is-hovering");
    }

    /* Attach initial listeners */
    document.querySelectorAll(HOVER_SELECTORS).forEach((el) => {
      el.addEventListener("mouseenter", onEnterSelectable);
      el.addEventListener("mouseleave", onLeaveSelectable);
    });


    /* Click feedback */
    document.addEventListener("mousedown", () => { if (!isTouch) cursor.classList.add("is-clicking"); });
    document.addEventListener("mouseup", () => { if (!isTouch) cursor.classList.remove("is-clicking"); });

    /* Hide cursor when leaving window */
    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      if (hasMoved && !isTouch) cursor.style.opacity = "1";
    });
  }

  /* ══════════════════════════════════════════════
     10. SMOOTH ANCHOR SCROLL
  ══════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ══════════════════════════════════════════════
     11. CV DOWNLOAD
  ══════════════════════════════════════════════ */
  const cvLink = document.getElementById("download-cv-link");
  if (cvLink) {
    cvLink.addEventListener("click", (e) => {
      e.preventDefault();
      // Open in new tab
      window.open("Assets/CV_Oscar C._2026.pdf", "_blank");
      
      // Trigger download
      const a = document.createElement("a");
      a.href = "Assets/CV_Oscar C._2026.pdf";
      a.download = "CV_Oscar C._2026.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
})();
