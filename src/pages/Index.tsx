
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProblemOfTheDay from '@/components/ProblemOfTheDay';
import WallOfFame from '@/components/WallOfFame';
import Menu from '@/components/Menu';
import CafeSpace from '@/components/CafeSpace';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Menu />
        <CafeSpace />
        <ProblemOfTheDay />
        <WallOfFame />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
