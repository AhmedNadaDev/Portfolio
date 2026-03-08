import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';

const URL_SEGMENTS = [
  { text: 'www', type: 'muted' },
  { text: '.', type: 'dot' },
  { text: 'portfolio', type: 'sub' },
  { text: '.', type: 'dot' },
  { text: 'ahmednada', type: 'brand' },
  { text: '.', type: 'dot' },
  { text: 'dev', type: 'sub' },
];

const TYPE_CLASSES = {
  muted: 'text-muted-foreground/50',
  dot: 'text-muted-foreground/30',
  sub: 'text-foreground/60',
  brand: 'text-primary',
};

const ALL_CHARS = URL_SEGMENTS.flatMap((seg) =>
  seg.text.split('').map((ch) => ({ ch, type: seg.type }))
);

const BRAND_INDICES = ALL_CHARS.reduce(
  (acc, { type }, i) => (type === 'brand' ? [...acc, i] : acc),
  []
);

const IntroLoader = ({ onComplete, pageRef }) => {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const lineRef = useRef(null);
  const charRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (pageRef?.current) {
        pageRef.current.style.opacity = '';
        pageRef.current.style.transform = '';
      }
      document.body.style.overflow = '';
      onComplete?.();
      return;
    }

    document.body.style.overflow = 'hidden';

    const chars = charRefs.current.filter(Boolean);
    const brandChars = BRAND_INDICES.map((i) => chars[i]).filter(Boolean);
    const cursor = cursorRef.current;
    const overlay = overlayRef.current;
    const textWrap = textRef.current;
    const glow = glowRef.current;
    const line = lineRef.current;
    const page = pageRef?.current;

    if (!overlay || !textWrap || !cursor) return;

    gsap.set(chars, { opacity: 0, y: 14, filter: 'blur(8px)' });
    gsap.set(cursor, { opacity: 0 });
    gsap.set(glow, { opacity: 0, scale: 0.5 });
    gsap.set(line, { scaleX: 0, opacity: 0 });
    if (page) {
      gsap.set(page, { opacity: 0, scale: 0.96, transformOrigin: 'center top' });
    }

    const STAGGER = 0.042;
    const CHAR_DUR = 0.45;
    const START = 0.4;
    const count = chars.length;
    const revealed = START + count * STAGGER + 0.18;

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete?.();
      },
    });

    // --- PHASE 1: Ambient glow builds behind text ---
    tl.to(glow, {
      opacity: 0.55,
      scale: 1,
      duration: 1.6,
      ease: 'power2.out',
    }, 0.1);

    // --- PHASE 2: Character-by-character blur-in reveal ---
    tl.to(chars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: CHAR_DUR,
      stagger: STAGGER,
      ease: 'power3.out',
    }, START);

    // Accent line grows under text as chars appear
    tl.to(line, {
      scaleX: 1,
      opacity: 1,
      duration: count * STAGGER + 0.3,
      ease: 'power2.out',
    }, START + 0.2);

    // --- PHASE 3: Cursor + hold ---
    tl.to(cursor, {
      opacity: 1,
      duration: 0.1,
      ease: 'power2.out',
    }, revealed);

    // Clean on/off cursor blinks
    const blinkAt = revealed + 0.38;
    tl.set(cursor, { opacity: 0 }, blinkAt);
    tl.set(cursor, { opacity: 1 }, blinkAt + 0.2);
    tl.set(cursor, { opacity: 0 }, blinkAt + 0.4);
    tl.set(cursor, { opacity: 1 }, blinkAt + 0.6);

    // Brand characters intensify with green glow
    tl.to(brandChars, {
      textShadow:
        '0 0 18px hsl(142 76% 45% / 0.55), 0 0 42px hsl(142 76% 45% / 0.12)',
      duration: 0.55,
      ease: 'power2.inOut',
    }, revealed + 0.08);

    // --- PHASE 4: Cinematic exit ---
    const exitAt = revealed + 1.2;

    // Text zooms toward viewer with spreading + blur
    tl.to(textWrap, {
      scale: 2.4,
      opacity: 0,
      filter: 'blur(18px)',
      duration: 0.85,
      ease: 'power3.in',
    }, exitAt);

    // Accent line fades
    tl.to(line, {
      opacity: 0,
      scaleX: 1.5,
      duration: 0.5,
      ease: 'power2.in',
    }, exitAt);

    // Glow expands outward and fades
    tl.to(glow, {
      scale: 2.8,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.in',
    }, exitAt + 0.05);

    // Overlay fades out
    tl.to(overlay, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.inOut',
    }, exitAt + 0.3);

    // --- PHASE 5: Page reveals with cinematic scale-up ---
    if (page) {
      tl.to(page, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power2.out',
        clearProps: 'all',
      }, exitAt + 0.4);
    }

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete, pageRef]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: 'hsl(220, 15%, 8%)' }}
      aria-hidden="true"
    >
      {/* Ambient radial glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, hsl(142 76% 45% / 0.08) 0%, hsl(142 76% 45% / 0.02) 40%, transparent 68%)',
        }}
      />

      {/* URL text + cursor */}
      <div className="relative flex flex-col items-center gap-4">
        <div
          ref={textRef}
          className="relative font-mono font-medium text-[0.82rem] sm:text-base md:text-lg lg:text-xl xl:text-[1.38rem] tracking-[0.06em] select-none whitespace-nowrap px-5"
        >
          {ALL_CHARS.map(({ ch, type }, i) => (
            <span
              key={i}
              ref={(el) => {
                charRefs.current[i] = el;
              }}
              className={`inline-block ${TYPE_CLASSES[type]}`}
            >
              {ch}
            </span>
          ))}
          <span
            ref={cursorRef}
            className="inline-block w-[2px] bg-primary ml-[3px] rounded-full"
            style={{ height: '1.15em', verticalAlign: '-0.12em' }}
          />
        </div>

        {/* Accent underline */}
        <div
          ref={lineRef}
          className="h-px w-3/5 origin-center"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, hsl(142 76% 45% / 0.4) 50%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};

export default memo(IntroLoader);
