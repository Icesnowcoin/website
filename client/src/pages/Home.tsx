/*
 * Design: Quantum Ice — Main landing page
 * Assembles all sections with particle background and intro animation
 */
import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ParticleField from '@/components/ParticleField';
import IntroAnimation from '@/components/IntroAnimation';
import HeroSection from '@/components/HeroSection';
import CommunitySection from '@/components/CommunitySection';
import AboutSection from '@/components/AboutSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import EcosystemSection from '@/components/EcosystemSection';
import RoadmapSection from '@/components/RoadmapSection';
import VideoSection from '@/components/VideoSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Intro Animation */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main Content */}
      <div className={introComplete ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.5s ease-in' }}>
        {/* Global particle background */}
        <ParticleField />

        {/* Navigation */}
        <Navbar />

        {/* Page Sections */}
        <main className="relative z-10">
          <HeroSection />
          <div className="section-divider" />
          <CommunitySection />
          <div className="section-divider" />
          <AboutSection />
          <div className="section-divider" />
          <TokenomicsSection />
          <div className="section-divider" />
          <EcosystemSection />
          <div className="section-divider" />
          <RoadmapSection />
          <div className="section-divider" />
          <VideoSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
