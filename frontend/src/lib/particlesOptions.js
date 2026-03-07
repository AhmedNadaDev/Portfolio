export const particlesOptions = {
  fpsLimit: 60,
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
      value: 250,
      density: {
        enable: true,
        area: 900,
      },
    },
    color: {
      value: ["#22c55e", "#34d399", "#16a34a", "#10b981"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.25, max: 0.65 },
    },
    size: {
      value: { min: 1, max: 3 },
      random: true,
    },
    links: {
      enable: true,
      distance: 150,
      color: "#22c55e",
      opacity: 0.16,
      width: 1,
    },
    move: {
      enable: true,
      speed: 4.5,
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
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: false,
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 140,
        duration: 0.3,
      },
    },
  },
};

