import UploadCV from "../components/UploadCv";
import "../app/globals.css"
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function UploadPage() {
  return (
    <main className="min-h-screen px-4 bg-[#1f334d]">
        <Navbar/>
      <h1 className="text-3xl font-bold text-center mb-6 mt-40">Upload Your CV</h1>
      <UploadCV />
      <Footer/>
    </main>
  );
} 
