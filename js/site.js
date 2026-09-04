/**
 * Two interactions need JavaScript: the mobile drawer and the chat widget.
 * Everything else (responsive nav, FAQ accordion, form states, call bar) is
 * handled by CSS or by the server.
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------- mobile menu */
  var menuBtn = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
  }

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      setMenu(menu.hidden);
    });

    // Close when a drawer link is followed, so the target section is visible.
    menu.querySelectorAll('[data-menu-close]').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });
  }

  /* ---------------------------------------------------------- chat widget */
  var chatPanel = document.getElementById('chat-panel');
  var chatBtn = document.getElementById('chat-toggle');
  var chatForm = document.getElementById('chat-form');
  var chatInput = document.getElementById('chat-input');

  function setChat(open) {
    if (!chatPanel || !chatBtn) return;
    chatPanel.hidden = !open;
    chatBtn.setAttribute('aria-expanded', String(open));

    document.querySelectorAll('[data-chat-icon]').forEach(function (el) {
      el.hidden = el.getAttribute('data-chat-icon') !== (open ? 'open' : 'closed');
    });

    if (open && chatInput) chatInput.focus();
  }

  document.querySelectorAll('[data-chat-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setChat(chatPanel && chatPanel.hidden);
    });
  });

  if (chatForm) {
    chatForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var text = chatInput ? chatInput.value.trim() : '';
      if (!text) return;

      var base = chatForm.getAttribute('data-wa-base');
      window.open(base + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      chatInput.value = '';
    });
  }

  /* ------------------------------------------------------------- escape */
  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    if (menu && !menu.hidden) {
      setMenu(false);
      if (menuBtn) menuBtn.focus();
    }
    if (chatPanel && !chatPanel.hidden) {
      setChat(false);
      if (chatBtn) chatBtn.focus();
    }
  });
})();
