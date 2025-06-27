import Image from "next/image";

export default function Footer() {
  function submit(resetForm){
    resetForm()
  }
  return (
    <footer className="flex justify-between p-7 text-center text-white bg-black border-t border-gray-400">
      <div className=" text-2xl flex justify-evenly mr-5 mt-3 flex-col text-left ">
        <a className="ml-3 mr-3" href="#">
          Jobs Listing
        </a>
        <a className="ml-3 mr-3" href="#">
          About Us
        </a>
        <a className="ml-3 mr-3" href="#">
          Contact Us
        </a>
      </div>
      <div className="">
        <h5 className="mb-7 text-2xl font-bold">NewsLetter</h5>
        <input type="text" name="text" id="text" placeholder="Enter Your Email" className="mb-7 border-2 border-white p-2 rounded-md"/> <br/>
        <button className="text-white bg-green-700 font-bold text-2xl w-30 h-10 rounded-md">Subcribe</button>
      </div>
      <div className=" flex flex-col">
        <h5 className="mb-3 text-2xl font-bold">Contact</h5>
        <p className="font-sans  mb-4">Hotel Jouvence, Yaounde <br />Center Region Cameroon </p>
        <div className="flex">
        <a href="https://www.facebook.com/profile.php?id=100088206647830" target="_blank" rel="noopener noreferrer">
        <Image src="/fb.png" alt="fb"height={60} width={60}/></a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
        <Image src="/ig.png" alt="ig"height={60} width={60}/></a>
        <a href="https://www.linkedin.com/in/mudeh-mukum-024a52267/" target="_blank" rel="noopener noreferrer">
        <Image src="/li.png" alt="li"height={60} width={60}/></a>
        <a href="https://x.com/KellyHandy69750" target="_http://blank" rel="noopener noreferrer">
        <Image src="/x.webp" alt="x"height={60} width={60}/></a>
        </div>
      </div>
      
    </footer>
  );
}
