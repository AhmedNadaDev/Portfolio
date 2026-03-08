import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code2, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const StatCard = memo(({ icon, value, label, suffix = '' }) => {
  const valueRef = useRef(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;

    const animation = gsap.to(countRef.current, {
      value,
      duration: 2,
      ease: 'power2.out',
      paused: true,
      onUpdate: () => {
        element.textContent = Math.round(countRef.current.value).toString() + suffix;
      },
    });

    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      onEnter: () => animation.play(),
    });

    return () => {
      animation.kill();
    };
  }, [value, suffix]);

  return (
    <div className="group relative overflow-hidden flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm px-5 py-8 sm:px-6 sm:py-10 text-center transition-all duration-500 hover:border-primary/25 hover:bg-card/40 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.08)]">
      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Ambient hover glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative mb-5 inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.07] text-primary w-14 h-14 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-400">
        {icon}
      </div>
      <span
        ref={valueRef}
        className="relative block text-3xl sm:text-4xl font-bold text-foreground mb-2.5 font-mono tracking-tight"
      >
        0
      </span>
      <span className="relative text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/80">
        {label}
      </span>
    </div>
  );
});

StatCard.displayName = 'StatCard';

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const portraitRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        portraitRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 88%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <Award size={22} />, value: 12, label: 'Certifications', suffix: '+' },
    { icon: <Code2 size={22} />, value: 25, label: 'Skills', suffix: '+' },
    { icon: <Calendar size={22} />, value: 5, label: 'Years Experience', suffix: '+' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-28 lg:py-36 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Profile portrait */}
          <div
            ref={portraitRef}
            className="relative order-2 lg:order-1 flex items-center justify-center"
          >
            <div className="relative">
              {/* Ambient glow */}
              <div className="absolute inset-0 rounded-full bg-primary/[0.07] blur-[60px] scale-[1.4] pointer-events-none" />

              {/* Decorative outer ring */}
              <div className="absolute -inset-5 sm:-inset-6 rounded-full border border-dashed border-primary/[0.08] pointer-events-none" />

              {/* Gradient border ring */}
              <div
                className="relative p-[3px] rounded-full bg-gradient-to-br from-primary/40 via-primary/10 to-primary/35"
                style={{
                  boxShadow:
                    '0 0 50px hsl(142 76% 45% / 0.1), 0 0 100px hsl(142 76% 45% / 0.04)',
                }}
              >
                {/* Inner gap ring */}
                <div className="p-[3px] rounded-full bg-background">
                  <img
                    src="/lanyard/lanyard.png"
                    alt="Ahmed Nada — Full Stack Developer"
                    width={280}
                    height={280}
                    className="w-52 h-52 sm:w-64 sm:h-64 lg:w-[280px] lg:h-[280px] rounded-full object-cover"
                    style={{
                      boxShadow:
                        '0 20px 50px -10px hsl(0 0% 0% / 0.35), inset 0 0 0 1px hsl(0 0% 100% / 0.03)',
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Decorative accent dots */}
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/25" />
              <div className="absolute bottom-6 left-1 w-1.5 h-1.5 rounded-full bg-primary/15" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <span className="section-label">
              {'// About Me'}
            </span>
            <h2 className="section-heading">
              Passionate about building{' '}
              <span className="text-gradient">digital solutions</span>
            </h2>
            <div className="space-y-5 leading-relaxed">
              <p className="text-foreground/70 text-[0.95rem] sm:text-base">
                I&apos;m Ahmed Nada, a Full Stack Developer with a deep passion for
                crafting scalable, performant web applications. Specializing in the
                MERN stack, I bring ideas to life with clean architecture, intuitive
                interfaces, and robust backends.
              </p>
              <p className="text-muted-foreground text-[0.9rem] sm:text-[0.95rem]">
                From pixel-perfect frontends to well-structured APIs, I focus on
                delivering solutions that are not only functional but also
                delightful to use. I&apos;m always exploring new technologies and
                pushing the boundaries of what&apos;s possible on the web.
              </p>
            </div>
          </div>
        </div>

        {/* Visual separator */}
        <div className="divider-gradient my-16 lg:my-20" />

        {/* Stats Grid */}
        <div ref={statsRef} className="grid sm:grid-cols-3 gap-5 sm:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(About);
