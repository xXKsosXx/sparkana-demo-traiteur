import Image from "next/image";
import FadeIn from "./FadeIn";

const dishes = [
  {
    name: "Mijote d'agneau au thym de garrigue",
    image: "/images/agneau-garrigue.png",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    name: "Legumes oublies en textures",
    image: "/images/legumes-textures.png",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Souffle a la lavande et miel du Gard",
    image: "/images/souffle-lavande.png",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    name: "Loup de Mediterranee, emulsion d'agrumes",
    image: "/images/loup-mediterranee.png",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Le jardin d'ete en canapes",
    image: "/images/canapes-jardin.png",
    className: "md:col-span-2 md:row-span-1",
  },
];

export default function MenuSignatures() {
  return (
    <section id="menu" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
              La Carte Blanche
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-on-surface">
              Menu Signatures
            </h2>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-auto md:h-[900px]">
            {dishes.map((dish) => (
              <div
                key={dish.name}
                className={`group relative overflow-hidden cursor-pointer min-h-[220px] ${dish.className}`}
              >
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-serif italic text-white text-lg md:text-xl leading-snug">
                    {dish.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
