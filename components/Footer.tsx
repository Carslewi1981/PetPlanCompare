import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#060C1A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-red flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bebas text-2xl tracking-widest text-white">
                Compare Pet<span className="text-brand-red"> Plans</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The leading pet insurance comparison platform. Compare top providers for every animal type.
            </p>
          </div>

          {/* Compare */}
          <div>
            <h4 className="font-bebas text-lg tracking-widest text-white mb-4">Compare</h4>
            <ul className="space-y-2">
              {["Dogs", "Cats", "Birds", "Rabbits", "Reptiles", "Exotic Pets"].map((a) => (
                <li key={a}>
                  <Link href={`/compare?animal=${a.toLowerCase()}`} className="text-gray-500 hover:text-white text-sm transition-colors">
                    {a} Insurance
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bebas text-lg tracking-widest text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "How Deductibles Work", slug: "how-deductibles-work" },
                { label: "Pre-existing Conditions", slug: "pre-existing-conditions" },
                { label: "Exotic Pet Coverage", slug: "exotic-pet-coverage-guide" },
                { label: "When to Buy Insurance", slug: "when-to-buy-pet-insurance" },
              ].map((r) => (
                <li key={r.slug}>
                  <Link href={`/resources/${r.slug}`} className="text-gray-500 hover:text-white text-sm transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bebas text-lg tracking-widest text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Resources", href: "/resources" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-500 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-600 text-xs leading-relaxed max-w-4xl">
            <strong className="text-gray-500">Disclaimer:</strong> Compare Pet Plans is an independent comparison platform and is not affiliated with any insurance provider listed. Plan details, pricing, and availability are subject to change. Always verify coverage details directly with the provider before purchasing. Compare Pet Plans does not sell insurance and is not a licensed insurance agent.
          </p>
          <p className="text-gray-700 text-xs mt-4">
            © {new Date().getFullYear()} Compare Pet Plans. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
