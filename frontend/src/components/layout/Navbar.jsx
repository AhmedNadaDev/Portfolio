import { useState, useEffect, memo } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-5 px-4 sm:px-6 transition-all duration-300">
      <div className="section-container">
        {/* Full rounded bar with top spacing */}
        <div
          className={`rounded-full transition-all duration-300 ${
            isScrolled
              ? 'glass-panel shadow-lg shadow-black/20'
              : 'bg-card/60 backdrop-blur-xl border border-border/40'
          } px-5 py-3 flex items-center justify-between`}
        >
          {/* Left: Logo only */}
          <a
            href="#hero"
            className="text-lg font-mono font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap min-w-[140px]"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
          >
            AhmedNadaDev
          </a>

          {/* Center: Nav links in rounded pill */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 rounded-full bg-secondary/60 border border-border/50 py-1.5 px-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full px-4 py-2 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Spacer for balance (same width as left) */}
          <div className="hidden md:block min-w-[140px]" aria-hidden="true" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-72 mt-3' : 'max-h-0'
          }`}
        >
          <div className="rounded-2xl glass-panel border border-border/50 flex flex-col gap-1 py-2 px-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary rounded-xl px-4 py-3 hover:bg-primary/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
