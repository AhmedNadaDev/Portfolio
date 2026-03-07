particlesJS("particles-js", {
    particles: {
      number: {
        value: 200, 
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#9F7AEA",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.6, 
        random: true,
      },
      size: {
        value: 4, 
        random: true,
      },
      line_linked: {
        enable: true, 
        distance: 150,
        color: "#9F7AEA",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 5,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse", 
        },
        onclick: {
          enable: true,
          mode: "push", 
        },
      },
      modes: {
        repulse: {
          distance: 100, 
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });