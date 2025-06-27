import Image from "next/image";
import Link from "next/link";
// import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <header className="m-0 p-0">
        <section className="h-screen bg-[linear-gradient(to_top,black,transparent),linear-gradient(to_bottom,black,transparent),url('https://spaceforwork.rs/wp-content/uploads/2023/05/Why-Coworking-min-1170x650.jpg')] bg-cover bg-center bg-no-repeat">
          <Navbar />
          <div className=" text-white flex items-center justify-center mt-20">
            <div className="text-center max-w-xl px-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job Today!</h1>
              <p className="mb-6 text-lg">
                Discover job opportunities tailored to your skills and location. Start your journey
                toward a fulfilling career with us.
              </p>
              <div>
                <button className="font-bold bg-green-700 hover:bg-green-800 h-10 w-max px-4 rounded-md text-white transition">
                  Get Started
                </button>
                <button className="font-bold h-10 px-4 rounded-md border border-white bg-white text-green-700 ml-3 hover:bg-green-100 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </header>
      <main>

      </main>
      <footer >
        <Footer /> 
      </footer>
    </>
  );
}
