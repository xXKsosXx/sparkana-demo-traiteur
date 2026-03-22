"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import FadeIn from "./FadeIn";

export default function Reservation() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: data.get("type"),
          guests: data.get("guests"),
          date: data.get("date"),
          contact: data.get("contact"),
          message: data.get("message"),
        }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="bg-surface-container-highest p-8 md:p-12 lg:p-20">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-on-surface mb-4">
                Reserver votre instant.
              </h2>
              <p className="font-sans font-light text-on-surface-variant">
                Disponibilites limitees pour garantir l&apos;excellence.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Type */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-[0.2em] uppercase text-primary font-bold">
                  Type d&apos;evenement
                </label>
                <select
                  name="type"
                  required
                  className="bg-transparent border-b border-outline-variant pb-2 font-sans text-on-surface focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Choisir...</option>
                  <option value="diner">Diner Gastronomique</option>
                  <option value="cocktail">Cocktail Reception</option>
                  <option value="brunch">Brunch Signature</option>
                  <option value="pro">Evenement Professionnel</option>
                </select>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-[0.2em] uppercase text-primary font-bold">
                  Nombre d&apos;invites
                </label>
                <select
                  name="guests"
                  required
                  className="bg-transparent border-b border-outline-variant pb-2 font-sans text-on-surface focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="">Choisir...</option>
                  <option value="2-4">2 - 4 personnes</option>
                  <option value="5-10">5 - 10 personnes</option>
                  <option value="11-25">11 - 25 personnes</option>
                  <option value="25+">25+ personnes</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-[0.2em] uppercase text-primary font-bold">
                  Date souhaitee
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="bg-transparent border-b border-outline-variant pb-2 font-sans text-on-surface focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs tracking-[0.2em] uppercase text-primary font-bold">
                  Email ou Telephone
                </label>
                <input
                  type="text"
                  name="contact"
                  required
                  placeholder="votre@email.fr ou 06..."
                  className="bg-transparent border-b border-outline-variant pb-2 font-sans text-on-surface placeholder:text-outline focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-sans text-xs tracking-[0.2em] uppercase text-primary font-bold">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Parlez-nous de votre evenement, vos envies, vos contraintes..."
                  className="bg-transparent border-b border-outline-variant pb-2 font-sans text-on-surface placeholder:text-outline focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-white font-sans text-xs tracking-[0.2em] uppercase py-4 hover:bg-primary-container transition-colors duration-300 flex items-center justify-center gap-3 disabled:opacity-60"
                >
                  <Send size={14} />
                  {status === "loading"
                    ? "Envoi en cours..."
                    : "Envoyer ma demande de reservation"}
                </button>

                {status === "success" && (
                  <p className="text-center mt-4 font-sans text-sm text-primary">
                    Votre demande a bien ete envoyee. Le chef vous recontactera
                    sous 24h pour personnaliser votre menu.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center mt-4 font-sans text-sm text-red-600">
                    Une erreur est survenue. Veuillez reessayer.
                  </p>
                )}

                {status === "idle" && (
                  <p className="text-center mt-4 font-sans text-xs text-outline">
                    Le chef vous recontactera sous 24h pour personnaliser votre
                    menu.
                  </p>
                )}
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
