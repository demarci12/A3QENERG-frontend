import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about-us', label: 'About Us' },
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact Us' },
];

const LANGUAGES = [
  { code: 'en', label: 'EN', title: 'English' },
  { code: 'ro', label: 'RO', title: 'Romanian' },
  { code: 'hu', label: 'HU', title: 'Hungarian' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLang, setActiveLang] = useState('en');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  const currentPath =
    typeof window !== 'undefined' ? window.location.pathname : '';

  const isActive = (href) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(249,249,248,0.97)' : '#f9f9f8',
        borderBottom: '1px solid #e7e8e7',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'background-color 0.3s, box-shadow 0.3s',
        boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Brand wordmark */}
        <a
          href="/"
          style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: '1.375rem',
            fontWeight: 700,
            color: '#173b1e',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            flexShrink: 0,
          }}
        >
          A3QENERG
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.125rem',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                padding: '0.4rem 0.7rem',
                fontSize: '0.875rem',
                fontWeight: isActive(href) ? 600 : 400,
                color: isActive(href) ? '#2E5233' : '#3d3f3d',
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'color 0.2s, background-color 0.2s',
                backgroundColor: isActive(href) ? '#e7e8e7' : 'transparent',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive(href)) e.currentTarget.style.color = '#2E5233';
              }}
              onMouseLeave={(e) => {
                if (!isActive(href)) e.currentTarget.style.color = '#3d3f3d';
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right side: lang switcher + CTA */}
        <div
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
        >
          {/* Language switcher */}
          <div style={{ display: 'flex', gap: '0.2rem' }}>
            {LANGUAGES.map(({ code, label, title }) => (
              <button
                key={code}
                title={title}
                onClick={() => setActiveLang(code)}
                style={{
                  padding: '0.25rem 0.45rem',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  border: `1px solid ${activeLang === code ? '#2E5233' : '#e7e8e7'}`,
                  borderRadius: '3px',
                  background: activeLang === code ? '#2E5233' : 'transparent',
                  color: activeLang === code ? '#f9f9f8' : '#c8cac8',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  lineHeight: 1,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Book CTA */}
          <a
            href="/contact"
            style={{
              padding: '0.45rem 1.1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#f9f9f8',
              backgroundColor: '#2E5233',
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
              whiteSpace: 'nowrap',
              marginLeft: '0.25rem',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#173b1e')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2E5233')}
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="mobile-menu-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#173b1e',
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            borderTop: '1px solid #e7e8e7',
            backgroundColor: '#f9f9f8',
            padding: '1rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.65rem 0.75rem',
                fontSize: '1rem',
                fontWeight: isActive(href) ? 600 : 400,
                color: isActive(href) ? '#2E5233' : '#3d3f3d',
                textDecoration: 'none',
                borderRadius: '4px',
                backgroundColor: isActive(href) ? '#e7e8e7' : 'transparent',
              }}
            >
              {label}
            </a>
          ))}

          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '0.5rem',
              padding: '0.65rem 0.75rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#f9f9f8',
              backgroundColor: '#2E5233',
              textDecoration: 'none',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            Book Consultation
          </a>

          {/* Language switcher in mobile */}
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e7e8e7' }}>
            {LANGUAGES.map(({ code, label, title }) => (
              <button
                key={code}
                title={title}
                onClick={() => setActiveLang(code)}
                style={{
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  border: `1px solid ${activeLang === code ? '#2E5233' : '#e7e8e7'}`,
                  borderRadius: '3px',
                  background: activeLang === code ? '#2E5233' : 'transparent',
                  color: activeLang === code ? '#f9f9f8' : '#c8cac8',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
