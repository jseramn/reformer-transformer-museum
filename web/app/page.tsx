import { ExperimentSection } from "@/components/museum/experiment-section";
import { HeroSection } from "@/components/museum/hero-section";
import { HowItWorksSection } from "@/components/museum/how-it-works-section";
import { NovelSection } from "@/components/museum/novel-section";
import { TimelineSection } from "@/components/museum/timeline-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      <div id="historia" data-section="historia">
        <NovelSection />
        <TimelineSection />
      </div>

      <HowItWorksSection />

      <ExperimentSection />
    </>
  );
}