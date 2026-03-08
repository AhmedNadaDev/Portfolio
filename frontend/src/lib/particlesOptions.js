const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export const particlesOptions = {
  fpsLimit: isMobile ? 30 : 60,
  detectRetina: true,
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  background: {
    color: {
      value: "transparent",
    },
  },
  particles: {
    number: {
      value: isMobile ? 30 : 60,
      density: {
        enable: true,
        area: 1200,
      },
    },
    color: {
      value: ["#22c55e", "#34d399", "#16a34a", "#10b981"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.15, max: 0.5 },
    },
    size: {
      value: { min: 0.8, max: 2.5 },
      random: true,
    },
    links: {
      enable: true,
      distance: 140,
      color: "#22c55e",
      opacity: 0.08,
      width: 0.8,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        default: "out",
      },
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: !isMobile,
        mode: "repulse",
      },
      onClick: {
        enable: false,
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
};
