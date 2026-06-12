"use client";

import { ANIMAL_TYPES } from "@/lib/insurers";
import { useStore } from "@/lib/store";

export default function AnimalSelector() {
  const { selectedAnimal, setSelectedAnimal } = useStore();

  return (
    <div className="space-y-2">
      <h3 className="font-bebas text-sm tracking-widest text-gray-400 uppercase">Animal Type</h3>
      <div className="flex flex-col gap-1">
        {ANIMAL_TYPES.map((animal) => {
          const active = selectedAnimal === animal.id;
          return (
            <button
              key={animal.id}
              onClick={() => setSelectedAnimal(animal.id)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all text-left border-l-2 ${
                active
                  ? "bg-brand-navy text-white border-brand-red"
                  : "bg-transparent text-gray-400 border-transparent hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base">{animal.icon}</span>
              <span>{animal.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
