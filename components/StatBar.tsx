"use client";

import { motion } from "framer-motion";

const stats = [
  "6+ Providers",
  "7 Animal Types",
  "Side-by-Side Comparison",
  "Free to Use",
  "No Hidden Fees",
  "Updated Daily",
  "Trusted by 50K+ Pet Owners",
];

export default function StatBar() {
  const doubled = [...stats, ...stats];

  return (
    <div className="bg-brand-navy border-y border-brand-blue/30 overflow-hidden py-3">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((stat, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-red flex-shrink-0" />
            <span className="text-white">{stat}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
