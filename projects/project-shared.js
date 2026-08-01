/* ═══════════════════════════════════════════════════════════
   project-shared.js — Shared JS for all project pages
   Lightweight preloader, nav setup, simple custom cursor, scroll reveals
   ═══════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // Preloader hide
  window.addEventListener("load", function () {
    const preloader = document.getElementById("proj-preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }
  });

  // IntersectionObserver for modular blocks reveal
  document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll(".proj-reveal");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  });

  /* ══════════════════════════════════════════════
     CUSTOM CURSOR (desktop only) — Match main page style
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
        position: fixed; top: 0; left: 0;
        width: 0; height: 0; pointer-events: none; z-index: 999999;
        mix-blend-mode: exclusion; opacity: 0;
        transition: opacity 0.25s ease;
      }
      .cursor-ring {
        position: absolute; top: -18px; left: -18px;
        width: 36px; height: 36px;
        border: 1.5px solid rgba(255, 255, 255, 0.85);
        border-radius: 50%;
        transition: transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
                    background-color 0.2s ease, border-color 0.2s ease,
                    width 0.25s ease, height 0.25s ease, top 0.25s ease, left 0.25s ease;
      }
      .cursor-dot-center {
        position: absolute; top: -3px; left: -3px;
        width: 6px; height: 6px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
      }
      #custom-cursor.is-hovering .cursor-ring {
        width: 52px; height: 52px; top: -26px; left: -26px;
        background-color: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.6);
      }
      #custom-cursor.is-hovering .cursor-dot-center {
        transform: scale(0); opacity: 0;
      }
      #custom-cursor.is-clicking .cursor-ring {
        transform: scale(0.82);
        background-color: rgba(255, 255, 255, 0.35);
      }
    `;
    document.head.appendChild(cursorStyle);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let hasMoved = false;

    document.addEventListener("mousemove", (e) => {
      if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = "1";
      }
      mx = e.clientX;
      my = e.clientY;
    });

    function animateCursor() {
      cx += (mx - cx) * 0.38;
      cy += (my - cy) * 0.38;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverSelectors = "a, button, [role='button'], .proj-media-item, input, label";
    document.querySelectorAll(hoverSelectors).forEach(el => {
      el.addEventListener("mouseenter", () => cursor.classList.add("is-hovering"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("is-hovering"));
    });

    document.addEventListener("mousedown", () => cursor.classList.add("is-clicking"));
    document.addEventListener("mouseup", () => cursor.classList.remove("is-clicking"));
  }

})();
