/*
  ================================================================
  MEMBERS PAGE INTERACTIONS
  ================================================================
  Wires up click/keyboard flip on whatever .member-card elements are
  already in the page (rendered server-side by Hugo from
  data/members.json — see layouts/_default/members.html), plus the
  floating "Flip All" button and its scroll-triggered visibility.

  This file does NOT build any card markup itself (that used to be
  js/members-engine.js's job, back when cards were rendered client-
  side from js/members-data.js) — it only adds behavior to cards that
  already exist in the DOM.
  ================================================================
*/
(function () {
    "use strict";

    function toggleFlip(card) {
        const flipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", flipped ? "true" : "false");
    }

    function initFlipInteractions() {
        const cards = document.querySelectorAll(".member-card");

        cards.forEach(function (card) {
            card.classList.add("flip-enabled");
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.setAttribute("aria-pressed", "false");

            card.addEventListener("click", function (event) {
                if (event.target.closest("a, button")) return; // let links/buttons work normally
                toggleFlip(card);
            });

            card.addEventListener("keydown", function (event) {
                if (event.key !== "Enter" && event.key !== " ") return;
                if (event.target.closest("a, button")) return;
                event.preventDefault();
                toggleFlip(card);
            });
        });

        const flipAllBtn = document.getElementById("flipAllMembersBtn");
        if (flipAllBtn && !flipAllBtn.dataset.wired) {
            flipAllBtn.dataset.wired = "true";
            flipAllBtn.addEventListener("click", function () {
                const shouldFlip = !document.querySelector(".member-card.is-flipped");
                document.querySelectorAll(".member-card").forEach(function (card) {
                    card.classList.toggle("is-flipped", shouldFlip);
                    card.setAttribute("aria-pressed", shouldFlip ? "true" : "false");
                });
                flipAllBtn.innerHTML = shouldFlip
                    ? '<i class="fas fa-clone me-2"></i><span>Reset</span>'
                    : '<i class="fas fa-clone me-2"></i><span>Flip All</span>';
                flipAllBtn.setAttribute("aria-pressed", shouldFlip ? "true" : "false");
            });
        }
    }

    // Floating "Flip All" button: only shown once the header/hero area
    // has scrolled out of view.
    function initFlipAllVisibility() {
        const btn = document.getElementById("flipAllMembersBtn");
        const header = document.querySelector(".members-header2");
        if (!btn || !header) return;

        if (!("IntersectionObserver" in window)) {
            // No IntersectionObserver support — fail open, keep it visible.
            btn.classList.add("is-visible");
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            const headerVisible = entries[0].isIntersecting;
            btn.classList.toggle("is-visible", !headerVisible);
        });
        observer.observe(header);
    }

    document.addEventListener("DOMContentLoaded", function () {
        initFlipInteractions();
        initFlipAllVisibility();
    });
})();
