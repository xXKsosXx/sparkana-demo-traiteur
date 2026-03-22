"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "./FadeIn";

const testimonials = [
  {
    quote:
      "Maison Saveur a transcende notre mariage. Le Chef a su capturer l'essence de notre domaine pour offrir a nos invites un voyage sensoriel inoubliable. L'elegance et la discretion etaient au rendez-vous.",
    author: "Elise & Marc",
    occasion: "Mariage au Domaine de Verchant",
  },
  {
    quote:
      "Un diner d'exception dans notre mas. Chaque assiette racontait une histoire, chaque saveur etait une decouverte. Une soiree gravee dans nos memoires.",
    author: "Philippe & Nathalie",
    occasion: "Diner prive a Uzes",
  },
  {
    quote:
      "Le brunch organise pour notre anniversaire de mariage fut un moment de pure grace. Des produits sublimes, un service impeccable.",
    author: "Sophie & Antoine",
    occasion: "Brunch au Pont du Gard",
  },
];

export default function Temoignages() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="bg-dark-bg py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <div className="w-px h-16 bg-primary mx-auto mb-12" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-tertiary-fixed mb-12">
            Leurs experiences
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <blockquote className="mb-12">
            <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed">
              &laquo;&nbsp;{t.quote}&nbsp;&raquo;
            </p>
          </blockquote>

          <p className="font-sans font-semibold text-white text-sm tracking-wide mb-1">
            {t.author}
          </p>
          <p className="font-sans text-white/50 text-sm">{t.occasion}</p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
              aria-label="Precedent"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
