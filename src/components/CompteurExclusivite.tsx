"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";

const MOIS_NOMS = [
  "janvier", "fevrier", "mars", "avril",
  "mai", "juin", "juillet", "aout",
  "septembre", "octobre", "novembre", "decembre",
];

export default function CompteurExclusivite() {
  const [placesRestantes, setPlacesRestantes] = useState(8);
  const [totalSlots, setTotalSlots] = useState(8);
  const [moisActuel, setMoisActuel] = useState("");
  const [urgence, setUrgence] = useState(false);

  useEffect(() => {
    const now = new Date();
    setMoisActuel(MOIS_NOMS[now.getMonth()]);

    const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    fetch(`/api/disponibilites?month=${monthStr}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) {
          setPlacesRestantes(data.stats.placesRestantes);
          setTotalSlots(data.stats.totalSlots);
          setUrgence(data.stats.placesRestantes <= 3);
        }
      })
      .catch(() => {
        // Fallback: calcul local
        const joursEcoules = now.getDate();
        const placesReservees = Math.min(
          Math.floor(joursEcoules / 3.5),
          7
        );
        const restantes = 8 - placesReservees;
        setPlacesRestantes(restantes);
        setUrgence(restantes <= 3);
      });
  }, []);

  return (
    <div
      className={`w-full py-3 px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left transition-all duration-500 ${
        urgence ? "bg-primary" : "bg-on-surface"
      }`}
    >
      {/* Events per month */}
      <div className="flex items-center gap-3">
        <Calendar size={16} className="text-white/60 shrink-0" />
        <span className="text-white/80 text-xs tracking-widest uppercase">
          Le Chef accepte{" "}
          <span className="text-white font-bold">{totalSlots} evenements</span> par mois
        </span>
      </div>

      <div className="hidden sm:block w-px h-4 bg-white/20" />

      {/* Remaining spots */}
      <div className="flex items-center gap-3">
        <div className="relative flex h-2.5 w-2.5 shrink-0">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              urgence ? "bg-tertiary-fixed" : "bg-green-400"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              urgence ? "bg-tertiary-fixed" : "bg-green-400"
            }`}
          />
        </div>
        <span
          className={`text-xs tracking-widest uppercase font-bold ${
            urgence ? "text-tertiary-fixed" : "text-green-400"
          }`}
        >
          {placesRestantes} place{placesRestantes > 1 ? "s" : ""} restante
          {placesRestantes > 1 ? "s" : ""}
        </span>
        <span className="text-white/60 text-xs">en {moisActuel}</span>
      </div>

      <div className="hidden sm:block w-px h-4 bg-white/20" />

      {/* Response time */}
      <div className="flex items-center gap-2">
        <Clock size={14} className="text-white/60 shrink-0" />
        <span className="text-white/60 text-xs tracking-wider">
          Reponse sous <span className="text-white font-semibold">24h</span>
        </span>
      </div>
    </div>
  );
}
