import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#contact', label: 'Email' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  const overlayRef = useRef(null);
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const menuItemsRef = useRef([]);
  const menuBottomRef = useRef(null);
  const tlRef = useRef(null);

  // Let GSAP own the panel/backdrop/overlay state from mount
  useEffect(() => {
    gsap.set(panelRef.current, { xPercent: 100 });
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(overlayRef.current, { visibility: 'hidden' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection('#' + visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const resetMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
    gsap.set(overlayRef.current, { visibility: 'hidden' });
    gsap.set(panelRef.current, { xPercent: 100 });
    gsap.set(backdropRef.current, { opacity: 0 });
    menuItemsRef.current.filter(Boolean).forEach((el) => gsap.set(el, { clearProps: 'all' }));
    if (menuBottomRef.current) gsap.set(menuBottomRef.current, { clearProps: 'all' });
    tlRef.current = null;
  }, []);

  const openMenu = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();

    setIsMobileMenuOpen(true);
    document.body.style.overflow = 'hidden';

    const items = menuItemsRef.current.filter(Boolean);

    tlRef.current = gsap.timeline()
      .set(overlayRef.current, { visibility: 'visible' })
      .fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo(
        panelRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        items,
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.055, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        menuBottomRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
        '-=0.15'
      );
  }, []);

  const closeMenu = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();

    const items = menuItemsRef.current.filter(Boolean);

    tlRef.current = gsap.timeline({ onComplete: resetMenu })
      .to(items, {
        opacity: 0,
        duration: 0.15,
        stagger: 0.02,
        ease: 'power2.in',
      })
      .to(menuBottomRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: 'power2.in',
      }, '-=0.08')
      .to(panelRef.current, {
        xPercent: 100,
        duration: 0.45,
        ease: 'power3.inOut',
      }, '-=0.05')
      .to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      }, '-=0.3');
  }, [resetMenu]);

  const handleMobileNavClick = useCallback((href) => {
    if (tlRef.current) tlRef.current.kill();

    const items = menuItemsRef.current.filter(Boolean);

    tlRef.current = gsap.timeline({
      onComplete: () => {
        resetMenu();
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      },
    })
      .to(items, {
        opacity: 0,
        duration: 0.12,
        stagger: 0.02,
        ease: 'power2.in',
      })
      .to(panelRef.current, {
        xPercent: 100,
        duration: 0.4,
        ease: 'power3.inOut',
      }, '-=0.02')
      .to(backdropRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      }, '-=0.25');
  }, [resetMenu]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) closeMenu();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isMobileMenuOpen, closeMenu]);

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        if (tlRef.current) tlRef.current.kill();
        resetMenu();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen, resetMenu]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (tlRef.current) tlRef.current.kill();
      document.body.style.overflow = '';
    };
  }, []);

  const handleNavClick = useCallback((href) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 transition-all duration-500">
        <div className="section-container">
          <div
            className={`rounded-2xl transition-all duration-500 ${
              isScrolled
                ? 'glass-panel shadow-lg shadow-black/20 border-border/40'
                : 'bg-card/40 backdrop-blur-xl border border-border/25'
            } px-5 py-3 flex items-center justify-between`}
            style={isScrolled ? undefined : { boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03)' }}
          >
            <a
              href="#hero"
              className="text-lg font-mono font-bold text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap min-w-[140px]"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
            >
              {'<'}
              <span className="text-primary">Ahmed</span>
              {'Nada />'}
            </a>

            <div
              className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 rounded-2xl bg-card/40 backdrop-blur-md border border-border/30 py-1.5 px-2"
              style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)' }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`text-sm font-medium rounded-xl px-4 py-2 transition-all duration-300 ${
                    activeSection === link.href
                      ? 'text-primary bg-primary/[0.12]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                  }`}
                  style={
                    activeSection === link.href
                      ? {
                          boxShadow:
                            '0 1px 8px hsl(142 76% 45% / 0.15), inset 0 1px 0 hsl(142 76% 45% / 0.1)',
                        }
                      : undefined
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block min-w-[140px]" aria-hidden="true" />

            <button
              onClick={isMobileMenuOpen ? closeMenu : openMenu}
              className="md:hidden p-2.5 rounded-xl text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Side-drawer mobile menu ── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[60] md:hidden"
        style={{ visibility: 'hidden' }}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop — click to close */}
        <div
          ref={backdropRef}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />

        {/* Side panel */}
        <div
          ref={panelRef}
          className="absolute top-0 right-0 bottom-0 w-[82vw] max-w-[380px] border-l border-border/15 overflow-y-auto overscroll-contain"
          style={{
            background:
              'linear-gradient(195deg, hsl(220 15% 10%) 0%, hsl(220 15% 8%) 60%, hsl(220 18% 7%) 100%)',
          }}
        >
          {/* Ambient orb */}
          <div className="absolute bottom-1/3 left-1/4 w-[200px] h-[200px] bg-primary/[0.04] rounded-full blur-[80px] pointer-events-none" />

          {/* Panel content */}
          <div className="relative flex flex-col min-h-full px-7 sm:px-8">
            {/* Top bar */}
            <div className="flex items-center justify-between pt-6 pb-5">
              <span className="text-lg font-mono font-bold text-foreground">
                {'<'}
                <span className="text-primary">Ahmed</span>
                {'Nada />'}
              </span>
              <button
                onClick={closeMenu}
                className="p-2.5 rounded-xl text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-gradient-to-r from-border/30 via-border/15 to-transparent mb-6" />

            {/* Nav links */}
            <div className="flex-1 flex flex-col justify-center gap-1 py-8">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  ref={(el) => { menuItemsRef.current[i] = el; }}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileNavClick(link.href);
                  }}
                  className="group flex items-center gap-4 py-5 border-b border-border/10 last:border-b-0 transition-colors duration-300"
                >
                  <span className="text-sm font-mono text-primary/30 group-hover:text-primary/60 transition-colors duration-300 w-6 text-right">
                    0{i + 1}
                  </span>
                  <span
                    className={`text-[1.6rem] sm:text-[1.75rem] font-bold tracking-tight transition-colors duration-300 ${
                      activeSection === link.href
                        ? 'text-primary'
                        : 'text-foreground/80 group-hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </span>
                  {activeSection === link.href && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(142_76%_45%/0.4)]" />
                  )}
                </a>
              ))}
            </div>

            {/* Bottom section */}
            <div ref={menuBottomRef} className="pb-10 mt-auto">
              <div className="h-px w-full bg-gradient-to-r from-border/30 via-border/15 to-transparent mb-6" />
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="p-3 rounded-xl border border-border/25 bg-card/20 text-muted-foreground/50 hover:text-primary hover:border-primary/30 hover:bg-primary/[0.06] transition-all duration-300"
                      aria-label={label}
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground/25 font-mono tracking-wider">
                  &copy; {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
