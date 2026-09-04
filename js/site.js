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

  /* ------------------------------------------------------- custom select */
  /* Enhances a native <select> into a styled listbox. The select stays in the
     DOM as the source of truth and the form control, so if this code never
     runs the field still works. Keyboard behaviour mirrors a native dropdown:
     Enter/Space/Arrows open, arrows move, Enter/Space commit, Escape cancels,
     Home/End jump, and typing letters jumps to a matching option. */
  document.querySelectorAll('[data-select]').forEach(function (root) {
    var native = root.querySelector('[data-select-native]');
    var ui = root.querySelector('[data-select-ui]');
    var button = root.querySelector('[data-select-button]');
    var list = root.querySelector('[data-select-list]');
    var labelEl = root.querySelector('[data-select-label]');
    var chevron = root.querySelector('[data-select-chevron]');
    if (!native || !ui || !button || !list) return;

    var options = Array.prototype.slice.call(list.querySelectorAll('[role="option"]'));
    if (!options.length) return;

    // Hand over from the native control.
    native.classList.add('sr-only');
    native.setAttribute('tabindex', '-1');
    native.setAttribute('aria-hidden', 'true');
    ui.classList.remove('hidden');

    // The visible label pointed at the select, which is now hidden; move it to
    // the button so clicking the label still focuses the control.
    var fieldLabel = root.querySelector('label[for]');
    if (fieldLabel && button.id) fieldLabel.htmlFor = button.id;

    var activeIndex = Math.max(0, options.findIndex(function (o) {
      return o.getAttribute('aria-selected') === 'true';
    }));
    var open = false;
    var typeahead = '';
    var typeaheadTimer;

    function paint() {
      options.forEach(function (o, i) {
        var selected = o.getAttribute('data-value') === native.value;
        o.setAttribute('aria-selected', String(selected));
        var check = o.querySelector('[data-select-check]');
        if (check) check.hidden = !selected;
        if (i === activeIndex) {
          o.setAttribute('data-active', '');
          o.id = o.id || 'opt-' + Math.random().toString(36).slice(2, 8);
          button.setAttribute('aria-activedescendant', open ? o.id : '');
        } else {
          o.removeAttribute('data-active');
        }
      });
      labelEl.textContent = native.value;
    }

    function scrollActiveIntoView() {
      var el = options[activeIndex];
      if (!el) return;
      var top = el.offsetTop, bottom = top + el.offsetHeight;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
    }

    function setOpen(next) {
      open = next;
      list.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (chevron) {
        // Toggle classes rather than an inline transform, which would beat the
        // rotate-90 utility and leave the arrow stuck pointing sideways.
        chevron.classList.toggle('-rotate-90', open);
        chevron.classList.toggle('rotate-90', !open);
      }
      if (open) {
        activeIndex = Math.max(0, options.findIndex(function (o) {
          return o.getAttribute('data-value') === native.value;
        }));
        paint();
        scrollActiveIntoView();
      } else {
        button.setAttribute('aria-activedescendant', '');
        paint();
      }
    }

    function commit(index) {
      var value = options[index].getAttribute('data-value');
      if (native.value !== value) {
        native.value = value;
        // Anything listening on the real control still hears about it.
        native.dispatchEvent(new Event('change', { bubbles: true }));
      }
      activeIndex = index;
      setOpen(false);
      button.focus();
    }

    function move(delta) {
      activeIndex = Math.min(options.length - 1, Math.max(0, activeIndex + delta));
      paint();
      scrollActiveIntoView();
    }

    button.addEventListener('click', function () { setOpen(!open); });

    button.addEventListener('keydown', function (event) {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          event.preventDefault();
          if (!open) setOpen(true);
          else move(event.key === 'ArrowDown' ? 1 : -1);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (open) commit(activeIndex);
          else setOpen(true);
          break;
        case 'Escape':
          if (open) { event.preventDefault(); setOpen(false); }
          break;
        case 'Home':
          if (open) { event.preventDefault(); activeIndex = 0; paint(); scrollActiveIntoView(); }
          break;
        case 'End':
          if (open) { event.preventDefault(); activeIndex = options.length - 1; paint(); scrollActiveIntoView(); }
          break;
        case 'Tab':
          if (open) setOpen(false);
          break;
        default:
          if (event.key.length === 1 && /\S/.test(event.key)) {
            typeahead += event.key.toLowerCase();
            clearTimeout(typeaheadTimer);
            typeaheadTimer = setTimeout(function () { typeahead = ''; }, 600);
            var hit = options.findIndex(function (o) {
              return o.getAttribute('data-value').toLowerCase().indexOf(typeahead) === 0;
            });
            if (hit > -1) {
              if (!open) commit(hit);
              else { activeIndex = hit; paint(); scrollActiveIntoView(); }
            }
          }
      }
    });

    options.forEach(function (option, i) {
      option.addEventListener('click', function () { commit(i); });
      option.addEventListener('mousemove', function () {
        if (activeIndex !== i) { activeIndex = i; paint(); }
      });
    });

    document.addEventListener('click', function (event) {
      if (open && !root.contains(event.target)) setOpen(false);
    });

    paint();
  });

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
