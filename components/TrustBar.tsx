"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, BarChart3, UserX, Star, FileText } from "lucide-react";

const SIGNALS = [
  { icon: <Lock className="w-3.5 h-3.5" />, title: "Never sell your data" },
  { icon: <ShieldCheck className="w-3.5 h-3.5" />, title: "SSL encrypted" },
  { icon: <BarChart3 className="w-3.5 h-3.5" />, title: "Independent & unbiased" },
  { icon: <UserX className="w-3.5 h-3.5" />, title: "No account required" },
  { icon: <Star className="w-3.5 h-3.5" />, title: "50,000+ comparisons" },
  { icon: <FileText className="w-3.5 h-3.5" />, title: "Always free to use" },
];

export default function TrustBar() {
  return (
    <div style={{ background: "#0c0c0d", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "14px 0" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <span style={{ color: "#c9a96e", opacity: 0.7 }}>{s.icon}</span>
              <span style={{ fontSize: 11, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>
                {s.title}
              </span>
              {i < SIGNALS.length - 1 && (
                <span className="hidden sm:block ml-8" style={{ width: 1, height: 12, background: "rgba(255,255,255,0.08)" }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
