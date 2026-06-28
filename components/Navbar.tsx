"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/compare", label: "Compare" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const pathname = usePathname();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black" style={{ height: 44 }}>
      <div className="max-w-[980px] mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bebas text-lg tracking-widest text-white leading-none"
        >
          Petz Insurance<span className="text-[#0066cc]"> Compare</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[12px] tracking-[-0.12px] transition-colors ${
                pathname === link.href
                  ? "text-white"
                  : "text-[#a1a1a6] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Language dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-[#a1a1a6] hover:text-white transition-colors active:scale-95"
              style={{ fontSize: 12, letterSpacing: "-0.12px" }}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{selectedLang.flag}</span>
              <span>{selectedLang.code.toUpperCase()}</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 bg-[#1c1c1e] overflow-hidden"
                  style={{
                    borderRadius: 11,
                    border: "1px solid rgba(255,255,255,0.12)",
                    minWidth: 160,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/10"
                      style={{
                        fontSize: 13,
                        letterSpacing: "-0.12px",
                        color: selectedLang.code === lang.code ? "#ffffff" : "#a1a1a6",
                        background: selectedLang.code === lang.code ? "rgba(255,255,255,0.08)" : "transparent",
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {selectedLang.code === lang.code && (
                        <span className="ml-auto text-[#0066cc]">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/compare"
            className="text-[12px] bg-[#0066cc] text-white px-4 py-1.5 rounded-full tracking-[-0.12px] hover:bg-[#0071e3] transition-colors active:scale-95"
          >
            Compare Now
          </Link>
        </div>

        {/* Mobile: language + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile language picker */}
          <div className="relative" ref={undefined}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-[#a1a1a6]"
              style={{ fontSize: 12 }}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{selectedLang.flag}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 bg-[#1c1c1e] overflow-hidden"
                  style={{
                    borderRadius: 11,
                    border: "1px solid rgba(255,255,255,0.12)",
                    minWidth: 160,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    zIndex: 100,
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/10"
                      style={{
                        fontSize: 13,
                        color: selectedLang.code === lang.code ? "#ffffff" : "#a1a1a6",
                        background: selectedLang.code === lang.code ? "rgba(255,255,255,0.08)" : "transparent",
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {selectedLang.code === lang.code && (
                        <span className="ml-auto text-[#0066cc]">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            className="text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10"
          >
            <div className="max-w-[980px] mx-auto px-4 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-[14px] tracking-[-0.224px] ${
                    pathname === link.href ? "text-white" : "text-[#a1a1a6]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/compare"
                onClick={() => setMenuOpen(false)}
                className="text-[14px] bg-[#0066cc] text-white px-5 py-2 rounded-full text-center hover:bg-[#0071e3] transition-colors"
              >
                Compare Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
