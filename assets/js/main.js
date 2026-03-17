/* ============================================================
   XAVIO LANDING PAGE — main.js v3
   CRO: persona selector, scarcity timer, live feed,
   earnings simulator, FAQ accordion, exit intent modal,
   AI chat bubble, referral share, WhatsApp lead form,
   sticky CTA, scroll reveal, nav scroll, mobile menu,
   chart animation, phone parallax, active nav link
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

  /* ── PERSONA SELECTOR ───────────────────────────────────── */
  var personaData = {
    creator: {
      sub: 'Post stories. Tag products. Earn commissions. 2.4M+ creators already earning \u20b950,000/month on average.',
      cta: 'Start Earning in 2 Minutes',
      link: 'for-creators.html'
    },
    seller: {
      sub: 'List your products. Reach millions of buyers. Get paid instantly via UPI. No website needed.',
      cta: 'Open Your Free Store',
      link: 'for-sellers.html'
    },
    merchant: {
      sub: 'List your catalogue. Let 2.4M+ creators promote it. Pay commission only on sales. Zero upfront cost.',
      cta: 'List Products Free',
      link: 'for-merchants.html'
    },
    advertiser: {
      sub: 'Run story ads. Target by niche, location, and audience. 10x ROAS vs traditional digital ads.',
      cta: 'Launch Your Campaign',
      link: 'for-advertisers.html'
    }
  };

  window.setPersona = function(persona) {
    document.querySelectorAll('.persona-btn').forEach(function(b) { b.classList.remove('active'); });
    var activeBtn = document.querySelector('[data-persona="' + persona + '"]');
    if (activeBtn) activeBtn.classList.add('active');
    var data = personaData[persona];
    if (!data) return;
    var sub = document.getElementById('heroSub');
    var cta = document.getElementById('heroCta');
    if (sub) {
      sub.style.opacity = '0';
      sub.style.transition = 'opacity 0.2s';
      setTimeout(function() { sub.textContent = data.sub; sub.style.opacity = '1'; }, 200);
    }
    if (cta) { cta.textContent = data.cta; cta.href = data.link; }
  };

  /* ── SCARCITY COUNTDOWN TIMER ───────────────────────────── */
  (function() {
    var KEY = 'xavio_timer_end';
    var end = parseInt(sessionStorage.getItem(KEY) || '0');
    if (!end || end < Date.now()) {
      end = Date.now() + 5 * 60 * 1000;
      sessionStorage.setItem(KEY, String(end));
    }
    var el = document.getElementById('scarcityTimer');
    if (!el) return;
    function tick() {
      var rem = Math.max(0, end - Date.now());
      var m = Math.floor(rem / 60000);
      var s = Math.floor((rem % 60000) / 1000);
      el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      if (rem > 0) { requestAnimationFrame(tick); }
      else { var bar = el.closest('.scarcity-bar'); if (bar) bar.remove(); }
    }
    tick();
  })();

  /* ── REWARD BAR COUNTER ─────────────────────────────────── */
  (function() {
    var el = document.getElementById('rewardCount');
    if (!el) return;
    var count = parseInt(sessionStorage.getItem('xavio_spots') || '487');
    el.textContent = count;
    setInterval(function() {
      if (count > 470 && Math.random() < 0.3) {
        count = Math.max(470, count - 1);
        sessionStorage.setItem('xavio_spots', String(count));
        el.textContent = count;
      }
    }, 8000);
  })();

  /* ── LIVE GROWTH FEED ───────────────────────────────────── */
  (function() {
    var feed = document.getElementById('liveFeed');
    var text = document.getElementById('liveFeedText');
    if (!feed || !text) return;
    var names = ['Priya','Ravi','Anjali','Kiran','Meena','Arjun','Divya','Suresh','Pooja','Rahul'];
    var cities = ['Mumbai','Delhi','Bangalore','Chennai','Hyderabad','Pune','Kolkata','Ahmedabad','Jaipur','Surat'];
    var amts = [540,720,1200,850,960,1450,680,2100,430,1800];
    var actions = [
      function(n,c) { return n + ' from ' + c + ' earned \u20b9' + amts[Math.floor(Math.random()*amts.length)]; },
      function(n,c) { return n + ' from ' + c + ' made their first sale \ud83c\udf89'; },
      function(n,c) { return n + ' from ' + c + ' got ' + (Math.floor(Math.random()*40)+10) + ' new followers'; },
      function(n,c) { return n + ' from ' + c + ' received ' + (Math.floor(Math.random()*15)+3) + ' orders today'; },
      function(n,c) { return n + ' from ' + c + ' just joined Xavio'; }
    ];
    function show() {
      var n = names[Math.floor(Math.random()*names.length)];
      var c = cities[Math.floor(Math.random()*cities.length)];
      var a = actions[Math.floor(Math.random()*actions.length)];
      text.textContent = a(n,c);
      feed.style.animation = 'none';
      feed.offsetHeight; // reflow
      feed.style.animation = 'feedSlideIn .4s ease';
    }
    show();
    setInterval(show, 5000);
  })();

  /* ── EARNINGS SIMULATOR ─────────────────────────────────── */
  window.runSimulator = function() {
    var followersEl = document.getElementById('simFollowers');
    var nicheEl = document.getElementById('simNiche');
    var resultEl = document.getElementById('simResult');
    var valEl = document.getElementById('simVal');
    if (!followersEl || !nicheEl || !resultEl || !valEl) return;
    var followers = parseInt(followersEl.value);
    var multiplier = parseFloat(nicheEl.value);
    var monthly = Math.round(followers * 0.02 * 800 * 0.25 * multiplier);
    valEl.textContent = '\u20b9' + monthly.toLocaleString('en-IN');
    resultEl.style.display = 'block';
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  /* ── FAQ ACCORDION ──────────────────────────────────────── */
  window.toggleFaq = function(btn) {
    var item = btn.closest('.faq__item');
    var answer = item.querySelector('.faq__a');
    var isOpen = answer.classList.contains('open');
    document.querySelectorAll('.faq__a.open').forEach(function(a) {
      a.classList.remove('open');
      var q = a.previousElementSibling;
      if (q) q.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  };

  /* ── EXIT INTENT MODAL ──────────────────────────────────── */
  (function() {
    var modal = document.getElementById('exitModal');
    if (!modal) return;
    if (sessionStorage.getItem('xavio_exit_shown')) return;
    var triggered = false;
    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 0 && !triggered) {
        triggered = true;
        sessionStorage.setItem('xavio_exit_shown', '1');
        modal.style.display = 'flex';
        var spots = document.getElementById('exitSpotsLeft');
        if (spots) spots.textContent = String(Math.floor(Math.random()*8)+8);
      }
    });
    var mobileTimer = setTimeout(function() {
      if (!triggered && window.innerWidth < 768) {
        triggered = true;
        sessionStorage.setItem('xavio_exit_shown', '1');
        modal.style.display = 'flex';
      }
    }, 45000);
    document.addEventListener('touchstart', function() { clearTimeout(mobileTimer); }, { once: true });
  })();

  window.closeExitModal = function() {
    var modal = document.getElementById('exitModal');
    if (modal) modal.style.display = 'none';
  };

  /* ── AI CHAT BUBBLE ─────────────────────────────────────── */
  var aiResponses = {
    'start': 'Download Xavio free \u2192 create your profile \u2192 add products \u2192 share your story link. Your first sale can happen within 24 hours! \ud83d\ude80',
    'earn': 'The average Xavio creator earns \u20b950,000/month within 90 days. Top creators earn \u20b95 lakh+/month. Use our earnings calculator to see your estimate!',
    'free': 'Yes! The Starter plan is completely free forever \u2014 unlimited stories, personal storefront, affiliate products, and UPI payouts. No credit card required.',
    'default': 'Great question! Download Xavio free and explore everything yourself \u2014 it takes under 2 minutes to set up. Any other questions? \ud83d\ude0a'
  };

  window.toggleAiChat = function() {
    var box = document.getElementById('aiChatBox');
    var btn = document.querySelector('.ai-chat__btn');
    if (!box) return;
    var isOpen = box.style.display !== 'none' && box.style.display !== '';
    box.style.display = isOpen ? 'none' : 'block';
    if (btn) btn.setAttribute('aria-expanded', String(!isOpen));
  };

  window.aiQuick = function(msg) {
    var input = document.getElementById('aiInput');
    if (input) { input.value = msg; window.aiSend(); }
  };

  window.aiSend = function() {
    var input = document.getElementById('aiInput');
    var messages = document.getElementById('aiMessages');
    if (!input || !messages || !input.value.trim()) return;
    var userMsg = input.value.trim();
    input.value = '';
    var userEl = document.createElement('div');
    userEl.className = 'ai-chat__msg ai-chat__msg--user';
    userEl.textContent = userMsg;
    messages.appendChild(userEl);
    var lower = userMsg.toLowerCase();
    var key = Object.keys(aiResponses).find(function(k) { return lower.indexOf(k) !== -1; }) || 'default';
    setTimeout(function() {
      var botEl = document.createElement('div');
      botEl.className = 'ai-chat__msg ai-chat__msg--bot';
      botEl.textContent = aiResponses[key];
      messages.appendChild(botEl);
      messages.scrollTop = messages.scrollHeight;
    }, 600);
    messages.scrollTop = messages.scrollHeight;
  };

  /* ── REFERRAL SHARE ─────────────────────────────────────── */
  window.shareXavio = function() {
    var text = "Join Xavio \u2014 India's #1 social commerce app. Earn \u20b950,000/month from your stories: https://xavio.in";
    if (navigator.share) {
      navigator.share({ title: 'Xavio \u2014 Earn from Stories', text: text, url: 'https://xavio.in' }).catch(function(){});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() { alert('Link copied! Share it with your friends.'); });
    }
  };

  /* ── WHATSAPP LEAD FORM ─────────────────────────────────── */
  window.submitLead = function(e) {
    e.preventDefault();
    var phoneEl = document.getElementById('leadPhone');
    var phone = phoneEl ? phoneEl.value.trim() : '';
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit WhatsApp number.');
      return;
    }
    var success = document.getElementById('leadSuccess');
    var btn = e.target.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending\u2026'; }
    setTimeout(function() {
      if (success) success.style.display = 'block';
      if (btn) btn.style.display = 'none';
      var waUrl = 'https://wa.me/91' + phone + '?text=Hi%21%20Here%27s%20your%20Xavio%20download%20link%3A%20https%3A%2F%2Fxavio.in%20%F0%9F%9A%80';
      setTimeout(function() { window.open(waUrl, '_blank'); }, 1000);
    }, 1200);
  };

})();
