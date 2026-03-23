"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import FadeIn from "./FadeIn";

type Dispo = "disponible" | "derniere-place" | "complet";

interface SanityDispo {
  date: string;
  statut: Dispo;
}

interface DispoStats {
  totalSlots: number;
  complets: number;
  dernieres: number;
  placesRestantes: number;
}

const MOIS = [
  "Janvier", "Fevrier", "Mars", "Avril",
  "Mai", "Juin", "Juillet", "Aout",
  "Septembre", "Octobre", "Novembre", "Decembre",
];

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function CalendrierDispo() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [dispoMap, setDispoMap] = useState<Record<string, Dispo>>({});
  const [stats, setStats] = useState<DispoStats>({
    totalSlots: 8,
    complets: 0,
    dernieres: 0,
    placesRestantes: 8,
  });
  const [loading, setLoading] = useState(true);

  const fetchDispos = useCallback(async (month: number, year: number) => {
    setLoading(true);
    const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
    try {
      const res = await fetch(`/api/disponibilites?month=${monthStr}`);
      const data = await res.json();

      const map: Record<string, Dispo> = {};
      (data.dispos || []).forEach((d: SanityDispo) => {
        map[d.date] = d.statut;
      });
      setDispoMap(map);

      if (data.stats) {
        setStats(data.stats);
      }
    } catch {
      setDispoMap({});
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDispos(currentMonth, currentYear);
  }, [currentMonth, currentYear, fetchDispos]);

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;

  const days: (Date | null)[] = [];
  for (let i = 0; i < startDayOfWeek; i++) days.push(null);
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(currentYear, currentMonth, i));
  }

  function getDispoForDate(date: Date): Dispo {
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return dispoMap[key] || "disponible";
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleSelect = (date: Date) => {
    const dispo = getDispoForDate(date);
    if (dispo === "complet") return;
    setSelectedDate(date);
    const messages: Record<string, string> = {
      disponible: "Le Chef est disponible - Reservez avant qu'il ne parte !",
      "derniere-place": "Derniere disponibilite - Plus que 1 place",
    };
    setMessage(messages[dispo]);
  };

  const dispoColors = {
    disponible: {
      bg: "bg-[#1a3a2a] hover:bg-[#2a4a3a]",
      text: "text-[#34D399]",
      border: "border-[#1b3022]",
    },
    "derniere-place": {
      bg: "bg-[#3a2a1a] hover:bg-[#4a3a2a]",
      text: "text-[#FBBF24]",
      border: "border-[#3a2a1a]",
    },
    complet: {
      bg: "bg-transparent",
      text: "text-[#45464d] line-through",
      border: "border-transparent",
    },
  };

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-primary text-xs tracking-[0.3em] uppercase font-bold mb-3">
              Disponibilites
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-on-surface mb-3">
              Reservez votre soiree
            </h2>
            <p className="text-on-surface-variant text-sm">
              Le Chef accepte{" "}
              <span className="font-bold text-primary">
                {stats.totalSlots} evenements par mois
              </span>
              {" "}/{" "}
              <span className="font-bold text-primary">
                {stats.placesRestantes} place{stats.placesRestantes > 1 ? "s" : ""} restante{stats.placesRestantes > 1 ? "s" : ""}
              </span>{" "}
              en {MOIS[currentMonth]}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="bg-white shadow-sm border border-outline-variant/30 p-8">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-surface-container transition-colors"
              >
                <ChevronLeft size={20} className="text-on-surface-variant" />
              </button>
              <h3 className="font-serif text-xl text-on-surface flex items-center gap-3">
                {MOIS[currentMonth]} {currentYear}
                {loading && <Loader2 size={16} className="animate-spin text-primary" />}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-surface-container transition-colors"
              >
                <ChevronRight size={20} className="text-on-surface-variant" />
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 mb-3">
              {JOURS.map((j) => (
                <div
                  key={j}
                  className="text-center text-[10px] tracking-widest uppercase text-outline py-2"
                >
                  {j}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1.5">
              {days.map((date, i) => {
                if (!date) return <div key={`empty-${i}`} />;

                const isPast =
                  date <
                  new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const dispo = isPast ? "complet" : getDispoForDate(date);
                const isSelected = selectedDate?.getTime() === date.getTime();
                const colors = dispoColors[dispo];

                return (
                  <button
                    key={date.getTime()}
                    onClick={() => !isPast && handleSelect(date)}
                    disabled={dispo === "complet" || isPast}
                    className={`aspect-square flex items-center justify-center text-sm font-medium border transition-all duration-200
                      ${isPast ? "opacity-30 cursor-not-allowed text-outline" : colors.bg}
                      ${colors.border}
                      ${isSelected ? "ring-2 ring-primary ring-offset-2 scale-110" : ""}
                      ${colors.text}`}
                  >
                    {isSelected ? <Check size={14} /> : date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-outline-variant/30">
              {[
                { color: "bg-[#1a3a2a]", label: "Disponible" },
                { color: "bg-[#3a2a1a]", label: "Derniere place" },
                { color: "bg-surface-container-highest", label: "Complet" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-3 h-3 ${color}`} />
                  <span className="text-xs text-outline tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Confirmation message */}
        {message && selectedDate && (
          <div className="mt-4 p-5 bg-[#1a3a2a]/10 border border-[#1b3022]/30 animate-fade-in flex items-center justify-between gap-4">
            <p className="text-[#1a3a2a] text-sm font-medium">{message}</p>
            <a
              href="#contact"
              className="shrink-0 bg-primary text-white px-5 py-2 text-xs tracking-widest uppercase font-bold hover:bg-primary-container transition-colors"
            >
              Reserver
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
