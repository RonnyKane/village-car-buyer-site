/* Village Car Buyer — script.js */

(function () {
  'use strict';

  /* ── Mobile Nav Toggle ── */
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ── Mark active nav link ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (open) {
        open.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ── Scroll-to-top button ── */
  const scrollTop = document.getElementById('scroll-top');
  if (scrollTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollTop.classList.add('show');
      } else {
        scrollTop.classList.remove('show');
      }
    });
    scrollTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── VIN auto-uppercase ── */
  const vinInput = document.getElementById('vin');
  if (vinInput) {
    vinInput.addEventListener('input', function () {
      const pos = this.selectionStart;
      this.value = this.value.toUpperCase();
      this.setSelectionRange(pos, pos);
    });
  }

  /* ── Form validation ── */
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      let valid = true;

      form.querySelectorAll('[required]').forEach(function (field) {
        const wrapper = field.closest('.form-group');
        const existing = wrapper && wrapper.querySelector('.field-error');
        if (existing) existing.remove();

        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#CC2222';
          if (wrapper) {
            const err = document.createElement('span');
            err.className = 'field-error';
            err.style.cssText = 'color:#CC2222;font-size:0.82rem;display:block;margin-top:0.25rem;';
            err.textContent = 'This field is required.';
            wrapper.appendChild(err);
          }
        } else {
          field.style.borderColor = '';
        }
      });

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(emailField.value.trim())) {
          valid = false;
          emailField.style.borderColor = '#CC2222';
          const wrapper = emailField.closest('.form-group');
          if (wrapper && !wrapper.querySelector('.field-error')) {
            const err = document.createElement('span');
            err.className = 'field-error';
            err.style.cssText = 'color:#CC2222;font-size:0.82rem;display:block;margin-top:0.25rem;';
            err.textContent = 'Please enter a valid email address.';
            wrapper.appendChild(err);
          }
        }
      }

      // Phone validation
      const phoneField = form.querySelector('input[name="phone"]');
      if (phoneField && phoneField.value.trim()) {
        const digits = phoneField.value.replace(/\D/g, '');
        if (digits.length < 10) {
          valid = false;
          phoneField.style.borderColor = '#CC2222';
          const wrapper = phoneField.closest('.form-group');
          if (wrapper && !wrapper.querySelector('.field-error')) {
            const err = document.createElement('span');
            err.className = 'field-error';
            err.style.cssText = 'color:#CC2222;font-size:0.82rem;display:block;margin-top:0.25rem;';
            err.textContent = 'Please enter a valid 10-digit phone number.';
            wrapper.appendChild(err);
          }
        }
      }

      if (!valid) {
        e.preventDefault();
        const firstError = form.querySelector('.field-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Phone number formatting ── */
  const phoneInputs = document.querySelectorAll('input[name="phone"]');
  phoneInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      let digits = this.value.replace(/\D/g, '').slice(0, 10);
      if (digits.length >= 7) {
        this.value = '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
      } else if (digits.length >= 4) {
        this.value = '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
      } else if (digits.length > 0) {
        this.value = digits;
      }
    });
  });

})();
