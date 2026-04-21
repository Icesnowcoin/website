/*
 * Design: Quantum Ice — Main landing page
 * Assembles all sections with particle background
 */
import Navbar from '@/components/Navbar';
import ParticleField from '@/components/ParticleField';
import HeroSection from '@/components/HeroSection';
import CommunitySection from '@/components/CommunitySection';
import AboutSection from '@/components/AboutSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import DexTradeSection from '@/components/DexTradeSection';
import EcosystemShowcase from '@/components/EcosystemShowcase';
import SecurityAndGovernance from '@/components/SecurityAndGovernance';
import RoadmapSection from '@/components/RoadmapSection';
import PriceChart from '@/components/PriceChart';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
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
        <DexTradeSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <TokenomicsSection />
        <div className="section-divider" />
        <div className="section-container py-20">
          <PriceChart />
        </div>
        <div className="section-divider" />
        <EcosystemShowcase />
        <div className="section-divider" />
        <SecurityAndGovernance />
        <div className="section-divider" />
        <RoadmapSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
