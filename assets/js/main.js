/* ============================================================
   XAVIO LANDING PAGE — main.js v2
   Patterns: page-cro, frontend-patterns, performance
   ============================================================ */

(function () {
  'use strict';

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal, .reveal-right');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el) { io.observe(el); });
  } else {
    revealEls.forEach(function(el) { el.classList.add('visible'); });
  }

  /* ── NAV SCROLL ─────────────────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() { if (nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── MOBILE NAV ─────────────────────────────────────────── */
  var burger = document.getElementById('navBurger');
  var mobileMenu = document.getElementById('navMobile');
  if (burger && mobileMenu) {
    function closeMobile() {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      var s = burger.querySelectorAll('span');
      s[0].style.transform = ''; s[1].style.opacity = ''; s[2].style.transform = '';
    }
    burger.addEventListener('click', function() {
      var open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      var s = burger.querySelectorAll('span');
      if (open) {
        s[0].style.transform = 'translateY(7px) rotate(45deg)';
        s[1].style.opacity = '0';
        s[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else { closeMobile(); }
    });
    mobileMenu.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', closeMobile); });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) { closeMobile(); burger.focus(); }
    });
  }

  /* ── SMOOTH ANCHOR SCROLL ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 16, behavior: 'smooth' });
    });
  });

  /* ── STICKY MOBILE CTA ──────────────────────────────────── */
  var stickyCta = document.getElementById('stickyCta');
  if (stickyCta && 'IntersectionObserver' in window) {
    var heroSection = document.getElementById('hero');
    var dlSection = document.getElementById('download');
    var sio = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.target === heroSection) {
          stickyCta.classList.toggle('visible', !e.isIntersecting);
          stickyCta.setAttribute('aria-hidden', String(e.isIntersecting));
        }
        if (e.target === dlSection && e.isIntersecting) {
          stickyCta.classList.remove('visible');
          stickyCta.setAttribute('aria-hidden', 'true');
        }
      });
    }, { threshold: 0.1 });
    if (heroSection) sio.observe(heroSection);
    if (dlSection) sio.observe(dlSection);
  }

  /* ── CHART BAR ANIMATION ────────────────────────────────── */
  var chartBars = document.querySelectorAll('.chart-bar');
  if (chartBars.length && 'IntersectionObserver' in window) {
    var targets = Array.from(chartBars).map(function(b) { return b.style.getPropertyValue('--h'); });
    chartBars.forEach(function(b) { b.style.height = '2px'; });
    var cio = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          chartBars.forEach(function(b, i) {
            setTimeout(function() {
              b.style.transition = 'height 600ms cubic-bezier(0.22,1,0.36,1)';
              b.style.height = targets[i];
            }, i * 80);
          });
          cio.disconnect();
        }
      });
    }, { threshold: 0.3 });
    var wrap = document.querySelector('.chart-bars');
    if (wrap) cio.observe(wrap);
  }

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__links a');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var aio = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          navLinks.forEach(function(a) {
            a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--fg)' : '';
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(function(s) { aio.observe(s); });
  }

  /* ── PHONE PARALLAX (desktop only) ─────────────────────── */
  var phoneWrap = document.querySelector('.hero__phone-wrap');
  if (phoneWrap && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('mousemove', function(e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 6;
      var y = (e.clientY / window.innerHeight - 0.5) * 6;
      phoneWrap.style.transform = 'perspective(1000px) rotateY(' + x + 'deg) rotateX(' + (-y) + 'deg)';
    }, { passive: true });
  }

})();
