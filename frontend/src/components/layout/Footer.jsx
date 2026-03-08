import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerNav = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const Footer = () => {
  const contentRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 95%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-16 pb-10">
      {/* Gradient divider */}
      <div className="divider-gradient mb-12" />

      <div ref={contentRef} className="section-container">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="text-xl font-mono font-bold text-foreground hover:text-primary transition-colors duration-300 group"
          >
            {'<'}
            <span className="text-primary group-hover:text-foreground transition-colors duration-300">
              Ahmed
            </span>
            {'Nada />'}
          </button>

          {/* Navigation links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {footerNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm text-muted-foreground/60 hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-2.5 rounded-xl border border-border/40 bg-card/30 text-muted-foreground/60 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03)' }}
                aria-label={label}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>

          

          
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
