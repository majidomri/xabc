/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./*.html', './assets/js/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'SF Pro Text', 'BlinkMacSystemFont', '"Segoe UI"', 'system-ui', 'sans-serif'],
        display: ['-apple-system', 'SF Pro Display', 'BlinkMacSystemFont', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: { DEFAULT: '#00C896', dim: '#00A67E', light: '#34EBB8' },
        xdark: { bg: '#0A0A0A', surface: '#111111', card: '#1A1A1A', border: '#2A2A2A', muted: '#888888', text: '#F5F5F5' },
        xlight: { bg: '#FFFFFF', surface: '#F7F7F7', card: '#EEEEEE', border: '#DDDDDD', muted: '#666666', text: '#111111' },
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, #00C896 0%, #34EBB8 100%)',
        'grad-warm':  'linear-gradient(135deg, #00C896 0%, #00E5FF 100%)',
        'grad-gold':  'linear-gradient(135deg, #F7C948 0%, #F4A623 100%)',
        'grad-hero':  'linear-gradient(135deg, #FFFFFF 0%, #00C896 50%, #00DBA8 100%)',
      },
      animation: {
        'fade-in':    'fadeIn .4s ease both',
        'slide-up':   'slideUp .5s ease both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  safelist: [
    'hero-title','section-title','section-label','section-sub',
    'feature-card','feature-icon','feature-stat',
    'pricing-card','pricing-badge','price-amount','price-period','price-feature',
    'sim-card','sim-input','sim-result','sim-result__amount','sim-result__note',
    'testi-card','testi-stars','testi-text','testi-author','testi-avatar',
    'stat-card','stat-number','stat-label',
    'grad-text','grad-green','grad-warm','grad-gold',
    'hero-badge','persona-btn','live-feed-bar',
    'faq-a','faq-icon','xcard',
    'reveal','reveal visible',
    'xnav__inner','xnav__mobile',
  ],
  plugins: [],
};

