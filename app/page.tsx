"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import StatBar from "@/components/StatBar";
import HowItWorks from "@/components/HowItWorks";
import PlanCard from "@/components/PlanCard";
import { insurers } from "@/lib/insurers";

const topPlans = [...insurers].sort((a, b) => b.rating - a.rating).slice(0, 3);
const providers = insurers.map((i) => ({ name: i.name, logo: i.logo, color: i.color }));

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1E3A8A] min-h-[600px] flex flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-brand-red text-white text-xs font-bold uppercase tracking-widest px-3 py-1 mb-6">
              Free Comparison Tool
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bebas text-6xl sm:text-7xl lg:text-8xl tracking-widest text-white leading-none mb-6 max-w-4xl"
          >
            PROTECT EVERY{" "}
            <span className="text-brand-red">PAW,</span>{" "}
            <span className="text-brand-red">WING</span>{" "}
            &amp;{" "}
            <span className="text-brand-red">SCALE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-blue-200 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
          >
            Compare top pet insurance plans for dogs, cats, birds, reptiles, and exotic animals
            — in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href="/compare"
              className="flex items-center gap-2 bg-brand-red text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
            >
              Compare Plans
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 border-2 border-brand-blue text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-blue/20 transition-colors"
            >
              How It Works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 flex flex-wrap gap-8 justify-center"
          >
            {[
              { label: "Providers", value: "8+" },
              { label: "Animal Types", value: "7" },
              { label: "Plans Compared Daily", value: "50K+" },
              { label: "Always Free", value: "Free" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-bebas text-4xl text-white">{s.value}</div>
                <div className="text-blue-300 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stat marquee */}
      <StatBar />

      {/* How it works */}
      <HowItWorks />

      {/* Featured plans */}
      <section className="bg-[#0A0A0A] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-bebas text-5xl tracking-widest text-white mb-2">
                TOP RATED <span className="text-brand-red">PLANS</span>
              </h2>
              <p className="text-gray-400">Our highest-rated providers right now</p>
            </div>
            <Link
              href="/compare"
              className="flex items-center gap-2 text-brand-blue text-sm font-semibold hover:text-blue-400 transition-colors"
            >
              See All Plans <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPlans.map((insurer, i) => (
              <PlanCard key={insurer.id} insurer={insurer} animal="all" index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Provider trust bar */}
      <section className="bg-[#0D1B3E] border-y border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-bebas text-sm tracking-widest text-gray-500 text-center uppercase mb-8">
            Insurance Providers on Our Platform
          </h3>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {providers.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 bg-black/30 border border-white/10 px-4 py-2.5 hover:border-white/20 transition-colors"
              >
                <span className="text-xl">{p.logo}</span>
                <span className="font-bebas text-lg tracking-wide" style={{ color: p.color }}>
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1E3A8A] py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="font-bebas text-5xl tracking-widest text-white mb-4">
            READY TO FIND THE PERFECT PLAN?
          </h2>
          <p className="text-blue-200 mb-8 text-lg">
            Compare coverage, pricing, and exclusions side-by-side for free.
          </p>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 bg-brand-red text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
          >
            Start Comparing Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
