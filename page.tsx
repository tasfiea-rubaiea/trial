"use client";


import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HardwareSection from "@/components/HardwareSection";
import DataSection from "@/components/DataSection";
import ResultsSection from "@/components/ResultsSection";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="bg-[#04080f] text-[#e8ede6] overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HardwareSection />
      <DataSection />
      <ResultsSection />
      <ImpactSection />
      <Footer />
    </main>
  );
}
