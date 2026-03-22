import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <p className="font-serif italic text-xl text-white/90 mb-2">
              Maison Saveur
            </p>
            <div className="w-8 h-px bg-primary/40 mb-4" />
            <p className="font-sans text-xs text-white/40">
              &copy; {new Date().getFullYear()} Maison Saveur. Tous droits
              reserves.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-4">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="#contact"
                className="font-sans text-sm text-white/70 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="font-sans text-sm text-white/70 hover:text-white transition-colors"
              >
                Mentions legales
              </Link>
              <Link
                href="#"
                className="font-sans text-sm text-white/70 hover:text-white transition-colors"
              >
                Confidentialite
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 mb-4">
              Suivez-nous
            </p>
            <div className="flex items-center gap-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
            <p className="font-sans text-xs text-white/40 leading-relaxed">
              Gard, France
              <br />
              Cuisine Nomade Haute Couture
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="font-sans text-xs text-white/30">
            Site realise par{" "}
            <a
              href="https://sparkana.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              sparkana
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
