import { useEffect, memo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from '@/components/layout/Navbar.jsx';
import Footer from '@/components/layout/Footer.jsx';
import Hero from '@/sections/Hero.jsx';
import About from '@/sections/About.jsx';
import Portfolio from '@/sections/Portfolio.jsx';
import Contact from '@/sections/Contact.jsx';
import CurvedLoop from '@/components/CurvedLoop.jsx';

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CurvedLoop marqueeText="Full Stack Developer • MERN Specialist • Clean Architecture • Performance-Driven • UI / UX Focused •" />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default memo(Index);
