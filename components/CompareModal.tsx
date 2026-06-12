"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Printer } from "lucide-react";
import { useStore } from "@/lib/store";
import { insurers, ANIMAL_TYPES } from "@/lib/insurers";
import StarRating from "./StarRating";

export default function CompareModal() {
  const { activeModal, setActiveModal, comparedIds, clearCompared, selectedAnimal, setContactInsurer } = useStore();
  const isOpen = activeModal === "compare";

  const plans = insurers.filter((i) => comparedIds.includes(i.id));

  const getPrice = (insurer: (typeof insurers)[0]) => {
    if (selectedAnimal === "all") {
      return Math.min(...Object.values(insurer.monthlyPrice).filter((p) => p > 0));
    }
    return insurer.monthlyPrice[selectedAnimal] || 0;
  };

  const rows = [
    { label: "Monthly Price", render: (i: (typeof insurers)[0]) => `$${getPrice(i)}/mo`, highlight: true },
    { label: "Reimbursement", render: (i: (typeof insurers)[0]) => i.reimbursement },
    { label: "Annual Maximum", render: (i: (typeof insurers)[0]) => i.maxAnnual },
    { label: "Deductible Range", render: (i: (typeof insurers)[0]) => i.deductible },
    { label: "Claims Processing", render: (i: (typeof insurers)[0]) => i.claimsTime },
    { label: "App Rating", render: (i: (typeof insurers)[0]) => `⭐ ${i.appRating}` },
    { label: "Waiting Period", render: (i: (typeof insurers)[0]) => i.waitingPeriod },
    {
      label: "Animals Covered",
      render: (i: (typeof insurers)[0]) =>
        i.animals.map((a) => ANIMAL_TYPES.find((t) => t.id === a)?.icon).join(" "),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#0D1B3E] border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0D1B3E] z-10">
              <div>
                <h2 className="font-bebas text-2xl tracking-widest text-white">
                  PLAN COMPARISON
                </h2>
                <p className="text-gray-400 text-sm">Side-by-side analysis of {plans.length} selected plans</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 border border-white/20 text-gray-400 px-3 py-2 text-sm hover:text-white hover:border-white/40 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full">
                {/* Plan headers */}
                <thead>
                  <tr>
                    <th className="text-left w-40 pr-4" />
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center pb-6 px-3">
                        <div
                          className="w-14 h-14 mx-auto flex items-center justify-center text-2xl mb-2"
                          style={{ backgroundColor: plan.color + "20", border: `1px solid ${plan.color}40` }}
                        >
                          {plan.logo}
                        </div>
                        <div className="font-bebas text-lg tracking-wide" style={{ color: plan.color }}>
                          {plan.name}
                        </div>
                        <div className="mt-1">
                          <StarRating rating={plan.rating} size="sm" />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {rows.map((row) => (
                    <tr key={row.label} className={row.highlight ? "bg-brand-navy/30" : ""}>
                      <td className="py-3 pr-4 text-xs text-gray-400 uppercase tracking-widest font-semibold whitespace-nowrap">
                        {row.label}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-3 px-3 text-center">
                          <span className={`text-sm font-semibold ${row.highlight ? "text-white text-base" : "text-gray-200"}`}>
                            {row.render(plan)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Features */}
                  <tr className="bg-white/5">
                    <td colSpan={plans.length + 1} className="py-3 px-0">
                      <span className="text-xs font-bebas text-gray-400 uppercase tracking-widest">Top Features</span>
                    </td>
                  </tr>
                  {[0, 1, 2, 3].map((fi) => (
                    <tr key={`feat-${fi}`}>
                      <td className="py-2 pr-4 text-xs text-gray-600 whitespace-nowrap">Feature {fi + 1}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-2 px-3 text-center">
                          {plan.features[fi] ? (
                            <div className="flex items-center gap-1.5 justify-center">
                              <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                              <span className="text-xs text-gray-300">{plan.features[fi]}</span>
                            </div>
                          ) : (
                            <span className="text-gray-700">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Exclusions */}
                  <tr className="bg-white/5">
                    <td colSpan={plans.length + 1} className="py-3 px-0">
                      <span className="text-xs font-bebas text-gray-400 uppercase tracking-widest">Top Exclusions</span>
                    </td>
                  </tr>
                  {[0, 1, 2].map((ei) => (
                    <tr key={`excl-${ei}`}>
                      <td className="py-2 pr-4 text-xs text-gray-600">Exclusion {ei + 1}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-2 px-3 text-center">
                          {plan.notCovered[ei] ? (
                            <span className="text-xs text-gray-500">{plan.notCovered[ei]}</span>
                          ) : (
                            <span className="text-gray-700">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>

                {/* Actions */}
                <tfoot>
                  <tr className="border-t border-white/10">
                    <td className="pt-6" />
                    {plans.map((plan) => (
                      <td key={plan.id} className="pt-6 px-3">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setContactInsurer(plan);
                              setActiveModal("contact");
                            }}
                            className="border border-white/20 text-gray-300 py-2 text-xs font-bold uppercase tracking-widest hover:border-white/40 hover:text-white transition-colors"
                          >
                            Contact
                          </button>
                          <a
                            href={plan.contact.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-navy border border-brand-blue/50 text-white py-2 text-xs font-bold uppercase tracking-widest text-center hover:bg-brand-blue transition-colors"
                          >
                            Get Quote →
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
