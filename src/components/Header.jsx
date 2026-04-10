import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_KEYS = ['about', 'articles', 'workWithMe', 'contact'];

const NAV_PATHS = {
  about:      '/about-us',
  articles:   '/articles',
  workWithMe: '/services',
  contact:    '/contact',
};

const LANG_LABELS = { en: 'EN', hu: 'HU', ro: 'RO' };

/** Strip locale prefix and re-add for target language */
function switchLang(path, targetLang) {
  const stripped = path.replace(/^\/(hu|ro)(\/|$)/, '/') || '/';
  if (targetLang === 'en') return stripped;
  return `/${targetLang}${stripped === '/' ? '' : stripped}`;
}

export default function Header({ lang = 'en', t }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav  = t?.nav  ?? {};
  const hdr  = t?.header ?? {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const isActive = (key) => {
    const basePath = NAV_PATHS[key];
    const localPath = lang === 'en' ? basePath : `/${lang}${basePath}`;
    if (basePath === '/') return currentPath === '/' || currentPath === `/${lang}`;
    return currentPath.includes(basePath);
  };

  const localHref = (key) => {
    const base = NAV_PATHS[key];
    return lang === 'en' ? base : `/${lang}${base}`;
  };

  const homeHref = lang === 'en' ? '/' : `/${lang}`;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(250,250,247,0.96)' : '#FAFAF7',
        borderBottom: '1px solid #E4E5E2',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'box-shadow 0.3s',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem',
        height: '62px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '1.5rem',
      }}>
        {/* Wordmark */}
        <a href={homeHref} style={{ display: 'flex', flexDirection: 'column', gap: '1px', textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '1.1875rem', fontWeight: 600, color: '#18191A', letterSpacing: '0.01em', lineHeight: 1.2 }}>
            Ferenc Csulak
          </span>
          <span style={{ fontSize: '0.625rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#2A5C34', lineHeight: 1 }}>
            {hdr.tagline || 'Energy & Leadership Advisor'}
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '0', flex: 1, justifyContent: 'center' }}>
          {NAV_KEYS.map((key) => (
            <a key={key} href={localHref(key)}
              style={{
                padding: '0.4rem 0.85rem', fontSize: '0.875rem',
                fontWeight: isActive(key) ? 500 : 400,
                color: isActive(key) ? '#2A5C34' : '#5A5D5A',
                textDecoration: 'none', borderRadius: '3px',
                transition: 'color 0.15s', whiteSpace: 'nowrap', letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => { if (!isActive(key)) e.currentTarget.style.color = '#18191A'; }}
              onMouseLeave={(e) => { if (!isActive(key)) e.currentTarget.style.color = '#5A5D5A'; }}
            >
              {nav[key] || key}
            </a>
          ))}
        </nav>

        {/* Right: lang switcher + CTA */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>

          {/* Language switcher */}
          <div style={{ display: 'flex', gap: '0.2rem' }}>
            {Object.entries(LANG_LABELS).map(([code, label]) => (
              <a
                key={code}
                href={switchLang(currentPath, code)}
                title={code.toUpperCase()}
                style={{
                  padding: '0.25rem 0.45rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  border: `1px solid ${lang === code ? '#2A5C34' : '#E4E5E2'}`,
                  borderRadius: '3px',
                  background: lang === code ? '#2A5C34' : 'transparent',
                  color: lang === code ? '#FAFAF7' : '#9B9D9B',
                  textDecoration: 'none',
                  lineHeight: 1,
                  display: 'inline-block',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (lang !== code) { e.currentTarget.style.borderColor = '#2A5C34'; e.currentTarget.style.color = '#2A5C34'; } }}
                onMouseLeave={(e) => { if (lang !== code) { e.currentTarget.style.borderColor = '#E4E5E2'; e.currentTarget.style.color = '#9B9D9B'; } }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Book CTA */}
          <a href={localHref('contact')}
            style={{
              padding: '0.5rem 1.25rem', fontSize: '0.875rem', fontWeight: 600,
              color: '#FAFAF7', backgroundColor: '#2A5C34', textDecoration: 'none',
              borderRadius: '3px', transition: 'background-color 0.2s', whiteSpace: 'nowrap', letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1A3D22')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2A5C34')}
          >
            {nav.bookACall || 'Book a Call'}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}
          className="mobile-menu-btn"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#18191A' }}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav aria-label="Mobile navigation"
          style={{
            borderTop: '1px solid #E4E5E2', backgroundColor: '#FAFAF7',
            padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.15rem',
          }}>
          {NAV_KEYS.map((key) => (
            <a key={key} href={localHref(key)} onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.7rem 0.75rem', fontSize: '1rem',
                fontWeight: isActive(key) ? 500 : 400,
                color: isActive(key) ? '#2A5C34' : '#18191A',
                textDecoration: 'none', borderRadius: '3px',
                backgroundColor: isActive(key) ? '#F3F4F1' : 'transparent',
              }}>
              {nav[key] || key}
            </a>
          ))}
          <a href={localHref('contact')} onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '0.75rem', padding: '0.75rem', fontSize: '0.9375rem', fontWeight: 600,
              color: '#FAFAF7', backgroundColor: '#2A5C34', textDecoration: 'none',
              borderRadius: '3px', textAlign: 'center',
            }}>
            {nav.bookACall || 'Book a Call'}
          </a>
          {/* Mobile lang switcher */}
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #E4E5E2' }}>
            {Object.entries(LANG_LABELS).map(([code, label]) => (
              <a key={code} href={switchLang(currentPath, code)}
                style={{
                  padding: '0.3rem 0.6rem', fontSize: '0.75rem', fontWeight: 700,
                  letterSpacing: '0.05em',
                  border: `1px solid ${lang === code ? '#2A5C34' : '#E4E5E2'}`,
                  borderRadius: '3px',
                  background: lang === code ? '#2A5C34' : 'transparent',
                  color: lang === code ? '#FAFAF7' : '#9B9D9B',
                  textDecoration: 'none',
                }}>
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
