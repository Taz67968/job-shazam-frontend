"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Briefcase, Facebook, Twitter, Linkedin, Instagram} from "lucide-react";
import {useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export const Footer = () => {
  const [value, setValue] = useState("");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = value.trim();

    if (!trimmedEmail) {
      toast.error("Please provide an email");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/mail/sendMail?to=${trimmedEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP error ${res.status}`);
      }

      const result = await res.json();
      toast.success(result.message);
      setValue("");
    } catch (err) {
      console.error("Error in fetch:", err);
      toast.error("Something went wrong while subscribing.");
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-poppins">Job Shazam</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering careers and connecting talent with opportunities worldwide.
            </p>
            <div className="flex space-x-4">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="https://facebook.com" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="https://twitter.com" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="https://linkedin.com" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="https://instagram.com" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/jobs"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Job Listing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <address className="space-y-2 text-muted-foreground not-italic">
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
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to get updates on new job opportunities.
            </p>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-card border-border"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Job Shazam. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;