import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Folder, Eye, ExternalLink } from 'lucide-react';
import { OrbitingCircles } from '@/registry/magicui/orbiting-circles';
import * as Tooltip from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';
import CircularGallery from '@/components/CircularGallery';

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaLinux,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiPostman,
  SiPython,
  SiJavascript,
  SiThreedotjs,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: 'skills', label: 'Skills', icon: <Code2 size={16} /> },
  { id: 'projects', label: 'Projects', icon: <Folder size={16} /> },
];

export const SkillIcons = {
  react: FaReact,
  tailwind: SiTailwindcss,
  three: SiThreedotjs,
  javascript: SiJavascript,
  html: FaHtml5,
  css: FaCss3Alt,
  node: FaNodeJs,
  express: SiExpress,
  python: SiPython,
  mongodb: SiMongodb,
  firebase: SiFirebase,
  docker: FaDocker,
  aws: FaAws,
  linux: FaLinux,
  git: FaGitAlt,
  github: FaGithub,
  vscode: VscVscode,
  postman: SiPostman,
};

const OrbitSkill = ({ label, children }) => {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(true);
  };

  const hideLater = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(false);
    }, 5000);
  };

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <Tooltip.Root open={active}>
      <Tooltip.Trigger
        asChild
        onPointerEnter={show}
        onPointerLeave={hideLater}
        onFocus={show}
        onBlur={hideLater}
      >
        <span
          aria-label={label}
          className={cn(
            'flex size-full items-center justify-center rounded-full border border-border/60 bg-secondary/40 p-2 text-foreground/80 shadow-sm ring-1 ring-white/[0.03] backdrop-blur-md transition-all duration-300',
            active &&
              'border-primary/50 bg-secondary/60 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)]'
          )}
        >
          {children}
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={10}
          className="z-[9999] select-none rounded-lg border border-border/50 bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-xl backdrop-blur-md"
        >
          {label}
          <Tooltip.Arrow className="fill-background" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};

const projectGalleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=75',
    text: 'E-Commerce Platform',
  },
  {
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&q=75',
    text: 'Task Management App',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=75',
    text: 'Analytics Dashboard',
  },
  {
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c2cc?w=600&h=400&fit=crop&q=75',
    text: 'Social Media API',
  },
];

const SkillsContent = memo(() => (
  <Tooltip.Provider delayDuration={80} skipDelayDuration={0}>
    <div className="relative flex h-[580px] w-full items-center justify-center overflow-hidden stagger-item">
      {/* Center label */}
      <div className="absolute z-10 flex flex-col items-center gap-1.5 pointer-events-none select-none">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
          Tech Stack
        </span>
        <div className="w-8 h-px bg-primary/20" />
      </div>

      <OrbitingCircles iconSize={64} radius={110} speed={0.8}>
        <OrbitSkill label="React">
          <SkillIcons.react className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="Tailwind CSS">
          <SkillIcons.tailwind className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="JavaScript">
          <SkillIcons.javascript className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="HTML5">
          <SkillIcons.html className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="CSS3">
          <SkillIcons.css className="size-full" />
        </OrbitSkill>
      </OrbitingCircles>

      <OrbitingCircles iconSize={56} radius={175} reverse speed={1.4}>
        <OrbitSkill label="Node.js">
          <SkillIcons.node className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="Express.js">
          <SkillIcons.express className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="Python">
          <SkillIcons.python className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="MongoDB">
          <SkillIcons.mongodb className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="Firebase">
          <SkillIcons.firebase className="size-full" />
        </OrbitSkill>
      </OrbitingCircles>

      <OrbitingCircles iconSize={48} radius={250} speed={2.2}>
        <OrbitSkill label="Git">
          <SkillIcons.git className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="GitHub">
          <SkillIcons.github className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="Docker">
          <SkillIcons.docker className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="AWS">
          <SkillIcons.aws className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="Linux">
          <SkillIcons.linux className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="VS Code">
          <SkillIcons.vscode className="size-full" />
        </OrbitSkill>
        <OrbitSkill label="Postman">
          <SkillIcons.postman className="size-full" />
        </OrbitSkill>
      </OrbitingCircles>
    </div>
  </Tooltip.Provider>
));
SkillsContent.displayName = 'SkillsContent';

