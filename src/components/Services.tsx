import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";

const services = [
  {
    title: "Diner Prive",
    description:
      "Un menu gastronomique en plusieurs temps servi dans l'intimite de votre demeure.",
    image: "/images/diner-prive.png",
  },
  {
    title: "Cocktail Reception",
    description:
      "Bouchees creatives et accords mets-vins pour vos celebrations les plus exclusives.",
    image: "/images/cocktail-reception.png",
  },
  {
    title: "Brunch & Dejeuner",
    description:
      "Le charme des matinees ensoleillees. Une cuisine genereuse et raffinee au fil des saisons.",
    image: "/images/brunch-terrasse.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Collection d&apos;experiences
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight max-w-2xl mb-16">
            Des moments suspendus,
            <br />
            conçus sur mesure.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 150} className={i === 1 ? "md:pt-12" : ""}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                <h3 className="font-serif text-2xl text-on-surface group-hover:text-primary transition-colors duration-300 mb-3">
                  {service.title}
                </h3>
                <p className="font-sans font-light text-on-surface-variant text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href="#contact"
                  className="font-sans text-xs tracking-[0.2em] uppercase text-primary hover:text-primary-container transition-colors"
                >
                  En savoir plus &rarr;
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
