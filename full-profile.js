/* global gsap, ScrollTrigger */
/* ═══════════════════════════════════════════════════════════
   FULL PROFILE — Independent Script
   GSAP Scroll Animations · Custom Cursor · Interactions
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // Prevent scroll jumps on refresh
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  /* ══════════════════════════════════════════════
     1. CUSTOM CURSOR (desktop fine pointer)
  ══════════════════════════════════════════════ */
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    cursor.innerHTML = `
      <div class="cursor-ring"></div>
      <div class="cursor-dot-center"></div>
    `;
    document.body.appendChild(cursor);

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
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      .cursor-ring {
        position: absolute;
        top: -18px; left: -18px;
        width: 36px; height: 36px;
        border: 1.5px solid rgba(255, 255, 255, 0.85);
        border-radius: 50%;
        transition: transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1), background-color 0.2s ease, border-color 0.2s ease, width 0.25s, height 0.25s, top 0.25s, left 0.25s;
        background-color: transparent;
      }
      .cursor-dot-center {
        position: absolute;
        top: -3px; left: -3px;
        width: 6px; height: 6px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        transition: transform 0.15s ease, opacity 0.15s ease;
      }
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
      #custom-cursor.is-clicking .cursor-ring {
        transform: scale(0.82);
        background-color: rgba(255, 255, 255, 0.35);
      }
    `;
    document.head.appendChild(cursorStyle);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let isTouch = false;
    let hasMoved = false;
    const CURSOR_LERP = 0.38;

    document.addEventListener("mousemove", (e) => {
      if (isTouch) return;
      if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = "1";
      }
      mx = e.clientX;
      my = e.clientY;
    });

    document.addEventListener("touchstart", function handleTouchStart() {
      isTouch = true;
      cursor.style.display = "none";
      cursor.style.opacity = "0";
      const restoreStyle = document.createElement("style");
      restoreStyle.textContent = `* { cursor: auto !important; }`;
      document.head.appendChild(restoreStyle);
      document.removeEventListener("touchstart", handleTouchStart);
    }, { passive: true });

    function animateCursor() {
      if (isTouch) return;
      cx += (mx - cx) * CURSOR_LERP;
      cy += (my - cy) * CURSOR_LERP;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const HOVER_SELECTORS = "a, button, [role='button'], input, label, select, textarea, .nav-logo, .social-link, .fp-cta-link, .fp-tool-cell, .footer-email";

    function onEnterSelectable() {
      if (isTouch) return;
      cursor.classList.add("is-hovering");
    }
    function onLeaveSelectable() {
      if (isTouch) return;
      cursor.classList.remove("is-hovering");
    }

    document.querySelectorAll(HOVER_SELECTORS).forEach((el) => {
      el.addEventListener("mouseenter", onEnterSelectable);
      el.addEventListener("mouseleave", onLeaveSelectable);
    });

    document.addEventListener("mousedown", () => { if (!isTouch) cursor.classList.add("is-clicking"); });
    document.addEventListener("mouseup", () => { if (!isTouch) cursor.classList.remove("is-clicking"); });
    document.addEventListener("mouseleave", () => { cursor.style.opacity = "0"; });
    document.addEventListener("mouseenter", () => { if (hasMoved && !isTouch) cursor.style.opacity = "1"; });
  }

  /* ══════════════════════════════════════════════
     2. GSAP SCROLL ANIMATIONS
  ══════════════════════════════════════════════ */
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    /* ─── HERO REDESIGN: Entrance & Scroll Scrub ─── */
    const maskBox = document.getElementById("hero-mask-box");
    const textLeft = document.getElementById("hero-text-left");
    const textRight = document.getElementById("hero-text-right");
    const centerSquare = document.getElementById("hero-center-square");
    const heroSlides = document.querySelectorAll(".fp-hero-slide");
    const scrollHint = document.getElementById("fp-scroll-hint");

    /*
     * ── CLIP-PATH APPROACH ──────────────────────────────────────────
     * The mask-box covers the full viewport. We clip it via clip-path inset().
     * Images live at 100%×100% — they're ALWAYS rendered at full resolution.
     * No transform:scale = zero rasterization artifacts, perfect quality.
     *
     * clipState.{top,bottom,left,right} = inset in %, measured from the real
     * position/size of .fp-hero-center-square (getBoundingClientRect) and
     * expressed relative to the mask's own box — so it self-adjusts if the
     * viewport's real height changes (mobile address bar) with zero extra JS.
     *
     * Scroll expansion: top/bottom→0 first (portrait), then left/right→0 (landscape fill).
     * ────────────────────────────────────────────────────────────────
     */
    // Clip state lives in PERCENTAGES (not px) so the browser keeps it in
    // sync automatically whenever the viewport's real height changes —
    // e.g. a mobile browser's address bar hiding/showing mid-scroll.
    // The percentages themselves are measured from the real frame, not guessed.
    const clipState = { top: 0, right: 0, bottom: 0, left: 0 };

    function updateMaskClip() {
      if (!maskBox) return;
      maskBox.style.clipPath =
        `inset(${clipState.top}% ${clipState.right}% ${clipState.bottom}% ${clipState.left}% round 2px)`;
    }

    // Measure the frame's actual box and express it as % of the mask's own
    // box (which is the full viewport). This fills clipState with the
    // correct STARTING numbers for the scroll animation below — it does
    // NOT touch the mask's on-screen appearance by itself.
    function syncClipToSquare() {
      if (!maskBox || !centerSquare) return;
      const box = maskBox.getBoundingClientRect();
      const r = centerSquare.getBoundingClientRect();
      clipState.top = ((r.top - box.top) / box.height) * 100;
      clipState.left = ((r.left - box.left) / box.width) * 100;
      clipState.right = ((box.right - r.right) / box.width) * 100;
      clipState.bottom = ((box.bottom - r.bottom) / box.height) * 100;
    }

    // Prepare the starting numbers for the scroll animation. We do NOT call
    // updateMaskClip()/set an inline style here — while the user hasn't
    // scrolled, the mask's on-screen shape is controlled ENTIRELY by CSS
    // (clip-path in full-profile.css, driven by --frame-w/--frame-h), so it
    // can never drift from the frame. JS only writes an inline clip-path
    // once real scroll progress begins (see onUpdate in the scrollTrigger
    // below), and hands control back to CSS the moment scroll returns to 0.
    syncClipToSquare();

    // Local reference to the hero scrub timeline (kept in this closure,
    // not on window) so the resize handler can check its progress.
    let heroTlInstance = null;

    // Re-measure on real size changes (breakpoint change, orientation
    // change) but only while the user hasn't started scrolling yet, so we
    // never fight with the in-progress scrub animation.
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!heroTlInstance || heroTlInstance.progress() === 0) {
          syncClipToSquare();
        }
        if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
      }, 150);
    });

    // 1. Entrance animation on load
    function initHeroAnimations() {
      const tl = gsap.timeline({ delay: 0.1 });

      // Mask: fade-in from an invisible point at the frame's exact center
      // to its full initial size — same % units as clipState, so it stays
      // self-adjusting and interpolates smoothly (no unit mismatch, no jump).
      if (maskBox && centerSquare) {
        const box = maskBox.getBoundingClientRect();
        const r = centerSquare.getBoundingClientRect();
        const cxPct = ((r.left + r.width / 2 - box.left) / box.width) * 100;
        const cyPct = ((r.top + r.height / 2 - box.top) / box.height) * 100;
        tl.from(maskBox, {
          clipPath: `inset(${cyPct}% ${100 - cxPct}% ${100 - cyPct}% ${cxPct}% round 2px)`,
          duration: 1.0,
          ease: "power3.out"
        }, 0.2);
      }

      if (textLeft) {
        tl.from(textLeft, {
          x: -60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out"
        }, 0);
      }

      if (textRight) {
        tl.from(textRight, {
          x: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out"
        }, 0);
      }

      if (centerSquare) {
        tl.from(centerSquare, {
          scale: 0,
          opacity: 0,
          duration: 0.9,
          ease: "back.out(1.7)"
        }, 0.2);
      }

      if (scrollHint) {
        tl.from(scrollHint, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");
      }
    }

    // 2. Scroll Scrubbing timeline (350vh wrapper, 250% pin)
    if (maskBox) {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#ch-hero",
          start: "top top",
          end: "+=250%",
          pin: ".fp-hero-sticky",
          scrub: 0.8,
          // Re-measure the frame right before the scrub animation needs
          // fresh starting numbers (e.g. after a resize).
          onRefresh: syncClipToSquare,
          // Back at the very top of the hero (no scroll yet): remove the
          // inline clip-path and hand control back to CSS, which is always
          // in sync with the frame — this is what stops JS from "freezing"
          // a shape that could drift from the frame while at rest.
          onUpdate: (self) => {
            if (self.progress === 0 && maskBox) maskBox.style.clipPath = "";
          }
        }
      });
      heroTlInstance = heroTl;

      /*
       * Phase A — Portrait emergence (t 0 → 0.9):
       * Top/bottom insets collapse to 0 → mask grows full height quickly.
       * Result: tall portrait strip becomes visible.
       */
      heroTl.to(clipState, {
        top: 0,
        bottom: 0,
        ease: "power2.out",
        duration: 0.9,
        onUpdate: updateMaskClip
      }, 0);

      /*
       * Phase B — Landscape fill (t 0.3 → 2.0):
       * Left/right insets collapse to 0 → mask spreads to full width.
       * Overlaps slightly with Phase A so both axes expand together near the start.
       */
      heroTl.to(clipState, {
        left: 0,
        right: 0,
        ease: "power2.inOut",
        duration: 1.7,
        onUpdate: updateMaskClip
      }, 0.3);

      // Fade out text panels during early expansion
      if (textLeft) {
        heroTl.to(textLeft, {
          x: -100,
          opacity: 0,
          ease: "power2.in",
          duration: 0.5
        }, 0);
      }
      if (textRight) {
        heroTl.to(textRight, {
          x: 100,
          opacity: 0,
          ease: "power2.in",
          duration: 0.5
        }, 0);
      }
      if (centerSquare) {
        heroTl.to(centerSquare, {
          opacity: 0,
          scale: 1.15,
          ease: "power2.in",
          duration: 0.4
        }, 0);
      }

      /*
       * Crossfade 5 slides DURING the expansion.
       * fadeDuration = 0.65 (longer per request).
       * Distribution: first crossfade starts at t=0, last ENDS at t=2.0.
       * ─────────────────────────────────────────
       * slideCount=5 → 4 transitions, 3 gaps between starts.
       * lastStart = 2.0 - 0.65 = 1.35
       * slideSpacing = 1.35 / 3 = 0.45
       * Starts: 0, 0.45, 0.90, 1.35  →  Ends: 0.65, 1.10, 1.55, 2.00 ✓
       */
      if (heroSlides.length > 1) {
        const slideCount = heroSlides.length;
        const fadeDuration = 0.65;
        const expansionEnd = 2.0;
        const lastStart = expansionEnd - fadeDuration;
        const gapCount = slideCount - 2; // gaps between (slideCount-1) transition starts
        const slideSpacing = gapCount > 0 ? lastStart / gapCount : lastStart;

        for (let i = 0; i < slideCount - 1; i++) {
          const startTime = i * slideSpacing;
          heroTl.to(heroSlides[i], {
            opacity: 0,
            duration: fadeDuration,
            ease: "power1.inOut"
          }, startTime);
          heroTl.to(heroSlides[i + 1], {
            opacity: 1,
            duration: fadeDuration,
            ease: "power1.inOut"
          }, startTime);
        }
      }

      // Hold at full screen before pin releases
      heroTl.to({}, { duration: 0.8 }, 2);

      // Scroll hint fades as soon as expansion begins
      if (scrollHint) {
        heroTl.to(scrollHint, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        }, 0.1);
      }
    }



    // Statement: word-by-word reveal on scroll
    const words = gsap.utils.toArray("#statement-text .word span");
    if (words.length) {
      gsap.from(words, {
        yPercent: 110,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#ch-statement",
          start: "top 80%",
          end: "top 20%",
          scrub: 0.8
        }
      });

      gsap.to("#statement-text", {
        opacity: 0,
        y: -40,
        ease: "power2.in",
        scrollTrigger: {
          trigger: "#ch-statement",
          start: "40% center", // antes: "80% center" — el texto ya no queda quieto por tanto tiempo
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Intro Bio: each label + paragraph line fades/slides in
    gsap.from(".fp-intro-line", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".fp-intro",
        start: "top 65%"
      }
    });

    // Intro image: enlarged via scale (so it always fully covers its
    // masked/clipped container) and given its own slower scroll speed —
    // a classic parallax lag versus the mask + text above it, which move
    // at normal (1:1) scroll speed since they're not tweened here.
    // Range widened + wrapper made taller (in CSS) so the lag is clearly
    // noticeable, while still reading as "slow" relative to the scroll.
    const introImg = document.getElementById("intro-img");
    if (introImg) {
      gsap.set(introImg, { scale: 1.3 }); // "agrandada en escala" + margen extra
      gsap.fromTo(introImg,
        { yPercent: 22 },
        {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: ".fp-intro",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    }

    // Areas of Design: the list is a "reel" that travels vertically in
    // exact sync with scroll (not by time/transition) — so the item that
    // crosses the center line is always correct, no matter how fast you
    // scroll. The matching visual swaps to follow the same index.
    const areasWrapper = document.getElementById("ch-areas");
    const areaImgs = document.querySelectorAll(".fp-areas-img");
    const areaItems = document.querySelectorAll(".fp-area-item");
    const areasList = document.getElementById("areas-list");
    const TOTAL_AREAS = areaImgs.length;

    function activateArea(idx) {
      areaImgs.forEach((img, i) => img.classList.toggle("is-active", i === idx));
      areaItems.forEach((item, i) => item.classList.toggle("is-active", i === idx));
    }

    if (areasWrapper && areasList && TOTAL_AREAS > 0) {
      let itemStep = 0; // distance (px) between one item's center and the next

      function measureAreaStep() {
        const first = areaItems[0];
        const second = areaItems[1];
        if (!first || !second) return;
        itemStep = second.offsetTop - first.offsetTop;
        // Center the FIRST item on the mask's center line at rest.
        gsap.set(areasList, { y: -itemStep / 2 });
      }
      measureAreaStep();
      window.addEventListener("resize", measureAreaStep);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(measureAreaStep);
      }

      ScrollTrigger.create({
        trigger: areasWrapper,
        start: "top top",
        end: "+=220%", // duración real del pin — igual técnica que el Hero
        pin: ".fp-areas-sticky", // pin real de GSAP: se mantiene fijo TODA esta duración,
        // a diferencia de position:sticky (CSS) que se suelta solo
        // una vez agotada la altura del contenedor.
        scrub: true, // 1:1 con el scroll — nunca se atrasa
        onUpdate: (self) => {
          const travel = itemStep * (TOTAL_AREAS - 1);
          const y = -itemStep / 2 - self.progress * travel;
          gsap.set(areasList, { y });

          const idx = Math.round(self.progress * (TOTAL_AREAS - 1));
          activateArea(Math.max(0, Math.min(idx, TOTAL_AREAS - 1)));
        }
      });
    }

    // Timeline: heading reveal (sin cambios)
    gsap.from(".fp-tl-heading", {
      y: 50,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fp-timeline-section",
        start: "top 70%"
      }
    });

    // Spine-fill: crece de 0% a 100% ligado 1:1 al scroll a través de
    // .fp-tl-track — la línea de tiempo se va "dibujando" mientras avanzas.
    gsap.to(".fp-tl-spine-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".fp-tl-track",
        start: "top 75%",
        end: "bottom 65%",
        scrub: true
      }
    });

    // Cada evento: revela su contenido y enciende su dot al entrar en
    // vista. toggleActions permite que se revierta si el usuario sube.
    document.querySelectorAll(".fp-tl-item").forEach((item) => {
      const dot = item.querySelector(".fp-tl-dot");

      gsap.from(item.querySelectorAll(".fp-tl-role, .fp-tl-company, .fp-tl-desc"), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      if (dot) {
        ScrollTrigger.create({
          trigger: item,
          start: "top 80%",
          onEnter: () => dot.classList.add("is-active"),
          onLeaveBack: () => dot.classList.remove("is-active")
        });
      }
    });

    // Philosophy: trophies "land" on the shelf with a little bounce
    // (back.out overshoot) — matches the playful "trophy shelf" concept.
    gsap.from(".fp-philo-trophy", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.6)",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".fp-philosophy",
        start: "top 70%"
      }
    });

    // The shelf line "draws itself" left-to-right underneath
    gsap.from(".fp-philo-shelf-line", {
      scaleX: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".fp-philosophy",
        start: "top 65%"
      }
    });

    // Personal section: heading + bento grid items reveal
    gsap.from(".fp-personal-heading", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".fp-personal",
        start: "top 70%"
      }
    });

    gsap.from(".fp-bento-item", {
      scale: 0.92,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".fp-bento-grid",
        start: "top 80%"
      }
    });

    // Tools icon grid: cells fade in staggered
    gsap.from(".fp-tool-cell", {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: ".fp-tools-grid",
        start: "top 85%"
      }
    });

    // ── Dynamic Scroll CTA ──
    // Los banners NO participan de esto — son flujo normal en el HTML/CSS
    // (sin pin ni sticky), se recorren con el scroll como cualquier otro
    // contenido. El card y la imagen SÍ son sticky (cada uno el suyo,
    // en CSS) — nacen dentro del notch del banner de arriba, se centran
    // en pantalla mientras dura .fp-cta-sticky-block, y se sueltan solos
    // para encajar en el notch del banner de abajo. Nada de esto se
    // mueve por JS; este bloque solo controla el crossfade de imágenes.
    const ctaStickyBlock = document.getElementById("fp-cta-sticky-block");
    const bgSlides = document.querySelectorAll(".fp-cta-bg-item");

    if (ctaStickyBlock && bgSlides.length > 0) {
      const n = bgSlides.length;
      ScrollTrigger.create({
        trigger: ctaStickyBlock,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.max(0, Math.min(Math.floor(self.progress * n), n - 1));
          bgSlides.forEach((slide, i) => slide.classList.toggle("is-active", i === idx));
        }
      });
    }

    // Fast load init (NO preloader delay)
    document.addEventListener("DOMContentLoaded", () => {
      initHeroAnimations();
      ScrollTrigger.refresh();
    });
  }

  /* ══════════════════════════════════════════════
     3. CV DOWNLOAD
  ══════════════════════════════════════════════ */
  const cvBtn = document.getElementById("fp-cv");
  if (cvBtn) {
    cvBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("Assets/CV_Oscar C._2026.pdf", "_blank");
      const a = document.createElement("a");
      a.href = "Assets/CV_Oscar C._2026.pdf";
      a.download = "CV_Oscar C._2026.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  /* ══════════════════════════════════════════════
     4. SMOOTH ANCHOR SCROLL
  ══════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href").slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

})();