"use client";
import Image from "next/image";
import {useState} from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const [value, setValue] = useState("");

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Raw value:", value);
    console.log("Trimmed value:", value.trim());

    if (!value.trim()) {
      toast.error("Form can't be empty");
      return;
    }

    if (!isValidEmail(value)) {
      toast.error("Invalid email format");
      return;
    }

    toast.success(`New job updates will be sent to ${value}`);
    console.log("Submitted value:", value);

    setValue("");
  };

  return (
    <footer className="flex flex-wrap justify-between p-7 text-white bg-black border-t border-gray-400">
      <div className="text-2xl flex flex-col text-left mb-5">
        <a className="ml-3 mr-3 mb-2" href="#">
          Jobs Listing
        </a>
        <a className="ml-3 mr-3 mb-2" href="#">
          About Us
        </a>
        <a className="ml-3 mr-3" href="#">
          Contact Us
        </a>
      </div>

      <div className="mb-5">
        <h5 className="mb-7 text-2xl font-bold">Newsletter</h5>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className="mb-4 border-2 border-white p-2 rounded-md text-white "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <br />
          <button
            type="submit"
            className="text-white  bg-green-700 font-bold text-xl px-4 py-2 rounded-md"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="flex flex-col">
        <h5 className="mb-3 text-2xl font-bold">Contact</h5>
        <p className="mb-4">
          Hotel Jouvence, Yaounde <br />
          Center Region, Cameroon
        </p>
        <div className="flex space-x-3">
          <a
            href="https://www.facebook.com/profile.php?id=100088206647830"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="Facebook"
          >
            <Image src="/fb.png" alt="Facebook" height={60} width={60} />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <Image src="/ig.png" alt="Instagram" height={60} width={60} />
          </a>
          <a
            href="https://www.linkedin.com/in/mudeh-mukum-024a52267/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Image src="/li.png" alt="LinkedIn" height={60} width={60} />
          </a>
          <a
            href="https://x.com/KellyHandy69750"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            title="Twitter/X"
          >
            <Image src="/x.webp" alt="Twitter" height={60} width={60} />
          </a>
        </div>
      </div>
    </footer>
  );
}