const ProjectsContent = memo(() => {
  const overlayRef = useRef(null);
  const borderRef = useRef(null);
  const topLabelRef = useRef(null);
  const bottomLabelRef = useRef(null);
  const separatorRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  const handleSettle = useCallback((settled) => {
    if (tlRef.current) tlRef.current.kill();

    if (settled) {
      tlRef.current = gsap.timeline()
        .fromTo(
          borderRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        .fromTo(
          overlayRef.current,
          { clipPath: 'inset(0% 100% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power3.inOut' },
          0
        )
        .fromTo(
          separatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' },
          0.25
        )
        .fromTo(
          topLabelRef.current,
          { opacity: 0, x: -6, y: -6 },
          { opacity: 1, x: 0, y: 0, duration: 0.3, ease: 'power3.out' },
          0.25
        )
        .fromTo(
          bottomLabelRef.current,
          { opacity: 0, x: 6, y: 6 },
          { opacity: 1, x: 0, y: 0, duration: 0.3, ease: 'power3.out' },
          0.2
        );
    } else {
      tlRef.current = gsap.timeline()
        .to(
          [topLabelRef.current, bottomLabelRef.current, separatorRef.current],
          { opacity: 0, duration: 0.12, ease: 'power2.in' }
        )
        .to(
          overlayRef.current,
          { clipPath: 'inset(0% 100% 100% 0%)', duration: 0.25, ease: 'power3.in' },
          '-=0.04'
        )
        .to(
          borderRef.current,
          { opacity: 0, duration: 0.15, ease: 'power2.in' },
          '-=0.2'
        );
    }
  }, []);

  return (
    <div className="stagger-item">
      <div
        className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden border border-border/30"
        style={{
          boxShadow:
            '0 25px 50px -12px hsl(0 0% 0% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.03)',
        }}
      >
        <CircularGallery
          items={projectGalleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.08}
          font="bold 26px JetBrains Mono, monospace"
          scrollSpeed={2}
          scrollEase={0.06}
          onSettle={handleSettle}
        />

        {/* Center card overlay frame */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div
            className="relative pointer-events-auto
                       w-[196px] h-[252px]
                       sm:w-[224px] sm:h-[288px]
                       lg:w-[243px] lg:h-[312px]"
          >
            {/* Premium border + glow */}
            <div
              ref={borderRef}
              className="absolute -inset-px pointer-events-none"
              style={{
                opacity: 0,
                borderRadius: '8%',
                border: '1.5px solid hsl(142 76% 45% / 0.35)',
                boxShadow:
                  '0 0 24px hsl(142 76% 45% / 0.1), 0 0 48px hsl(142 76% 45% / 0.04), inset 0 0 16px hsl(142 76% 45% / 0.03)',
              }}
            />

            {/* Diagonal action split — revealed via clip-path */}
            <div
              ref={overlayRef}
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: '8%',
                clipPath: 'inset(0% 100% 100% 0%)',
              }}
            >
              {/* Dimming surface */}
              <div className="absolute inset-0 bg-black/55" />

              {/* Top-left triangle — View Details */}
              <a
                href="#portfolio"
                className="group/details absolute inset-0"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                onClick={(e) => e.preventDefault()}
              >
                <div className="absolute inset-0 hover:bg-white/[0.06] transition-colors duration-300" />
                <div
                  ref={topLabelRef}
                  className="absolute top-[26%] left-[12%] flex items-center gap-1.5 sm:gap-2"
                  style={{ opacity: 0 }}
                >
                  <Eye
                    size={13}
                    className="text-white/70 group-hover/details:text-primary transition-colors duration-300"
                  />
                  <span className="text-white/80 text-[11px] sm:text-xs font-semibold tracking-wide group-hover/details:text-white transition-colors duration-300">
                    View Details
                  </span>
                </div>
              </a>

              {/* Bottom-right triangle — Visit Now */}
              <a
                href="#"
                className="group/visit absolute inset-0"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
                onClick={(e) => e.preventDefault()}
              >
                <div className="absolute inset-0 hover:bg-white/[0.06] transition-colors duration-300" />
                <div
                  ref={bottomLabelRef}
                  className="absolute bottom-[26%] right-[12%] flex items-center gap-1.5 sm:gap-2"
                  style={{ opacity: 0 }}
                >
                  <span className="text-white/80 text-[11px] sm:text-xs font-semibold tracking-wide group-hover/visit:text-white transition-colors duration-300">
                    Visit Now
                  </span>
                  <ExternalLink
                    size={13}
                    className="text-white/70 group-hover/visit:text-primary transition-colors duration-300"
                  />
                </div>
              </a>

              {/* Diagonal separator line */}
              <div
                ref={separatorRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                  opacity: 0,
                  background:
                    'linear-gradient(to bottom right, transparent calc(50% - 0.5px), hsl(142 76% 45% / 0.25) 50%, transparent calc(50% + 0.5px))',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectsContent.displayName = 'ProjectsContent';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);

  const handleTabChange = useCallback((tab) => {
    if (tab === activeTab) return;

    const content = contentRef.current;
    if (!content) {
      setActiveTab(tab);
      return;
    }

    gsap.to(content, {
      opacity: 0,
      y: 15,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(
          content,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      },
    });
  }, [activeTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stagger-item > *',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'skills':
        return <SkillsContent />;
      case 'projects':
        return <ProjectsContent />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-28 lg:py-36 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-transparent" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="section-label">
            {'// My Work'}
          </span>
          <h2 className="section-heading">
            Portfolio & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="section-subtext">
            A showcase of my technical skills and projects that demonstrate my
            capabilities as a developer.
          </p>
        </div>

        {/* Tabs — glass container */}
        <div ref={tabsRef} className="flex justify-center mb-14">
          <div
            role="tablist"
            aria-label="Portfolio sections"
            className="inline-flex gap-1.5 p-1.5 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30"
            style={{ boxShadow: 'inset 0 1px 0 hsl(0 0% 100% / 0.04)' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-medium text-sm
                          transition-all duration-300 ${
                            activeTab === tab.id
                              ? 'bg-primary/[0.12] text-primary'
                              : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.04]'
                          }`}
                style={
                  activeTab === tab.id
                    ? {
                        boxShadow:
                          '0 2px 12px hsl(142 76% 45% / 0.15), inset 0 1px 0 hsl(142 76% 45% / 0.1)',
                      }
                    : undefined
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default memo(Portfolio);
