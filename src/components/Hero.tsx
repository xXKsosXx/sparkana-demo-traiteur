import Link from "next/link";
import FadeIn from "./FadeIn";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-chef.png')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-dark-bg/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end">
        <div className="pb-24 pl-8 pr-8 md:pl-24 max-w-3xl">
          <FadeIn>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-tertiary-fixed opacity-80 mb-6">
              Gastronomie privee
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <h1 className="font-serif font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6">
              L&apos;art de la table,
              <br />
              <em>chez vous.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="font-sans font-light text-lg md:text-xl text-white/70 mb-10 max-w-xl">
              Experiences gastronomiques intimes a domicile, mas et domaines
              viticoles du Gard.
            </p>
          </FadeIn>
          <FadeIn delay={450}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#services"
                className="inline-block bg-primary text-white font-sans text-xs tracking-[0.15em] uppercase px-8 py-4 hover:bg-primary-container transition-colors duration-300"
              >
                Decouvrir l&apos;experience
              </Link>
              <Link
                href="#menu"
                className="inline-block border border-white/30 text-white font-sans text-xs tracking-[0.15em] uppercase px-8 py-4 hover:border-white/60 transition-colors duration-300"
              >
                Nos Formules
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
