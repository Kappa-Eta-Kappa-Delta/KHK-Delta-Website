/*
  ================================================================
  "INTERESTED IN JOINING?" SIGN-UP FORM
  ================================================================
  Shared by index.html and rush.html — one place to edit instead of
  hand-coding the form twice. Same pattern as js/navbar.js: each page
  has a placeholder immediately followed by this script (no "defer",
  so it fills in the placeholder right away while the page parses):

      <div id="join-form"></div>
      <script src="js/join-form.js"></script>

  WHERE SUBMISSIONS GO
  Submitting the form sends the name/email/semester to a Google Sheet
  (via a Google Apps Script Web App you deploy yourself — see
  scripts/JOIN-FORM-SETUP.md for the one-time setup). Every submission
  becomes a new row, with the date/time added automatically by the
  script. Until APPS_SCRIPT_URL below is filled in, the form will
  show an error instead of submitting — that's expected until setup
  is done.

  HOW TO UPDATE THE SEMESTER DROPDOWN
  SEMESTER_OPTIONS below is a plain list, oldest first. Once or twice
  a year (whenever the current semester is close to ending), add the
  next upcoming one to the end of the list and remove the oldest if
  it's now in the past.
  ================================================================
*/
(function () {
    "use strict";

    // Fill this in after deploying the Apps Script (see
    // scripts/JOIN-FORM-SETUP.md) — it looks like
    // "https://script.google.com/macros/s/AKfycb.../exec"
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwoq_lKGM98nVvkXhkvgqqV3SE2XB6goj7bKiFyYE-m4TXvHTTm4FFCzSPbkfX0BlH_ww/exec"
    // Current semester first in this list, per project convention.
    const SEMESTER_OPTIONS = ["Fall 2026", "Spring 2027", "Fall 2027", "Spring 2028"];

    function formHtml() {
        const options = SEMESTER_OPTIONS.map(function (s) {
            return '<option value="' + s + '">' + s + "</option>";
        }).join("");

        return (
            '<section id="join-interest" class="join-form-section py-5 bg-light">' +
                '<div class="container">' +
                    '<div class="row justify-content-center">' +
                        '<div class="col-lg-8">' +
                            '<h2 class="display-5 fw-bold text-center mb-4">Interested in Joining?</h2>' +
                            '<p class="lead text-center mb-5">Sign up so we can reach out to you.</p>' +
                            '<form class="join-form" id="joinInterestForm" novalidate>' +
                                '<div class="mb-3">' +
                                    '<input type="text" name="name" class="form-control form-control-lg" placeholder="Your name" required>' +
                                '</div>' +
                                '<div class="mb-3">' +
                                    '<input type="email" name="email" class="form-control form-control-lg" placeholder="Your school email" required>' +
                                '</div>' +
                                '<div class="mb-3">' +
                                    '<select name="semester" class="form-select form-select-lg" required>' +
                                        '<option value="" disabled selected>Semester you\'re interested in joining</option>' +
                                        options +
                                    "</select>" +
                                "</div>" +
                                '<div class="text-center">' +
                                    '<button class="btn btn-primary btn-lg" type="submit">Sign Up</button>' +
                                "</div>" +
                                '<div id="joinFormStatus" class="join-form-status text-center fade" aria-live="polite"></div>' +
                                '<p class="text-muted text-center small mt-3">We\'ll only use this to reach out about joining KHK.</p>' +
                            "</form>" +
                        "</div>" +
                    "</div>" +
                "</div>" +
            "</section>"
        );
    }

    // Shows a message under the submit button and auto-fades it after a
    // few seconds — same fade technique window.showNotification() uses
    // (js/main.js), just scoped to this form instead of a page-top toast.
    function setStatus(statusEl, type, message) {
        statusEl.textContent = message;
        statusEl.className = "join-form-status text-center fade show " +
            (type === "success" ? "text-success" : "text-danger");

        clearTimeout(statusEl._fadeTimer);
        statusEl._fadeTimer = setTimeout(function () {
            statusEl.classList.remove("show");
            setTimeout(function () { statusEl.textContent = ""; }, 150);
        }, 4000);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const statusEl = document.getElementById("joinFormStatus");
        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim();
        const semester = form.elements.semester.value;

        if (!name) {
            setStatus(statusEl, "error", "Please enter your name.");
            return;
        }
        if (!window.isValidEmail(email)) {
            setStatus(statusEl, "error", "Please enter a valid email address.");
            return;
        }
        if (!semester) {
            setStatus(statusEl, "error", "Please choose a semester.");
            return;
        }
        if (!APPS_SCRIPT_URL) {
            setStatus(statusEl, "error", "Sign-up isn't fully set up yet — see scripts/JOIN-FORM-SETUP.md.");
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML =
            '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending…';

        // Sent as text/plain (not application/json) so the browser doesn't
        // send a CORS preflight request first — Apps Script Web Apps don't
        // handle that preflight. Apps Script still reads the raw body fine.
        fetch(APPS_SCRIPT_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({ name: name, email: email, semester: semester })
        })
            .then(function () {
                setStatus(statusEl, "success", "Thanks for signing up! We'll be in touch.");
                form.reset();
            })
            .catch(function () {
                setStatus(statusEl, "error", "Something went wrong submitting the form. Please try again.");
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            });
    }

    const placeholder = document.getElementById("join-form");
    if (!placeholder) {
        console.error('[join-form] No #join-form placeholder found on this page — add <div id="join-form"></div> right before <script src="js/join-form.js"></script>.');
        return;
    }
    placeholder.outerHTML = formHtml();

    const form = document.getElementById("joinInterestForm");
    if (form) form.addEventListener("submit", handleSubmit);
})();
