import HeroSection from "@/components/home/HeroSection";
import FeaturesScrollSection from "@/components/home/FeaturesScrollSection";
import FeatureCardsSection from "@/components/home/FeatureCardsSection";
import ColorMatchingProcessSection from "@/components/home/ColorMatchingProcessSection";
import ColorMatchingSection from "@/components/home/ColorMatchingSection";
import ComingSoonSection from "@/components/home/ComingSoonSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesScrollSection />
      <FeatureCardsSection />
      <ColorMatchingProcessSection />
      <ColorMatchingSection />
      <ComingSoonSection />
      <ContactSection />
    </>
  );
}
