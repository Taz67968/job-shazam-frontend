"use client";
import {useRouter} from "next/navigation";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import {ModernHeroSection} from "@/components/ModernHeroSection";
import {FAQSection} from "@/components/FAQSection";
import {FeaturesSection} from "@/components/FeaturesSection";
import {Toaster} from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/Jobspage"); // replace with your target route
  };

  return (
    <>
      <Navbar />
      {<ModernHeroSection onGetStarted={handleGetStarted} />}
      <FeaturesSection />
      <FAQSection />
      <Footer />
      <Toaster />
    </>
  );
}
