/* ============================================================
   XAVIO — Unified JS engine (matches xavio.css class names)
   ============================================================ */
(function () {
  'use strict';

  /* 1. THEME */
  var html = document.documentElement;
  var saved = localStorage.getItem('xavio-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  function toggleTheme() {
    var cur = html.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('xavio-theme', next);
  }

  /* 2. MOBILE NAV */
  function initNav() {
    var burger = document.getElementById('navBurger');
    var mobile = document.getElementById('navMobile');
    if (!burger || !mobile) return;
    burger.addEventListener('click', function () {
      var open = mobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !mobile.contains(e.target)) {
        mobile.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    var nav = document.getElementById('nav');
    if (nav) {
      window.addEventListener('scroll', function () {
        nav.style.boxShadow = window.scrollY > 40 ? '0 4px 24px rgba(0,0,0,.3)' : '';
      }, { passive: true });
    }
  }

  /* 3. THEME TOGGLE BUTTON */
  function initThemeToggle() {
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });
  }

  /* 4. REWARD BAR */
  function initRewardBar() {
    var el = document.getElementById('rewardCount');
    if (!el) return;
    var count = parseInt(el.textContent, 10) || 487;
    setInterval(function () {
      if (count > 420 && Math.random() < 0.3) {
        count -= Math.floor(Math.random() * 2) + 1;
        el.textContent = count;
      }
    }, 8000);
  }

  /* 5. SCROLL REVEAL */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* 6. FAQ ACCORDION */
  function initFAQ() {
    document.querySelectorAll('.faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.faq-item');
        if (!item) return;
        var wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  /* 7. PRICING SEGMENT TABS */
  window.switchPricingSeg = function (seg) {
    document.querySelectorAll('.pricing-tab').forEach(function (t) {
      var active = t.dataset.seg === seg;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.pricing-panel').forEach(function (p) {
      p.classList.toggle('active', p.dataset.seg === seg);
    });
  };

  /* 8. PERSONA SELECTOR */
  window.setPersona = function (persona) {
    document.querySelectorAll('.persona-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.persona === persona);
    });
  };

  /* 9. EARNINGS SIMULATOR */
  window.calcEarnings = function () {
    var f = document.getElementById('simFollowers');
    var p = document.getElementById('simPosts');
    var n = document.getElementById('simNiche');
    var result = document.getElementById('simResult');
    if (!result) return;
    var followers = parseInt((f && f.value) || 0);
    var posts = parseInt((p && p.value) || 0);
    var niche = (n && n.value) || 'fashion';
    var rates = { fashion: 180, tech: 320, food: 150, fitness: 220, beauty: 200, travel: 170, finance: 380, general: 140 };
    var rate = rates[niche] || 180;
    var monthly = Math.round(followers * 0.035 * posts * 4 * (rate / 100));
    var fmt = monthly >= 100000 ? '\u20b9' + (monthly / 100000).toFixed(1) + 'L' : '\u20b9' + monthly.toLocaleString('en-IN');
    result.classList.add('show');
    var amt = result.querySelector('.sim-result__amount');
    if (amt) amt.textContent = fmt + '/mo';
  };

  /* 10. ROAS SIMULATOR */
  window.calcROAS = function () {
    var b = document.getElementById('adBudget');
    var c = document.getElementById('adCategory');
    var result = document.getElementById('roasResult');
    if (!result) return;
    var budget = parseInt((b && b.value) || 0);
    var category = (c && c.value) || 'fashion';
    var roasMap = { fashion: 4.2, tech: 5.8, food: 3.9, fitness: 4.7, beauty: 5.1, finance: 6.2, general: 3.8 };
    var roas = roasMap[category] || 4.2;
    var revenue = Math.round(budget * roas);
    var fmt = revenue >= 100000 ? '\u20b9' + (revenue / 100000).toFixed(1) + 'L' : '\u20b9' + revenue.toLocaleString('en-IN');
    result.classList.add('show');
    var amt = result.querySelector('.sim-result__amount');
    if (amt) amt.textContent = fmt + ' revenue';
    var note = result.querySelector('.sim-result__note');
    if (note) note.textContent = roas.toFixed(1) + 'x ROAS on \u20b9' + budget.toLocaleString('en-IN') + ' spend';
  };

  /* 11. PROFIT CALCULATOR */
  window.calcProfit = function () {
    var pr = document.getElementById('sellerPrice');
    var qt = document.getElementById('sellerQty');
    var result = document.getElementById('profitResult');
    if (!result) return;
    var price = parseInt((pr && pr.value) || 0);
    var qty = parseInt((qt && qt.value) || 0);
    var revenue = price * qty;
    var commission = Math.round(revenue * 0.03);
    var profit = revenue - commission;
    var fmt = profit >= 100000 ? '\u20b9' + (profit / 100000).toFixed(1) + 'L' : '\u20b9' + profit.toLocaleString('en-IN');
    result.classList.add('show');
    var amt = result.querySelector('.sim-result__amount');
    if (amt) amt.textContent = fmt + '/mo';
    var note = result.querySelector('.sim-result__note');
    if (note) note.textContent = 'After 3% fee (\u20b9' + commission.toLocaleString('en-IN') + ')';
  };

  /* 12. MERCHANT ROI */
  window.calcMerchantROI = function () {
    var g = document.getElementById('merchantGMV');
    var cr = document.getElementById('merchantCreators');
    var result = document.getElementById('merchantResult');
    if (!result) return;
    var gmv = parseInt((g && g.value) || 0);
    var creators = parseInt((cr && cr.value) || 0);
    var uplift = Math.round(gmv * creators * 0.18);
    var fmt = uplift >= 100000 ? '\u20b9' + (uplift / 100000).toFixed(1) + 'L' : '\u20b9' + uplift.toLocaleString('en-IN');
    result.classList.add('show');
    var amt = result.querySelector('.sim-result__amount');
    if (amt) amt.textContent = fmt + ' uplift/mo';
  };

  /* 13. LIVE COUNTERS */
  function fmtCount(n) {
    if (n >= 10000000) return (n / 10000000).toFixed(1) + 'Cr';
    if (n >= 100000) return (n / 100000).toFixed(1) + 'L';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString('en-IN');
  }
  function initLiveCounters() {
    var cfgs = {
      orders: { val: 1247, min: 1, max: 5, ms: 2200 },
      earnings: { val: 84000000, min: 500, max: 3000, ms: 1800 },
      impressions: { val: 2400000, min: 200, max: 1000, ms: 1200 },
      creators: { val: 2400000, min: 1, max: 3, ms: 5000 }
    };
    Object.keys(cfgs).forEach(function (key) {
      var el = document.querySelector('[data-counter="' + key + '"]');
      if (!el) return;
      var cfg = cfgs[key];
      el.textContent = fmtCount(cfg.val);
      setInterval(function () {
        cfg.val += Math.floor(Math.random() * (cfg.max - cfg.min + 1)) + cfg.min;
        el.textContent = fmtCount(cfg.val);
      }, cfg.ms);
    });
  }

  /* 14. SCARCITY TIMER */
  function initScarcityTimer() {
    var el = document.getElementById('scarcityTimer');
    if (!el) return;
    var secs = Math.floor(Math.random() * 7200) + 3600;
    function tick() {
      var h = Math.floor(secs / 3600);
      var m = Math.floor((secs % 3600) / 60);
      var s = secs % 60;
      el.textContent = (h > 0 ? h + 'h ' : '') + String(m).padStart(2, '0') + 'm ' + String(s).padStart(2, '0') + 's';
      if (secs > 0) secs--;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* 15. STICKY CTA */
  function initStickyCTA() {
    var cta = document.getElementById('stickyCTA');
    var hero = document.getElementById('hero') || document.querySelector('.audience-hero');
    if (!cta || !hero) return;
    var obs = new IntersectionObserver(function (entries) {
      cta.classList.toggle('show', !entries[0].isIntersecting);
    }, { threshold: 0 });
    obs.observe(hero);
  }

  /* 16. EXIT MODAL */
  function initExitModal() {
    var modal = document.getElementById('exitModal');
    if (!modal) return;
    var shown = false;
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY <= 0 && !shown && !sessionStorage.getItem('exit-shown')) {
        shown = true;
        modal.classList.add('show');
        sessionStorage.setItem('exit-shown', '1');
      }
    });
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('show');
    });
  }
  window.closeExitModal = function () {
    var m = document.getElementById('exitModal');
    if (m) m.classList.remove('show');
  };

  /* 17. WHATSAPP SHARE */
  window.shareOnWhatsApp = function (msg) {
    var text = msg || 'I found Xavio \u2014 earn \u20b950,000/month from WhatsApp stories! Join free: https://xavio.in';
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  };

  /* 18. LIVE FEED */
  function initLiveFeed() {
    var el = document.getElementById('liveFeed');
    if (!el) return;
    var names = ['Priya from Mumbai','Arjun from Delhi','Sneha from Bangalore','Rahul from Pune','Kavya from Chennai','Amit from Hyderabad','Neha from Jaipur','Vikram from Kolkata'];
    var amounts = ['\u20b92,400','\u20b95,800','\u20b91,200','\u20b98,500','\u20b93,100','\u20b912,000','\u20b9950','\u20b94,700'];
    var i = 0;
    function showNext() {
      el.textContent = '\uD83D\uDD25 ' + names[i % names.length] + ' just earned ' + amounts[i % amounts.length] + ' today';
      i++;
    }
    showNext();
    setInterval(showNext, 3500);
  }

  /* INIT */
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initThemeToggle();
    initRewardBar();
    initReveal();
    initFAQ();
    initLiveCounters();
    initScarcityTimer();
    initStickyCTA();
    initExitModal();
    initLiveFeed();
    // Activate first pricing panel
    var firstTab = document.querySelector('.pricing-tab[data-seg]');
    if (firstTab) window.switchPricingSeg(firstTab.dataset.seg);
  });

})();
