import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { particlesOptions } from "@/lib/particlesOptions.js";

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      if (mounted) setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const options = useMemo(() => particlesOptions, []);

  if (!ready) return null;

  return (
    <Particles
      id="particles-bg"
      options={options}
      style={{ pointerEvents: "none" }}
    />
  );
}

