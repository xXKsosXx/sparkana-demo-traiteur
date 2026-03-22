"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#chef", label: "Le Chef" },
  { href: "#menu", label: "Menu" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface/95 backdrop-blur-xl shadow-sm"
          : "bg-surface/90 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-5">
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-3 items-center">
          {/* Left links */}
          <div className="flex items-center gap-8">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-[0.2em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex flex-col items-center">
            <Link
              href="/"
              className="font-serif italic text-xl text-primary tracking-wide"
            >
              Maison Saveur
            </Link>
            <div className="w-8 h-px bg-primary/40 mx-auto mt-1.5" />
          </div>

          {/* Right links + Reserver */}
          <div className="flex items-center justify-end gap-8">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-[0.2em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="text-[10px] tracking-[0.3em] uppercase text-on-surface-variant hover:text-primary border-b border-primary/40 pb-0.5 transition-colors duration-300"
            >
              Reserver
            </Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center justify-between">
          <Link
            href="/"
            className="font-serif italic text-lg text-primary tracking-wide"
          >
            Maison Saveur
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-6 pb-4 flex flex-col items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-sans text-xs tracking-[0.2em] uppercase text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-[10px] tracking-[0.3em] uppercase text-on-surface-variant border-b border-primary/40 pb-0.5"
            >
              Reserver
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
