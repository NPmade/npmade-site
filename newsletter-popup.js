// Gentle newsletter pop-up: shows once (after 15 s or half-page scroll), easy to close.
// Uses the same Brevo form as /newsletter; Brevo's main.js is loaded only when the pop-up opens.
(function () {
  var KEY = 'npm-popup-seen';
  function seen() { try { return localStorage.getItem(KEY); } catch (e) { return '1'; } }
  function remember() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }
  if (seen() || /^\/newsletter/.test(location.pathname)) return;

  var css = '' +
    '.npm-pop{position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(43,39,35,.55);opacity:0;transition:opacity .35s ease}' +
    '.npm-pop.is-open{opacity:1}' +
    '.npm-pop__card{position:relative;width:100%;max-width:420px;max-height:calc(100vh - 32px);overflow:auto;background:#F7F1E6;color:#2B2723;border:1px solid #5E4C0B;border-radius:3px;padding:36px 26px 24px;text-align:center;font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;line-height:1.5;transform:translateY(12px);transition:transform .35s ease}' +
    '.npm-pop.is-open .npm-pop__card{transform:none}' +
    '.npm-pop__x{position:absolute;top:6px;right:6px;width:44px;height:44px;border:0;background:none;font:inherit;font-size:2rem;line-height:1;color:#6B6258;cursor:pointer}' +
    '.npm-pop__x:focus-visible,.npm-pop .btn:focus-visible{outline:3px solid #2B2723;outline-offset:2px}' +
    '.npm-pop__logo{width:72px;height:auto;display:block;margin:0 auto 10px}' +
    '.npm-pop h2{font-size:1.9rem;line-height:1.15;font-weight:600;margin:0 0 8px}' +
    '.npm-pop__lead{font-size:1.2rem;margin:0 0 20px;text-wrap:balance}' +
    '.npm-pop form{text-align:left}' +
    '.npm-pop .input{width:100%;font:inherit;font-size:1.15rem;color:#2B2723;background:#fff;border:1px solid #5E4C0B;border-radius:2px;padding:10px 12px}' +
    '.npm-pop .input:focus{outline:3px solid #2B2723;outline-offset:2px}' +
    '.npm-pop__field{margin:0 0 14px}' +
    '.npm-pop .entry__label{display:block;font-size:.95rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin:0 0 6px}' +
    '.npm-pop .entry__error{display:block;color:#8A2E1E;font-size:1rem}.npm-pop .entry__error:empty{display:none}' +
    '.npm-pop .optin{display:flex;gap:10px;align-items:flex-start;font-size:1.08rem;line-height:1.35;margin:12px 0 10px;cursor:pointer}' +
    '.npm-pop .optin input{width:20px;height:20px;margin:2px 0 0;flex:none;accent-color:#836A10}' +
    '.npm-pop__privacy{font-size:.95rem;line-height:1.4;color:#6B6258;margin:0 0 16px}.npm-pop__privacy a{color:inherit}' +
    '.npm-pop .btn{display:block;width:100%;font:inherit;font-size:1.1rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:14px 20px;border:0;border-radius:2px;background:#646B52;color:#F7F1E6;cursor:pointer}' +
    '.npm-pop .btn:hover{background:#565C47}.npm-pop .btn .progress-indicator__icon{display:none}' +
    '.npm-pop .sib-form-message-panel{display:none;margin:0 0 16px;padding:14px 16px;border-radius:2px;font-size:1.15rem;line-height:1.4}' +
    '.npm-pop #success-message{background:#2B2723;color:#F7F1E6}.npm-pop #error-message{border:1px solid #8A2E1E;color:#8A2E1E}' +
    '.npm-pop .input--hidden{display:none!important}' +
    '@media (prefers-reduced-motion:reduce){.npm-pop,.npm-pop__card{transition:none}}';

  var html = '' +
    '<div class="npm-pop__card">' +
      '<button type="button" class="npm-pop__x" aria-label="Close">&times;</button>' +
      '<img class="npm-pop__logo" src="/logo.png" alt="">' +
      '<h2 id="npm-pop-title">Join the crew</h2>' +
      '<p class="npm-pop__lead">New batches and studio news from my Warsaw workshop. My Black Friday code goes to subscribers only.</p>' +
      '<div class="sib-form"><div id="sib-form-container" class="sib-form-container">' +
        '<div id="error-message" class="sib-form-message-panel" role="alert"><div class="sib-form-message-panel__text"><span class="sib-form-message-panel__inner-text">Your subscription could not be saved. Please try again.</span></div></div>' +
        '<div id="success-message" class="sib-form-message-panel" role="status"><div class="sib-form-message-panel__text"><span class="sib-form-message-panel__inner-text">Thank you for subscribing! Welcome to the crew. Check your inbox for a hello from me.</span></div></div>' +
        '<div id="sib-container" class="sib-container--large sib-container--vertical">' +
          '<form id="sib-form" method="POST" action="https://b8adc214.sibforms.com/serve/MUIFACLi_tBiWR3XpdHJRrPBzdrN5wBkCyGUnvnCy6T218Ar5OTsa0GwxbCLdWvQyYjQC67KyYtQgNifUkaejvSmLafrYe8oAKTeeacpFtMDww4caVTHV5rMWf74YUXqmXCdD2KrTlWNs_FR3cK0OAlGg7VHuBHd8FW0RYX3QApHU5hjVJRKwJAw-OQySJ9rROyieGB3nVEnd7NMIA==" data-type="subscription">' +
            '<div class="sib-input sib-form-block npm-pop__field"><div class="form__entry entry_block"><div class="form__label-row">' +
              '<label class="entry__label" for="FIRSTNAME">First name</label>' +
              '<div class="entry__field"><input class="input" maxlength="200" type="text" id="FIRSTNAME" name="FIRSTNAME" autocomplete="given-name"></div>' +
            '</div><label class="entry__error entry__error--primary"></label></div></div>' +
            '<div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">' +
              '<label class="entry__label" for="EMAIL" data-required="*">Email</label>' +
              '<div class="entry__field"><input class="input" type="email" id="EMAIL" name="EMAIL" autocomplete="email" data-required="true" required></div>' +
            '</div><label class="entry__error entry__error--primary"></label></div></div>' +
            '<div class="sib-optin sib-form-block"><div class="form__entry entry_mcq"><div class="form__label-row"><div class="entry__choice">' +
              '<label class="optin"><input type="checkbox" class="input_replaced" value="1" id="OPT_IN" name="OPT_IN" required><span>I agree to receive the N.P.made newsletter</span></label>' +
            '</div></div><label class="entry__error entry__error--primary"></label></div></div>' +
            '<p class="npm-pop__privacy">Your email is used only for this newsletter and stored securely with Brevo. Unsubscribe anytime. Questions: <a href="mailto:info@npmadestudio.com">info@npmadestudio.com</a></p>' +
            '<div class="sib-form-block"><button class="btn sib-form-block__button sib-form-block__button-with-loader" form="sib-form" type="submit"><svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512" aria-hidden="true"></svg>Subscribe</button></div>' +
            '<input type="text" name="email_address_check" value="" class="input--hidden" tabindex="-1" autocomplete="off" aria-hidden="true">' +
            '<input type="hidden" name="locale" value="en">' +
          '</form>' +
        '</div>' +
      '</div></div>' +
    '</div>';

  var shown = false, lastFocus = null, pop = null, timer = null;

  function open() {
    if (shown) return;
    shown = true;
    remember();
    window.removeEventListener('scroll', onScroll);
    clearTimeout(timer);

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    pop = document.createElement('div');
    pop.className = 'npm-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-modal', 'true');
    pop.setAttribute('aria-labelledby', 'npm-pop-title');
    pop.innerHTML = html;
    document.body.appendChild(pop);

    window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
    window.LOCALE = 'en';
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "That email doesn't look right. Please check it and try again.";
    window.REQUIRED_ERROR_MESSAGE = 'This field cannot be left blank.';
    window.GENERIC_INVALID_MESSAGE = "That doesn't look right. Please check it and try again.";
    window.translation = { common: { selectedList: '{quantity} list selected', selectedLists: '{quantity} lists selected', selectedOption: '{quantity} selected', selectedOptions: '{quantity} selected' } };
    window.AUTOHIDE = false;
    var s = document.createElement('script');
    s.src = 'https://sibforms.com/forms/end-form/build/main.js';
    document.body.appendChild(s);

    lastFocus = document.activeElement;
    pop.querySelector('.npm-pop__x').addEventListener('click', close);
    pop.addEventListener('click', function (e) { if (e.target === pop) close(); });
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(function () { pop.classList.add('is-open'); });
    pop.querySelector('.npm-pop__x').focus();
  }

  function close() {
    if (!pop) return;
    document.removeEventListener('keydown', onKey);
    pop.classList.remove('is-open');
    var p = pop; pop = null;
    setTimeout(function () { p.remove(); }, 350);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab' || !pop) return;
    var f = pop.querySelectorAll('button, input:not([type=hidden]):not(.input--hidden), a[href]');
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0 && window.scrollY / h > 0.5) open();
  }

  timer = setTimeout(open, 15000);
  window.addEventListener('scroll', onScroll, { passive: true });
})();
