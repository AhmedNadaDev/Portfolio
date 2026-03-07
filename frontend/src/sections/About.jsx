import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code2, Calendar } from 'lucide-react';
import Lanyard from './Lanyard';

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
    <div className="relative flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-transparent px-4 py-5 sm:px-5 sm:py-6 text-center group hover:border-primary/40 transition-all duration-500">
      <div className="mb-3 inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary w-10 h-10 sm:w-11 sm:h-11 group-hover:scale-110 group-hover:bg-primary/10 transition-transform duration-300">
        {icon}
      </div>
      <span
        ref={valueRef}
        className="block text-2xl sm:text-3xl font-semibold text-foreground mb-1"
      >
        0
      </span>
      <span className="text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  );
});

StatCard.displayName = 'StatCard';

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { x: 50 },
        {
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <Award size={24} />, value: 12, label: 'Certifications', suffix: '+' },
    { icon: <Code2 size={24} />, value: 25, label: 'Skills', suffix: '+' },
    { icon: <Calendar size={24} />, value: 5, label: 'Years Experience', suffix: '+' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Lanyard 3D card */}
          <div
            ref={imageRef}
            className="relative order-2 lg:order-1 w-full max-w-xs sm:max-w-md mx-auto"
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border-2 border-primary/20 bg-card/30 aspect-[3/4] sm:aspect-square"
            >
              <Lanyard
                position={[0, 0, 4.8]}
                gravity={[0, -40, 0]}
                fov={45}
                transparent={true}
              />
            </div>
          </div>
          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <span className="text-primary font-mono text-sm mb-4 block">
              {'// About Me'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Passionate about building{' '}
              <span className="text-gradient">digital solutions</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
             <p>ahmed</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
            {/* Scroll Indicator */}
          {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            
            <span className="text-xs text-muted-foreground">
              Scroll
            </span>

            <div className="w-20 h-10 rounded-full border-2 border-muted-foreground/30 flex items-center px-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-[slideX_1.5s_infinite]" />
            </div>

          </div> */}
    </section>
  );
};

export default memo(About);
