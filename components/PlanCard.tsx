"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp, Phone, Globe } from "lucide-react";
import { Insurer, ANIMAL_TYPES } from "@/lib/insurers";
import { useStore } from "@/lib/store";
import StarRating from "./StarRating";

interface PlanCardProps {
  insurer: Insurer;
  animal: string;
  index?: number;
}

export default function PlanCard({ insurer, animal, index = 0 }: PlanCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { comparedIds, toggleCompare, setActiveModal, setContactInsurer } = useStore();
  const isSelected = comparedIds.includes(insurer.id);

  const price =
    animal === "all"
      ? Math.min(...Object.values(insurer.monthlyPrice).filter((p) => p > 0))
      : insurer.monthlyPrice[animal] || 0;

  const animalLabel =
    animal === "all" ? "from" : ANIMAL_TYPES.find((a) => a.id === animal)?.label || "";

  const handleContact = () => {
    setContactInsurer(insurer);
    setActiveModal("contact");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`relative bg-[#0D1B3E] border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 ${
        isSelected
          ? "border-brand-red shadow-lg shadow-brand-red/20"
          : "border-white/10 hover:border-white/20"
      }`}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red" />
      )}

      {/* Checkbox */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => toggleCompare(insurer.id)}
          className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
            isSelected
              ? "bg-brand-red border-brand-red"
              : "border-gray-600 hover:border-gray-400"
          }`}
          title={isSelected ? "Remove from comparison" : "Add to comparison"}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </button>
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4 pr-8">
          <div
            className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0"
            style={{ backgroundColor: insurer.color + "20", border: `1px solid ${insurer.color}40` }}
          >
            {insurer.logo}
          </div>
          <div>
            <h3
              className="font-bebas text-xl tracking-wide leading-tight"
              style={{ color: insurer.color }}
            >
              {insurer.name}
            </h3>
            <p className="text-gray-500 text-xs italic leading-tight mt-0.5">{insurer.tagline}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="font-bebas text-4xl text-white">${price}</span>
            <span className="text-gray-400 text-sm">/mo</span>
          </div>
          <div className="text-gray-500 text-xs uppercase tracking-wider">
            {animal === "all" ? "starting from" : `for ${animalLabel}s`}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-1 mb-4 border border-white/5 bg-black/20">
          {[
            { label: "Reimburse", value: insurer.reimbursement },
            { label: "Annual Max", value: insurer.maxAnnual },
            { label: "Deductible", value: insurer.deductible },
            { label: "Claims", value: insurer.claimsTime },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-2 px-1 border-r border-white/5 last:border-r-0">
              <span className="text-white text-xs font-bold leading-tight text-center">{stat.value}</span>
              <span className="text-gray-600 text-[10px] uppercase tracking-wider mt-0.5 text-center">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={insurer.rating} reviews={insurer.reviews} size="sm" />
          <span className="text-xs text-gray-500">App: ⭐ {insurer.appRating}</span>
        </div>

        {/* Animal tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {insurer.animals.map((a) => {
            const at = ANIMAL_TYPES.find((t) => t.id === a);
            return (
              <span
                key={a}
                className="flex items-center gap-1 bg-white/5 border border-white/10 text-gray-400 text-xs px-2 py-0.5"
              >
                <span className="text-xs">{at?.icon}</span>
                <span>{at?.label}</span>
              </span>
            );
          })}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-brand-blue font-semibold hover:text-blue-400 transition-colors mb-4"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? "Hide Features" : "Show Features"}
        </button>

        {/* Expanded features */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 space-y-4"
          >
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Covered</h4>
              <ul className="space-y-1">
                {insurer.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                    <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Not Covered</h4>
              <ul className="space-y-1">
                {insurer.notCovered.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                    <X className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/5 px-3 py-2 border border-white/5">
              <span className="text-yellow-500">⏱</span>
              Waiting period: {insurer.waitingPeriod}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleContact}
            className="flex-1 flex items-center justify-center gap-1.5 border border-white/20 text-gray-300 text-xs font-semibold py-2.5 hover:border-white/40 hover:text-white transition-colors uppercase tracking-widest"
          >
            <Phone className="w-3 h-3" />
            Contact
          </button>
          <a
            href={insurer.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-brand-navy border border-brand-blue/50 text-white text-xs font-semibold py-2.5 hover:bg-brand-blue transition-colors uppercase tracking-widest"
          >
            <Globe className="w-3 h-3" />
            Get a Quote →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
