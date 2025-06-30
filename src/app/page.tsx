// import Image from "next/image";
// import Link from "next/link";
import {Toaster} from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

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
      <main className="pb-20">
        <section className="p-7 pt-30 text-white rounded-md">
          <div className="text-center mb-12">
            <h3 className="text-5xl md:text-6xl font-extrabold mb-6">
              Empowering Your Job <br /> Search Experience
            </h3>
            <p className="text-lg md:text-xl max-w-3xl mx-auto font-light">
              Discover a smarter way to find your next opportunity. Our platform is designed to
              streamline the job search process by intelligently matching you with roles that align
              with your skills, experience, and location preferences. Whether you are advancing your
              career or exploring new industries, we make the journey smoother, faster, and more
              efficient.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mb-12">
            <div className="bg-green-900 text-white p-6 rounded-lg shadow-md flex-1">
              <h4 className="text-2xl md:text-3xl font-semibold mb-3">
                Tailored Job Recommendations Just for You
              </h4>
              <p className="text-base md:text-lg font-normal">
                Receive customized job suggestions that are carefully curated based on your profile,
                professional background, and stated career goals. Our smart algorithms ensure you
                see only the most relevant opportunities—saving you time and effort.
              </p>
            </div>
            <div className="bg-green-900 text-white p-6 rounded-lg shadow-md flex-1">
              <h4 className="text-2xl md:text-3xl font-semibold mb-3">
                Intuitive and User-Friendly Interface
              </h4>
              <p className="text-base md:text-lg font-normal">
                Navigate your job search with ease. Our clean, responsive interface is designed for
                seamless browsing, enabling you to filter roles, compare opportunities, and apply in
                just a few clicks—whether you are on desktop or mobile.
              </p>
            </div>

            <div className="bg-green-900 text-white p-6 rounded-lg shadow-md flex-1">
              <h4 className="text-2xl md:text-3xl font-semibold mb-3">
                Stay Informed with Real-Time Notifications
              </h4>
              <p className="text-base md:text-lg font-normal">
                Never miss out on the perfect role. Get real-time alerts about new job postings that
                align with your criteria. Stay ahead of the competition by being the first to apply
                to the latest and most suitable openings.
              </p>
            </div>
          </div>
          <div className="text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md mr-4 transition duration-300">
              Learn More
            </button>
            <button className="bg-white hover:bg-gray-200 text-green-700 font-bold py-3 px-8 rounded-md transition duration-300">
              Sign Up
            </button>
          </div>
        </section>

        <section className="mt-20 p-7 pt-7 bg-[linear-gradient(to_top,black,transparent),linear-gradient(to_bottom,black,transparent),url('https://www.livecareer.com/lcapp/uploads/2020/09/job-search-activities.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="text-center">
            <h1 className="text-5xl md:text-5xl font-bold mb-4">
             Discover Your Perfect Job with Our <br /> Personalized Search Features
            </h1>
            <p className="mb-6">
              Finding the right job shouldn’t be a full-time job. Our platform makes your search smarter, faster, and more personal. Whether you are just starting out or ready to level up, we match you with roles that fit your skills, interests, and location — no more endless scrolling.
            </p>
            <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
              <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-lg">
                <Image src="/filter.png" alt="filter icon" height={40} width={40} />
                <h3 className="text-2xl font-bold mb-2 w-max mt-2">Smart Filtering Jobs That Actually Fit</h3>
                <p className="text-lg">
                  We know your time is valuable. Our advanced filtering system helps you cut through the noise and focus only on the jobs that match your criteria. Whether it is remote work, a specific industry, or a desired salary range, you will find exactly what you are looking for — without the hassle.
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-lg">
                <Image src="/cheer.png" alt="cheer icon" height={60} width={60} />
                <h3 className="text-2xl font-bold mb-2 w-max mt-2">User-Friendly and Hassle-Free</h3>
                <p className="text-lg">
                  Simplicity meets functionality. Our clean and intuitive interface makes job hunting feel less like a chore and more like an opportunity. With just a few clicks, you can view tailored job matches, save favorites, and apply instantly — all in one seamless experience. No confusion, no clutter, just results.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-between gap-3 mt-20 p-7 pt-7">
          <Image src="/hand.jpg" alt="imd1" height={900} width={600} className="rounded-md hidden md:flex" />
          <div className="">
            <h1 className="text-5xl md:text-6xl font-bold">Unlock Your Dream Job With Ease</h1>
            <p className="text-2xl md:text-3xl">
              Our platform simplifies your job search by filtering opportunities based on your
              skills and preferred locations. Experience a tailored approach that connects you with
              the right employers.
            </p>
            <div className="flex flex-col md:flex-row  mt-7 text-2xl md:text-3xl gap-3.5 index">
              <div className="bg-green-900/30 shadow-xl backdrop-blur-sm p-2">
                <Image src="/filter.png" alt="frilter" height={50} width={50} />
                <p>Find jobs that match your unique skill set.</p>
              </div>
              <div className="bg-green-900/30 shadow-xl backdrop-blur-sm p-2">
                <Image src="/book.png" alt="book" height={50} width={50} />
                <p>Save time with personalized job recommendations.</p>
              </div>
              <div className="bg-green-900/30 shadow-xl backdrop-blur-sm p-2">
                <Image src="/cheer.png" alt="cheer" height={50} width={50} />
                <p>Access a wide range of job listings.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="pl-7 pr-7 mt-20 pt-7 text-white">
          <div className="mb-5">
            <h1 className="text-2xl mb-2">FAQs</h1>
            <p className="mb-7">
              Discover answers to your most pressing questions about our job platform and its
              features.
            </p>
            <div className="border-1 p-3 border-white mb-7">
              <h1 className="text-2xl mb-2">How Does it Work?</h1>
              <p>
                Our platform connects job seekers with opportunities tailored to their skills and
                location. By filtering jobs based on your preferences, we streamline the application
                process. Simply enter your criteria and explore the best matches.
              </p>
            </div>
            <div className="border-1 p-3 border-white mb-7">
              <h1 className="text-2xl mb-2">Is it free to use?</h1>
              <p>
                Yes, our job platform is completely free for job seekers. You can browse, apply, and
                manage your applications without any charges. We believe in providing accessible job
                opportunities for everyone.
              </p>
            </div>
            <div className="border-1 p-3 border-white mb-7">
              <h1 className="text-2xl mb-2">How to apply?</h1>
              <p>
                Applying for jobs is easy! Once you find a position that interests you, click the
                application link and follow the prompts. Ensure your resume is updated to increase
                your chances of success.
              </p>
            </div>
            <div className="border-1 p-3 border-white mb-7">
              <h1 className="text-2xl mb-2">Can i save jobs?</h1>
              <p>
                Absolutely! You can save job listings to revisit later. This feature helps you keep
                track of opportunities that catch your eye, making your job search more organized.
              </p>
            </div>
            <div className="border-1 p-3 border-white mb-7">
              <h1 className="text-2xl mb-2">How to contact Support?</h1>
              <p>
                If you have any questions or need assistance, our support team is here to help. You
                can reach out via our contact form or email us directly. We strive to respond
                promptly to all inquiries.
              </p>
            </div>
          </div>
          <h4>Still have more Questions?</h4>
          <p>We are here to help!</p>
          <button>
            <a href="mailto:kellyhandy31@gmail.com" className="text-green-900 hover:underline font-bold">
              Email Us
            </a>
          </button>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
