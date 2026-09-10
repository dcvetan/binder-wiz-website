import HeroSection from "@/components/home/HeroSection";
import CardShowcaseSection from "@/components/home/CardShowcaseSection";
import FeaturesScrollSection from "@/components/home/FeaturesScrollSection";
import FeatureCardsSection from "@/components/home/FeatureCardsSection";
import ColorMatchingProcessSection from "@/components/home/ColorMatchingProcessSection";
import ColorMatchingSection from "@/components/home/ColorMatchingSection";
import ComingSoonSection from "@/components/home/ComingSoonSection";
import ContactSection from "@/components/home/ContactSection";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BinderWiz",
  alternateName: "BinderWiz App",
  url: "https://www.binderwiz.com/",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <CardShowcaseSection />
      <FeaturesScrollSection />
      <FeatureCardsSection />
      <ColorMatchingProcessSection />
      <ColorMatchingSection />
      <ComingSoonSection />
      <ContactSection />
    </>
  );
}
