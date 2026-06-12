"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Globe, Mail, Copy, Check, ExternalLink } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ContactModal() {
  const { activeModal, setActiveModal, contactInsurer } = useStore();
  const [copied, setCopied] = useState<string | null>(null);
  const isOpen = activeModal === "contact" && contactInsurer !== null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!contactInsurer) return null;

  const contacts = [
    { key: "phone", icon: Phone, label: "Phone", value: contactInsurer.contact.phone },
    { key: "website", icon: Globe, label: "Website", value: contactInsurer.contact.website },
    { key: "email", icon: Mail, label: "Email", value: contactInsurer.contact.email },
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
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            className="bg-[#0D1B3E] border border-white/10 w-full max-w-md overflow-hidden"
          >
            {/* Accent top border */}
            <div className="h-1 w-full" style={{ backgroundColor: contactInsurer.color }} />

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 flex items-center justify-center text-2xl"
                  style={{ backgroundColor: contactInsurer.color + "20", border: `1px solid ${contactInsurer.color}40` }}
                >
                  {contactInsurer.logo}
                </div>
                <div>
                  <h2
                    className="font-bebas text-xl tracking-wide"
                    style={{ color: contactInsurer.color }}
                  >
                    {contactInsurer.name}
                  </h2>
                  <p className="text-gray-500 text-xs">{contactInsurer.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact rows */}
            <div className="p-6 space-y-3">
              {contacts.map(({ key, icon: Icon, label, value }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 bg-black/20 border border-white/5 p-3"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-brand-navy">
                    <Icon className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{label}</div>
                    <div className="text-sm text-white truncate">{value}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-white border border-white/10 px-2 py-1 transition-colors"
                  >
                    {copied === key ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              ))}

              {/* Action buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={contactInsurer.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors"
                  style={{ backgroundColor: contactInsurer.color }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website →
                </a>
                <button className="flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-widest text-gray-300 border border-white/20 hover:border-white/40 hover:text-white transition-colors">
                  Request a Callback
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
