import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
// import {ModernHeroSection} from "@/components/ModernHeroSection";
import {FAQSection} from "@/components/FAQSection";
import {FeaturesSection} from "@/components/FeaturesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <ModernHeroSection
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      locationFilter={locationFilter}
      setLocationFilter={setLocationFilter}
      onGetStarted={handleGetStarted}
      /> */}
      <FeaturesSection />
      <FAQSection />
      <Footer />
    </>
  );
}
