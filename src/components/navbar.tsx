"use client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  function showNav() {
    setOpen((prev) => !prev);
  }

  return (
    <nav className="flex  md:flex-row md:items-center gap-5 justify-between p-7 md:text-2xl">
      <Link href="/">
        <Image src="/IMG_0569.png" alt="site logo" width={100} height={100} />
      </Link>

      <div className="flex flex-row-reverse justify-between items-center w-full md:w-auto">
        <Image
          src="/menu.png"
          alt="menu"
          width={60}
          height={20}
          className="md:hidden  cursor-pointer"
          onClick={showNav}
        />
        <div
          className={`
          flex-col md:flex-row md:flex
          ${open ? "flex" : "hidden"}
          text-cyan-50 gap-5 font-semibold mt-5 md:mt-0
        `}
        >
          <Link href="/">Home</Link>
          <Link href="/Jobspage">Find Jobs</Link>
          <Link href="/ContactUsPage">Contact Us</Link>
        </div>
      </div>

      <div className="">
        <button className="font-bold h-max px-4 rounded-md border-green-500 bg-green-500 text-white hover:bg-white hover:text-green-500 transition">
          <Link href="/">Get Started</Link>
        </button>
      </div>
    </nav>
  );
}
