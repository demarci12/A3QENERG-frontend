import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about-us', label: 'About Us' },
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change / resize
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
        backgroundColor: scrolled ? 'rgba(249,249,248,0.96)' : '#f9f9f8',
        borderBottom: '1px solid #e7e8e7',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                padding: '0.4rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: isActive(href) ? 600 : 400,
                color: isActive(href) ? '#2E5233' : '#3d3f3d',
                textDecoration: 'none',
                borderRadius: '4px',
                transition: 'color 0.2s, background-color 0.2s',
                backgroundColor: isActive(href) ? '#e7e8e7' : 'transparent',
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

          <a
            href="/contact"
            style={{
              marginLeft: '0.75rem',
              padding: '0.45rem 1.1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#f9f9f8',
              backgroundColor: '#2E5233',
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#173b1e')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2E5233')}
          >
            Book Consultation
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#173b1e',
          }}
          className="mobile-menu-btn"
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
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
