import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { gsap } from 'gsap';
import { Code2, Folder } from 'lucide-react';
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
const tabs = [
  { id: 'skills', label: 'Skills', icon: <Code2 size={18} /> },
  { id: 'projects', label: 'Projects', icon: <Folder size={18} /> },
];

const skills = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP', 'Three.js'] },
  { category: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'GraphQL', 'REST APIs', 'PostgreSQL'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux', 'Nginx'] },
  { category: 'Tools', items: ['VS Code', 'Figma', 'Postman', 'Jest', 'Webpack', 'Vite'] },
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
            'flex size-full items-center justify-center rounded-full border border-border/70 bg-secondary/50 p-2 text-foreground/90 shadow-sm ring-1 ring-white/5 backdrop-blur-md transition-[border-color,background-color,box-shadow,color] duration-300',
            active &&
              'border-primary/50 bg-secondary/70 text-primary shadow-[0_0_24px_hsl(var(--primary)/0.18)]'
          )}
        >
          {children}
        </span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={10}
          className="z-[9999] select-none rounded-full border border-border/60 bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-md"
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
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
    text: 'E-Commerce Platform',
  },
  {
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop',
    text: 'Task Management App',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    text: 'Analytics Dashboard',
  },
  {
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c2cc?w=1200&h=800&fit=crop',
    text: 'Social Media API',
  },
];

const SkillsContent = memo(() => (
  <Tooltip.Provider delayDuration={80} skipDelayDuration={0}>
    <div className="relative flex h-[580px] w-full items-center justify-center overflow-hidden stagger-item">
      <OrbitingCircles
        iconSize={64}
        radius={110}
        speed={0.8}
      >
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

      <OrbitingCircles
        iconSize={56}
        radius={175}
        reverse
        speed={1.4}
      >
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

      <OrbitingCircles
        iconSize={48}
        radius={250}
        speed={2.2}
      >
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

const ProjectsContent = memo(() => (
  <div className="stagger-item">
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden">
      <CircularGallery
        items={projectGalleryItems}
        bend={3}
        textColor="#ffffff"
        borderRadius={0.08}
        font="bold 26px JetBrains Mono, monospace"
        scrollSpeed={2}
        scrollEase={0.06}
      />
    </div>
  </div>
));

ProjectsContent.displayName = 'ProjectsContent';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  const handleTabChange = useCallback((tab) => {
    if (tab === activeTab) return;

    const content = contentRef.current;
    if (!content) {
      setActiveTab(tab);
      return;
    }

    gsap.to(content, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab);
        gsap.fromTo(
          content,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      },
    });
  }, [activeTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stagger-item > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-mono text-sm mb-4 block">
            {'// My Work'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Portfolio & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical skills and projects that demonstrate my
            capabilities as a developer.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
                        border transition-all duration-300 ${
                          activeTab === tab.id
                            ? 'tab-active bg-primary/10 border-primary text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                        }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef}>{renderContent()}</div>
      </div>
    </section>
  );
};

export default memo(Portfolio);
