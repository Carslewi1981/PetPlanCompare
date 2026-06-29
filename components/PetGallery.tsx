"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useStore } from "@/lib/store";

interface PetType {
  id: string;
  label: string;
  emoji: string;
  headline: string;
  sub: string;
  fact: string;
  ctaLabel: string;
  // CSS grid of emoji "photos" — top 3 big, bottom strip smaller
  photos: { emoji: string; caption: string; breed?: string }[];
  accentColor: string;
  bgGradient: string;
  riskNote: string;
}

const PET_TYPES: PetType[] = [
  {
    id: "dog",
    label: "Dogs",
    emoji: "🐕",
    accentColor: "#0066cc",
    bgGradient: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    headline: "Man's best friend deserves the best coverage.",
    sub: "From Golden Retrievers to Dachshunds — every breed faces unique health risks. Find a plan built for your dog.",
    fact: "1 in 3 dogs needs emergency vet care each year. Average bill: $1,500–$5,000.",
    ctaLabel: "Compare dog plans",
    riskNote: "ACL tears · Cancer · Hip dysplasia · Bloat",
    photos: [
      { emoji: "🐕", caption: "Golden Retriever", breed: "Biscuit, 3 yrs" },
      { emoji: "🐩", caption: "French Bulldog", breed: "Luna, 2 yrs" },
      { emoji: "🦮", caption: "German Shepherd", breed: "Rex, 5 yrs" },
      { emoji: "🐕‍🦺", caption: "Labrador", breed: "Buddy, 4 yrs" },
      { emoji: "🐾", caption: "Dachshund", breed: "Pickle, 6 yrs" },
      { emoji: "🐶", caption: "Poodle", breed: "Coco, 1 yr" },
      { emoji: "🦴", caption: "Bernese Mt Dog", breed: "Moose, 2 yrs" },
      { emoji: "🐕", caption: "Great Dane", breed: "Zeus, 1.5 yrs" },
    ],
  },
  {
    id: "cat",
    label: "Cats",
    emoji: "🐈",
    accentColor: "#7c3aed",
    bgGradient: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)",
    headline: "Independent souls. Surprisingly expensive vet bills.",
    sub: "Cats hide illness well — until a $3,000 emergency reveals what you couldn't see. Be ready before it happens.",
    fact: "HCM affects 1 in 7 cats. Kidney disease costs $2,000–$8,000/year to manage.",
    ctaLabel: "Compare cat plans",
    riskNote: "HCM · Kidney disease · Urinary blockages · Cancer",
    photos: [
      { emoji: "🐈", caption: "Maine Coon", breed: "Noodle, 4 yrs" },
      { emoji: "🐱", caption: "Siamese", breed: "Cleo, 2 yrs" },
      { emoji: "😺", caption: "Persian", breed: "Boba, 3 yrs" },
      { emoji: "🐈‍⬛", caption: "Scottish Fold", breed: "Ginger, 1 yr" },
      { emoji: "😸", caption: "Ragdoll", breed: "Mochi, 5 yrs" },
      { emoji: "🐱", caption: "Bengal", breed: "Mango, 2 yrs" },
      { emoji: "😻", caption: "Sphynx", breed: "Waffles, 3 yrs" },
      { emoji: "🐈", caption: "British Shorthair", breed: "Duke, 6 yrs" },
    ],
  },
  {
    id: "bird",
    label: "Birds",
    emoji: "🦜",
    accentColor: "#059669",
    bgGradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    headline: "Birds live 20–80 years. So do their vet bills.",
    sub: "Avian vets are specialists — and they charge like it. A single respiratory infection can cost $800–$2,500.",
    fact: "Parrots can live 60+ years. One crop obstruction surgery averages $1,200–$3,000.",
    ctaLabel: "Compare bird plans",
    riskNote: "Psittacosis · Proventricular disease · Crop issues · Feather destructive behavior",
    photos: [
      { emoji: "🦜", caption: "African Grey", breed: "Einstein, 12 yrs" },
      { emoji: "🦚", caption: "Macaw", breed: "Kiwi, 8 yrs" },
      { emoji: "🐦", caption: "Cockatiel", breed: "Sunny, 5 yrs" },
      { emoji: "🦢", caption: "Cockatoo", breed: "Coco, 15 yrs" },
      { emoji: "🦉", caption: "Conure", breed: "Mango, 3 yrs" },
      { emoji: "🐦‍🔥", caption: "Lovebird", breed: "Ruby, 4 yrs" },
      { emoji: "🦜", caption: "Budgerigar", breed: "Sky, 2 yrs" },
      { emoji: "🐧", caption: "Amazon Parrot", breed: "Paco, 20 yrs" },
    ],
  },
  {
    id: "rabbit",
    label: "Rabbits",
    emoji: "🐇",
    accentColor: "#db2777",
    bgGradient: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
    headline: "Quiet, soft, and surprisingly fragile.",
    sub: "Rabbits mask pain instinctively — by the time you notice something's wrong, a vet visit is urgent. GI stasis kills in hours.",
    fact: "GI stasis surgery costs $1,500–$3,000. Dental spurs require regular $200–$400 treatments.",
    ctaLabel: "Compare rabbit plans",
    riskNote: "GI stasis · Dental disease · Uterine cancer (unspayed) · E. cuniculi",
    photos: [
      { emoji: "🐇", caption: "Holland Lop", breed: "Pebbles, 3 yrs" },
      { emoji: "🐰", caption: "Mini Rex", breed: "Velvet, 2 yrs" },
      { emoji: "🐇", caption: "Flemish Giant", breed: "Goliath, 4 yrs" },
      { emoji: "🐰", caption: "Lionhead", breed: "Fluffy, 1 yr" },
      { emoji: "🐇", caption: "Netherland Dwarf", breed: "Tiny, 2 yrs" },
      { emoji: "🐰", caption: "English Angora", breed: "Snowball, 3 yrs" },
      { emoji: "🐇", caption: "Rex", breed: "Copper, 5 yrs" },
      { emoji: "🐰", caption: "Dutch", breed: "Domino, 2 yrs" },
    ],
  },
  {
    id: "reptile",
    label: "Reptiles",
    emoji: "🦎",
    accentColor: "#65a30d",
    bgGradient: "linear-gradient(135deg, #f7fee7 0%, #ecfccb 100%)",
    headline: "Cold-blooded pets, warm-hearted bills.",
    sub: "Reptile vets are rare. When your bearded dragon gets metabolic bone disease or your ball python needs surgery, specialist costs are steep.",
    fact: "MBD treatment in bearded dragons: $500–$2,000. Egg-binding surgery in female reptiles: $1,000–$3,500.",
    ctaLabel: "Compare reptile plans",
    riskNote: "Metabolic bone disease · Egg-binding · Respiratory infections · Parasites",
    photos: [
      { emoji: "🦎", caption: "Bearded Dragon", breed: "Spike, 3 yrs" },
      { emoji: "🐍", caption: "Ball Python", breed: "Monty, 5 yrs" },
      { emoji: "🦎", caption: "Blue-Tongue Skink", breed: "Blueberry, 4 yrs" },
      { emoji: "🐊", caption: "Leopard Gecko", breed: "Leo, 2 yrs" },
      { emoji: "🐢", caption: "Russian Tortoise", breed: "Tank, 10 yrs" },
      { emoji: "🦎", caption: "Chameleon", breed: "Camo, 3 yrs" },
      { emoji: "🐍", caption: "Corn Snake", breed: "Rusty, 6 yrs" },
      { emoji: "🦕", caption: "Crested Gecko", breed: "Velcro, 4 yrs" },
    ],
  },
  {
    id: "exotic",
    label: "Small Mammals",
    emoji: "🐹",
    accentColor: "#d97706",
    bgGradient: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
    headline: "Small animals. Big hearts. Unexpected vet bills.",
    sub: "Ferrets, guinea pigs, chinchillas — exotic small mammals need specialized vets. One adrenal disease diagnosis changes everything.",
    fact: "Ferret adrenal surgery: $1,500–$3,000. Guinea pig ovarian cysts: $500–$1,500. Chinchilla malocclusion: $800–$2,000.",
    ctaLabel: "Compare exotic plans",
    riskNote: "Adrenal disease (ferrets) · Malocclusion · Respiratory infections · Ovarian cysts",
    photos: [
      { emoji: "🐹", caption: "Hamster", breed: "Nibbles, 1 yr" },
      { emoji: "🦦", caption: "Ferret", breed: "Bandit, 3 yrs" },
      { emoji: "🐾", caption: "Guinea Pig", breed: "Popcorn, 2 yrs" },
      { emoji: "🐭", caption: "Chinchilla", breed: "Dusty, 4 yrs" },
      { emoji: "🐁", caption: "Degu", breed: "Chewy, 3 yrs" },
      { emoji: "🦔", caption: "Hedgehog", breed: "Prickles, 2 yrs" },
      { emoji: "🐿️", caption: "Sugar Glider", breed: "Glide, 5 yrs" },
      { emoji: "🐹", caption: "Rat", breed: "Remy, 1 yr" },
    ],
  },
];

