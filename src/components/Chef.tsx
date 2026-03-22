import Image from "next/image";
import FadeIn from "./FadeIn";

export default function Chef() {
  return (
    <section id="chef" className="bg-surface-container-low py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Image */}
          <FadeIn className="md:col-span-5 relative">
            <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
              <Image
                src="/images/portrait-chef.png"
                alt="Le Chef de Maison Saveur"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>

          {/* Text */}
          <div className="md:col-span-7">
            <FadeIn>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
                Le visage de Maison Saveur
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight mb-10">
                Une signature nee
                <br />
                au coeur du terroir.
              </h2>
            </FadeIn>

            <FadeIn delay={150}>
              <p className="font-sans font-light text-lg text-on-surface-variant leading-relaxed mb-6">
                Apres quinze annees d&apos;excellence au sein de maisons
                etoilees au Michelin, le Chef a choisi de revenir aux sources,
                la ou le soleil de Provence sublime chaque produit.
              </p>
              <p className="font-sans font-light text-lg text-on-surface-variant leading-relaxed mb-10">
                Son approche celebre le Gard et ses producteurs passionnes.
                Chaque menu est une narration gustative, un dialogue entre la
                technique rigoureuse de la haute gastronomie et la spontaneite
                des marches locaux.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <blockquote className="border-l-2 border-primary/30 pl-6">
                <p className="font-serif italic text-xl md:text-2xl text-on-surface leading-relaxed">
                  &laquo;&nbsp;La cuisine n&apos;est pas une simple affaire de
                  gout, c&apos;est un moment de partage absolu ou le temps
                  s&apos;arrete.&nbsp;&raquo;
                </p>
              </blockquote>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
