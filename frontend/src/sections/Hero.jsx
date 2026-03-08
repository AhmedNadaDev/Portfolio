import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CodeLine = ({ num, children, indent = 0 }) => (
  <div className="flex">
    <span className="w-6 text-right text-muted-foreground/20 select-none mr-5 text-[12px] leading-relaxed">
      {num}
    </span>
    <span style={{ paddingLeft: `${indent * 16}px` }}>{children}</span>
  </div>
);

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const codeCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.45'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        )
        .fromTo(
          socialsRef.current,
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.5 },
          '-=0.15'
        );

      // Code card float
      if (codeCardRef.current) {
        gsap.set(codeCardRef.current, { opacity: 0, y: 20 });
        tl.to(
          codeCardRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.4'
        );

        gsap.to(codeCardRef.current, {
          y: -10,
          duration: 3.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.5,
        });
      }

      // Parallax orbs
      gsap.to(orb1Ref.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(orb2Ref.current, {
        y: -60,
        x: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPortfolio = () => {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                           linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient Orbs */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] will-change-transform"
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] will-change-transform"
      />

      {/* Decorative side accent */}
      <div className="hidden xl:block absolute left-[3%] top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
          {/* ── Left: Text content ── */}
          <div className="flex-1 min-w-0">
            {/* Premium Status Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/[0.06] backdrop-blur-sm mb-10"
              style={{
                boxShadow:
                  '0 0 24px hsl(142 76% 45% / 0.08), inset 0 1px 0 hsl(142 76% 45% / 0.1)',
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="text-sm text-primary font-medium tracking-wide">
                Available for opportunities
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[4rem] font-bold leading-[1.08] mb-8 tracking-tight"
            >
              Hi, I&apos;m{' '}
              <span className="text-gradient">Ahmed Nada</span>
              <br />
              <span className="text-foreground/80">Full Stack Developer</span>
            </h1>

            <div ref={subtitleRef} className="max-w-xl mb-12 space-y-4">
              <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed">
                Built with a blend of creativity and powerful technologies.
              </p>
              <p className="text-[0.9rem] sm:text-base text-muted-foreground leading-relaxed">
                Specialized in the MERN stack, building scalable, high-performance
                web applications with clean architecture and modern UI.
              </p>
            </div>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-14">
              <button onClick={scrollToContact} className="btn-primary group">
                Let&apos;s Talk
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
              <button onClick={scrollToPortfolio} className="btn-outline">
                View My Work
              </button>
            </div>

            <div ref={socialsRef} className="flex items-center gap-5">
              <span className="text-xs uppercase tracking-widest text-muted-foreground/60 font-medium">
                Connect
              </span>
              <div className="w-8 h-px bg-border/60" />
              <div className="flex gap-3">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: '#contact', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm text-muted-foreground
                             hover:text-primary hover:border-primary/40 hover:bg-primary/[0.06]
                             transition-all duration-300"
                    style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.03)' }}
                    aria-label={label}
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Code editor card ── */}
          <div className="hidden lg:block flex-shrink-0" ref={codeCardRef}>
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-primary/[0.06] rounded-full blur-[80px] pointer-events-none" />

              {/* Depth card behind */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-border/10 bg-card/10 pointer-events-none"
                style={{ transform: 'rotate(2deg)' }}
              />

              {/* Main code card */}
              <div
                className="relative w-[340px] xl:w-[400px] rounded-2xl border border-border/40 bg-card/80 backdrop-blur-md overflow-hidden"
                style={{
                  boxShadow:
                    '0 25px 50px -12px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.04)',
                }}
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-[11px] text-muted-foreground/40 font-mono">
                      App.jsx
                    </span>
                  </div>
                  <div className="w-[52px]" />
                </div>

                {/* Code content */}
                <div className="p-4 xl:p-5 font-mono text-[13px] leading-[1.7] select-none">
                  <CodeLine num={1}>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-sky-400">Developer</span>{' '}
                    <span className="text-foreground/40">= () =&gt; (</span>
                  </CodeLine>

                  <CodeLine num={2} indent={1}>
                    <span className="text-foreground/30">&lt;</span>
                    <span className="text-primary">World</span>
                    <span className="text-foreground/30">&gt;</span>
                  </CodeLine>

                  <CodeLine num={3} indent={2}>
                    <span className="text-foreground/30">&lt;</span>
                    <span className="text-primary">Code</span>
                  </CodeLine>

                  <CodeLine num={4} indent={3}>
                    <span className="text-sky-400">passion</span>
                    <span className="text-foreground/40">=</span>
                    <span className="text-amber-400">{'{'}</span>
                    <span className="text-orange-300">true</span>
                    <span className="text-amber-400">{'}'}</span>
                  </CodeLine>

                  <CodeLine num={5} indent={3}>
                    <span className="text-sky-400">stack</span>
                    <span className="text-foreground/40">=</span>
                    <span className="text-amber-400">{'{'}</span>
                    <span className="text-foreground/30">[</span>
                    <span className="text-emerald-400">&quot;React&quot;</span>
                    <span className="text-foreground/30">, </span>
                    <span className="text-emerald-400">&quot;Node&quot;</span>
                    <span className="text-foreground/30">]</span>
                    <span className="text-amber-400">{'}'}</span>
                  </CodeLine>

                  <CodeLine num={6} indent={2}>
                    <span className="text-foreground/30">/&gt;</span>
                  </CodeLine>

                  <CodeLine num={7} indent={2}>
                    <span className="text-foreground/30">&lt;</span>
                    <span className="text-primary">Design</span>{' '}
                    <span className="text-sky-400">quality</span>
                    <span className="text-foreground/40">=</span>
                    <span className="text-emerald-400">&quot;premium&quot;</span>
                    <span className="text-foreground/30"> /&gt;</span>
                  </CodeLine>

                  <CodeLine num={8} indent={2}>
                    <span className="text-foreground/30">&lt;</span>
                    <span className="text-primary">Build</span>{' '}
                    <span className="text-sky-400">deploy</span>
                    <span className="text-foreground/40">=</span>
                    <span className="text-amber-400">{'{'}</span>
                    <span className="text-orange-300">true</span>
                    <span className="text-amber-400">{'}'}</span>
                    <span className="text-foreground/30"> /&gt;</span>
                  </CodeLine>

                  <CodeLine num={9} indent={1}>
                    <span className="text-foreground/30">&lt;/</span>
                    <span className="text-primary">World</span>
                    <span className="text-foreground/30">&gt;</span>
                  </CodeLine>

                  <CodeLine num={10}>
                    <span className="text-foreground/40">);</span>
                  </CodeLine>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50 font-medium">
          Scroll
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/15 flex justify-center pt-2">
          <div className="w-1 h-1.5 bg-primary/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