const LIKED_CAPTION = [
  "Insured & living their best life 🐾",
  "Protected — just like they deserve 💙",
  "Coverage found. Peace of mind achieved ✓",
  "Happy pet. Happy wallet. ✨",
];

export default function PetGallery() {
  const { setSelectedAnimal } = useStore();
  const [activePet, setActivePet] = useState<PetType>(PET_TYPES[0]);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [likeCaption, setLikeCaption] = useState<number | null>(null);

  const handleTabClick = (pet: PetType) => {
    setActivePet(pet);
    setLiked(new Set());
    setLikeCaption(null);
    // Also set the global animal filter so Compare page picks it up
    const animalId = pet.id === "exotic" ? "exotic" : pet.id;
    setSelectedAnimal(animalId as Parameters<typeof setSelectedAnimal>[0]);
  };

  const toggleLike = (idx: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
    setLikeCaption(idx);
    setTimeout(() => setLikeCaption(null), 2000);
  };

  const [featured, ...rest] = activePet.photos;
  const gridPhotos = rest.slice(0, 7);

  return (
    <section className="bg-white" style={{ padding: "88px 0" }}>
      <div className="max-w-[980px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-white text-[11px] font-semibold mb-4 px-3 py-1"
              style={{ background: activePet.accentColor, borderRadius: 9999, transition: "background 0.4s" }}
            >
              Every pet covered
            </span>
            <h2
              className="font-semibold text-[#1d1d1f] mb-3 leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.374px" }}
            >
              What type of pet do you have?
            </h2>
            <p className="text-[#7a7a7a] mx-auto max-w-lg" style={{ fontSize: 17, letterSpacing: "-0.374px" }}>
              Click your pet to see real coverage options, common health risks, and average costs.
            </p>
          </motion.div>
        </div>

        {/* Pet type tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {PET_TYPES.map((pet) => (
            <button
              key={pet.id}
              onClick={() => handleTabClick(pet)}
              className="flex items-center gap-2 px-4 py-2.5 transition-all active:scale-95"
              style={{
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: activePet.id === pet.id ? 600 : 400,
                background: activePet.id === pet.id ? pet.accentColor : "#f5f5f7",
                color: activePet.id === pet.id ? "#fff" : "#3a3a3c",
                border: activePet.id === pet.id ? "none" : "1px solid #e0e0e0",
                boxShadow: activePet.id === pet.id ? `0 4px 14px ${pet.accentColor}40` : "none",
              }}
            >
              <span style={{ fontSize: 18 }}>{pet.emoji}</span>
              {pet.label}
            </button>
          ))}
        </div>

        {/* Main content — animated swap */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePet.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Left — photo mosaic */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[340px]">
                  {/* Featured large photo — spans 2 cols 2 rows */}
                  <motion.div
                    className="col-span-2 row-span-2 relative cursor-pointer select-none"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => toggleLike(0)}
                    style={{ borderRadius: 16, overflow: "hidden", background: activePet.bgGradient }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                      <motion.span
                        style={{ fontSize: 80, lineHeight: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))" }}
                        animate={liked.has(0) ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {featured.emoji}
                      </motion.span>
                      <div className="text-center">
                        <div className="font-semibold text-[#1d1d1f]" style={{ fontSize: 13 }}>
                          {featured.caption}
                        </div>
                        {featured.breed && (
                          <div className="text-[#7a7a7a]" style={{ fontSize: 11 }}>
                            {featured.breed}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Heart button */}
                    <button
                      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-colors"
                      style={{
                        background: liked.has(0) ? "#fee2e2" : "rgba(255,255,255,0.8)",
                        borderRadius: 9999,
                        backdropFilter: "blur(4px)",
                      }}
                      onClick={(e) => { e.stopPropagation(); toggleLike(0); }}
                    >
                      <Heart
                        className="w-4 h-4"
                        style={{ color: liked.has(0) ? "#ef4444" : "#9ca3af", fill: liked.has(0) ? "#ef4444" : "none" }}
                      />
                    </button>
                    {/* Like caption toast */}
                    <AnimatePresence>
                      {likeCaption === 0 && liked.has(0) && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-3 left-3 right-3 text-center px-2 py-1.5 bg-white/90 backdrop-blur"
                          style={{ borderRadius: 8, fontSize: 11, color: "#1d1d1f", fontWeight: 500 }}
                        >
                          {LIKED_CAPTION[0]}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Smaller photos — 2x2 grid */}
                  {gridPhotos.slice(0, 4).map((photo, idx) => (
                    <motion.div
                      key={idx}
                      className="relative cursor-pointer select-none"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLike(idx + 1)}
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        background: activePet.bgGradient,
                      }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-1">
                        <motion.span
                          style={{ fontSize: 36, lineHeight: 1 }}
                          animate={liked.has(idx + 1) ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {photo.emoji}
                        </motion.span>
                        <div className="text-center">
                          <div className="text-[#1d1d1f] leading-tight" style={{ fontSize: 9, fontWeight: 600 }}>
                            {photo.caption}
                          </div>
                        </div>
                      </div>
                      <button
                        className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center"
                        style={{
                          background: liked.has(idx + 1) ? "#fee2e2" : "rgba(255,255,255,0.75)",
                          borderRadius: 9999,
                        }}
                        onClick={(e) => { e.stopPropagation(); toggleLike(idx + 1); }}
                      >
                        <Heart
                          className="w-2.5 h-2.5"
                          style={{ color: liked.has(idx + 1) ? "#ef4444" : "#9ca3af", fill: liked.has(idx + 1) ? "#ef4444" : "none" }}
                        />
                      </button>
                    </motion.div>
                  ))}

                  {/* Bottom row of 4 small photos — spans full width */}
                  {gridPhotos.slice(4, 7).map((photo, idx) => (
                    <motion.div
                      key={`b${idx}`}
                      className="relative cursor-pointer select-none"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLike(idx + 5)}
                      style={{
                        borderRadius: 12,
                        overflow: "hidden",
                        background: activePet.bgGradient,
                      }}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-1">
                        <motion.span
                          style={{ fontSize: 28, lineHeight: 1 }}
                          animate={liked.has(idx + 5) ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {photo.emoji}
                        </motion.span>
                        <div className="text-[#1d1d1f] leading-tight text-center" style={{ fontSize: 8, fontWeight: 600 }}>
                          {photo.caption}
                        </div>
                      </div>
                      <button
                        className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center"
                        style={{
                          background: liked.has(idx + 5) ? "#fee2e2" : "rgba(255,255,255,0.75)",
                          borderRadius: 9999,
                        }}
                        onClick={(e) => { e.stopPropagation(); toggleLike(idx + 5); }}
                      >
                        <Heart
                          className="w-2 h-2"
                          style={{ color: liked.has(idx + 5) ? "#ef4444" : "#9ca3af", fill: liked.has(idx + 5) ? "#ef4444" : "none" }}
                        />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Like counter */}
                <div className="mt-3 flex items-center gap-2" style={{ fontSize: 12, color: "#7a7a7a" }}>
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  {liked.size > 0 ? (
                    <span>
                      <strong className="text-[#1d1d1f]">{liked.size}</strong> of your favorites — now find them a plan
                    </span>
                  ) : (
                    <span>Tap any pet to show some love ❤️</span>
                  )}
                </div>
              </div>

              {/* Right — info panel */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {/* Headline card */}
                <div
                  className="p-6 flex flex-col gap-3"
                  style={{
                    borderRadius: 18,
                    background: activePet.bgGradient,
                    border: `1.5px solid ${activePet.accentColor}20`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 36 }}>{activePet.emoji}</span>
                    <h3
                      className="font-semibold text-[#1d1d1f] leading-snug"
                      style={{ fontSize: 19, letterSpacing: "-0.374px" }}
                    >
                      {activePet.headline}
                    </h3>
                  </div>
                  <p className="text-[#3a3a3c]" style={{ fontSize: 13, letterSpacing: "-0.12px", lineHeight: 1.5 }}>
                    {activePet.sub}
                  </p>
                </div>

                {/* Fact callout */}
                <div
                  className="px-4 py-3 flex items-start gap-3"
                  style={{
                    borderRadius: 12,
                    background: "rgba(0,0,0,0.03)",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <span style={{ fontSize: 20 }}>💡</span>
                  <p className="text-[#3a3a3c]" style={{ fontSize: 13, lineHeight: 1.5 }}>
                    {activePet.fact}
                  </p>
                </div>

                {/* Risk note */}
                <div
                  className="px-4 py-3"
                  style={{ borderRadius: 12, background: "#fff8f0", border: "1px solid #fed7aa" }}
                >
                  <div className="text-[#92400e] font-semibold mb-1" style={{ fontSize: 11 }}>
                    ⚠ Common health risks
                  </div>
                  <p className="text-[#78350f]" style={{ fontSize: 12 }}>
                    {activePet.riskNote}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href="/compare"
                  className="flex items-center justify-center gap-2 text-white transition-colors active:scale-95 mt-auto"
                  style={{
                    borderRadius: 9999,
                    fontSize: 15,
                    fontWeight: 500,
                    padding: "13px 24px",
                    background: activePet.accentColor,
                    boxShadow: `0 4px 14px ${activePet.accentColor}40`,
                  }}
                >
                  {activePet.ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
