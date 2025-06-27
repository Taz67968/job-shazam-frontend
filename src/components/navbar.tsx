import Image from "next/image";
export default function Navbar() {
  return (
    <nav className="flex justify-between p-7 mb-0">
      <div>
        <Image
          src="/IMG_0569.png"
          alt="site logo"
          width={100}
          height={100}
          // style={{width: '7%', height:'auto'}}
        />
      </div>
      <div className="text-cyan-50 text-2xl flex justify-evenly mr-5 mt-3">
        <a className="ml-3 mr-3" href="">
          Job Listing
        </a>
        <a className="ml-3 mr-3" href="">
          About Us
        </a>
        <a className="ml-3 mr-3" href="">
          Contact Us
        </a>
        <button className="font-bold bg-green-700 h-9 pl-3 pr-3 rounded-md border-transparent hover:bg-gre-800 transition">
          LogIn
        </button>
        <button className="font-bold h-9 pl-3 pr-3 rounded-md border-white bg-white border-1  text-green-700 ml-2 hover:bg-green-100 transition">
          SignUp
        </button>
      </div>
    </nav>
  );
}
