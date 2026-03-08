import { memo } from 'react';

import Navbar from '@/components/layout/Navbar.jsx';
import Footer from '@/components/layout/Footer.jsx';
import Hero from '@/sections/Hero.jsx';
import About from '@/sections/About.jsx';
import Portfolio from '@/sections/Portfolio.jsx';
import Contact from '@/sections/Contact.jsx';
import CurvedLoop from '@/components/CurvedLoop.jsx';

const Index = () => (
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

export default memo(Index);
