import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/about-us',  label: 'About' },
  { href: '/articles',  label: 'Articles' },
  { href: '/services',  label: 'Work With Me' },
  { href: '/contact',   label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        backgroundColor: scrolled ? 'rgba(250,250,247,0.96)' : '#FAFAF7',
        borderBottom: '1px solid #E4E5E2',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'box-shadow 0.3s',
        boxShadow: scrolled ? '0 1px 16px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1160px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '62px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Wordmark */}
        <a
          href="/"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: '1.1875rem',
              fontWeight: 600,
              color: '#18191A',
              letterSpacing: '0.01em',
              lineHeight: 1.2,
            }}
          >
            Ferenc Csulak
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#2A5C34',
              lineHeight: 1,
            }}
          >
            Energy &amp; Leadership Advisor
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                padding: '0.4rem 0.85rem',
                fontSize: '0.875rem',
                fontWeight: isActive(href) ? 500 : 400,
                color: isActive(href) ? '#2A5C34' : '#5A5D5A',
                textDecoration: 'none',
                borderRadius: '3px',
                transition: 'color 0.15s',
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                if (!isActive(href)) e.currentTarget.style.color = '#18191A';
              }}
              onMouseLeave={(e) => {
                if (!isActive(href)) e.currentTarget.style.color = '#5A5D5A';
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
        >
          <a
            href="/contact"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#FAFAF7',
              backgroundColor: '#2A5C34',
              textDecoration: 'none',
              borderRadius: '3px',
              transition: 'background-color 0.2s',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1A3D22')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2A5C34')}
          >
            Book a Call
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
            color: '#18191A',
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            borderTop: '1px solid #E4E5E2',
            backgroundColor: '#FAFAF7',
            padding: '1rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.15rem',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.7rem 0.75rem',
                fontSize: '1rem',
                fontWeight: isActive(href) ? 500 : 400,
                color: isActive(href) ? '#2A5C34' : '#18191A',
                textDecoration: 'none',
                borderRadius: '3px',
                backgroundColor: isActive(href) ? '#F3F4F1' : 'transparent',
              }}
            >
              {label}
            </a>
          ))}

          <a
            href="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '0.75rem',
              padding: '0.75rem',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: '#FAFAF7',
              backgroundColor: '#2A5C34',
              textDecoration: 'none',
              borderRadius: '3px',
              textAlign: 'center',
            }}
          >
            Book a Call
          </a>
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
