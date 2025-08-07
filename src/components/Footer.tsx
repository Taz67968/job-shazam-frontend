"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Briefcase, Facebook, Twitter, Linkedin, Instagram} from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#1f2936] border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#16A249] p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary-foreground " />
              </div>
              <h3 className="text-2xl font-bold text-[#f8fafc] font-poppins">Job Shazam</h3>
            </div>
            <p className="text-[#94a3b8] leading-relaxed">
              Empowering careers and connecting talent with opportunities worldwide.
            </p>
            <div className="flex space-x-4">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground bg-[#1f2936] text-[#f8fafc]"
              >
                <Link href="https://facebook.com" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground bg-[#1f2936] text-[#f8fafc]"
              >
                <Link href="https://twitter.com" aria-label="Twitter">
                  <Twitter className="h-4 w-4 " />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground bg-[#1f2936] text-[#f8fafc]"
              >
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground bg-[#1f2936] text-[#f8fafc]"
              >
                <Link href="https://instagram.com" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#f8fafc] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-[#94a3b8] hover:text-primary transition-colors"
                >
                  Job Listing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#94a3b8] hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#94a3b8] hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#94a3b8] hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-[#f8fafc] mb-4">Contact</h4>
            <address className="space-y-2 text-[#94a3b8] not-italic">
              <p>
                Email:{" "}
                <Link href="mailto:info@jobshazam" className="hover:text-primary">
                  info@jobshazam
                </Link>
              </p>
              <p>
                Phone:{" "}
                <Link href="tel:+237678239294" className="hover:text-primary">
                  +237 678-239-294
                </Link>
              </p>
              <p>Address: 237 Hotel Juvance </p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-[#f8fafc] mb-4">Newsletter</h4>
            <p className="text-[#94a3b8] mb-4">
              Subscribe to get updates on new job opportunities.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-card border-border"
                required
              />
              <Button type="submit" className="bg-[#16A249] hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-[#94a3b8]">
          <p>&copy; {new Date().getFullYear()} Job Shazam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
