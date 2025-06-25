import Image from "next/image";
import Link from "next/link";
// import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    
    <main className="m-0 p-0">
      <header className="bg-white rounded-b-xl" >
        <Navbar />
       <div className="flex flex-col items-center justify-center min-h-screen bg-white-100 bg-white rounded-b-xl">
       <section className="text-center mb-8">
          <h1 className="text-9xl font-bold text-green-900">
            Empowering Job Seekers Through Creative Solutions
          </h1>
        </section>

        <section className="text-center mb-8 flex justify-between w-[80%]">
          <p className="text-lg w-[325px]">
            "Find your next career opportunity" "Where talent meets opportunity" "Your dream job
            awaits" "Connect. Apply. Get hired."
          </p>
          <div>
            <img src="data:image/jpeg;base64,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" alt="" className="w-[250px]"/>
          </div>
          <div className="flex flex-col items-center mt-4">
            <p className="text-green-500 text-3xl">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
            <h1>10 years Experince</h1>
          </div>
        </section>

        <div className="flex gap-2">
          <Link href="/Jobspage" className="flex justify-center items-center">
            <button className="bg-green-400 text-black px-4 py-2 rounded ">Find My Job</button>
          </Link>
          <Link href="/about" className="flex justify-center items-center">
            <button className="">About Us</button>
          </Link>
        </div>
       </div>
      </header>

      <div className="flex justify-around items-center bg-gray-300 text-white m-6 mx-auto rounded-4xl w-[95%]">
        <div className=" block w-[100%] text-center p-1.5">
          <h1 className="text-2xl">
            2000<span className="text-4xl text-green-600">+</span>
          </h1>
          <p>Companies</p>
        </div>

        <div className="block w-[100%] text-center p-1.5">
          <h1 className="text-2xl">
            5<span className="text-4xl text-green-600">+</span>
          </h1>
          <p>years Expertise</p>
        </div>

        <div className="block w-[100%] text-center p-1.5">
          <h1 className="text-2xl">
            80<span className="text-4xl text-green-600">+</span>
          </h1>
          <p>Hours of Digital</p>
        </div>

        <div className=" block w-[100%] text-center p-1.5">
          <h1 className="text-2xl">
            150M<span className="text-4xl text-green-600">+</span>
          </h1>
          <p>in Tracked Revenue</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-center m-7 w-[96%] gap-3.5">
          <h1 className="text-white text-lg w-[80%] ">
            Thousands of jobs, one perfect match" "Get hired faster with smart job matching" "Your
            career breakthrough starts here" "Find jobs that love you back
          </h1>
          <p className="text-white text-md w-[80%]">
            "Discover your next career adventure" "Where talent meets opportunity" "Your dream job
            awaits" "Connect. Apply. Get hired." "Empowering job seekers through creative solutions"
            "Find your next career opportunity" "Where talent meets opportunity" "Your dream job
          </p>
        </div>
      </div>
      <section className="flex justify-between items-center m-6 ">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFDG8sehLLYiAsbxplLE1jx15agE-sxvqsug&s" alt="" className="w-[47%] rounded h-[300px]"/>
        <img src="https://m.universalclass.com/i/course/computerliteracy1/studycomputerliteracy18985.jpg" alt="" className="rounded w-[45%] h-[300px]"/>
      </section>

      <section className="flex text-center justify-around items-center m-6 pb-4 text-white border-b-2 border-white">
        <h1 className="text-7xl font-semibold">Inspire</h1>
        <p className="text-6xl text-green-400" >✦</p>
        <h1 className="text-7xl font-semibold">Build</h1>
        <p className="text-6xl text-green-400">✦</p>
        <h1 className="text-7xl font-semibold">Create</h1>
      </section>
      <Footer/>
    </main>
    
  );
}
