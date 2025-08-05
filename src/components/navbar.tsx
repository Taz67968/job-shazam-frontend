"use client";
import {useState, useEffect} from "react";
import Link from "next/link";
import "../app/globals.css";
import {Button} from "@/components/ui/button";
import {Search, Briefcase, Phone, BarChart3, Menu, X} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prefetch routes
  useEffect(() => {
    const prefetchRoutes = ["/Jobspage", "/Dashboard","/UploadPage", "/ContactUsPage", "/find-jobs", "lohinPage"];
    prefetchRoutes.forEach((route) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = route;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <header
      className={`bg-[#1f2936] border-b border-border sticky top-0 z-50 transition-all ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="!text-primary text-2xl font-bold  !text-[#16A249] font-poppins" prefetch={false}>
            IT-JobFinder
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-white">
            <NavLink href="/"  prefetch={false}>
              Home
            </NavLink>
            <NavLink href="/Jobspage" icon={<Search className="h-4 w-4 text-white" />}>
              Find Jobs
            </NavLink>
            <NavLink href="/Dashboard" icon={<BarChart3 className="h-4 w-4 text-white" />}>
              Track Applications
            </NavLink>
            <NavLink href="/UploadPage" icon={<BarChart3 className="h-4 w-4 text-white" />}>
              UploadCv
            </NavLink>
            <NavLink href="/ContactUsPage" icon={<Phone className="h-4 w-4 text-white" />}>
              Contact
            </NavLink>
          </nav>

          <div className=" text-[#16A249] hidden md:flex items-center gap-4 ">
            <Button asChild>
              <Link href="/loginPage" prefetch={false}>
                <Briefcase className="h-4 w-4 mr-2" />
                SignUP
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink
              href="/Jobspage"
              onClick={() => setIsOpen(false)}
              icon={<Search className="h-4 w-4" />}
            >
              Find Jobs
            </MobileNavLink>
            <MobileNavLink
              href="/Dashboard"
              onClick={() => setIsOpen(false)}
              icon={<BarChart3 className="h-4 w-4" />}
            >
              Track Applications
            </MobileNavLink>

           <MobileNavLink
              href="/UploadPage"
              onClick={() => setIsOpen(false)}
              icon={<BarChart3 className="h-4 w-4" />}
            >
              UploadCv
            </MobileNavLink>

            <MobileNavLink
              href="/ContactUsPage"
              onClick={() => setIsOpen(false)}
              icon={<Phone className="h-4 w-4" />}
            >
              Contact
            </MobileNavLink>

            <button className="w-full border rounded-md px-4 py-2 flex items-center gap-2 hover:bg-accent transition-colors" onClick={() => setIsOpen(false)}>
              <Link href="/find-jobs">
                <Briefcase className="h-4 w-4 mr-2" />
                Get Started
              </Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// Reusable NavLink component
function NavLink({
  href,
  children,
  icon,
  prefetch = true,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  prefetch?: boolean;
}) {
  return (
    <Link
      href={href}
      className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
      prefetch={prefetch}
    >
      {icon}
      {children}
    </Link>
  );
}

// Reusable MobileNavLink component
function MobileNavLink({
  href,
  children,
  icon,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      className=" px-4 py-2 text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors flex items-center gap-2"
      onClick={onClick}
      prefetch={false}
    >
      {icon}
      {children}
    </Link>
  );
}
