import Link from "next/link";
import { ArrowRight, Shield, Eye, Users, Zap } from "lucide-react";

const team = [
  { name: "Alex Morgan", role: "Founder & CEO", emoji: "👨‍💼" },
  { name: "Sarah Chen", role: "Head of Insurance Research", emoji: "👩‍🔬" },
  { name: "James Rivera", role: "Lead Engineer", emoji: "👨‍💻" },
  { name: "Priya Patel", role: "Customer Success", emoji: "👩‍💼" },
];

const values = [
  {
    icon: Eye,
    title: "Full Transparency",
    description:
      "We show you all costs, exclusions, and fine print — no hidden fees, no sponsored rankings.",
  },
  {
    icon: Shield,
    title: "Unbiased Comparisons",
    description:
      "Our ranking algorithm is based purely on coverage quality, pricing, and customer reviews.",
  },
  {
    icon: Users,
    title: "Built for Pet Owners",
    description:
      "Designed by pet owners who struggled to find clear, honest insurance information.",
  },
  {
    icon: Zap,
    title: "Always Up to Date",
    description:
      "We update plan details regularly to ensure the information you see is current and accurate.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      {/* Hero */}
      <section className="bg-[#1E3A8A] py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-bebas text-7xl tracking-widest text-white mb-6 leading-none">
            WE EXIST SO YOUR PET GETS THE{" "}
            <span className="text-brand-red">CARE IT DESERVES.</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Compare Pet Plans was founded by pet owners who were frustrated by opaque insurance comparisons,
            confusing policies, and providers who didn&apos;t cover exotic animals.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0D1B3E] border border-white/10 p-8 md:p-12">
          <h2 className="font-bebas text-4xl tracking-widest text-white mb-6">
            OUR MISSION
          </h2>
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>
              Pet insurance is one of the most important financial decisions a pet owner can make
              — yet the industry has historically been confusing, inconsistent, and exclusionary.
            </p>
            <p>
              Compare Pet Plans changes that. We aggregate coverage from across the industry, normalize the
              data for easy comparison, and present it transparently — so you can make the best
              decision for your specific pet, budget, and risk tolerance.
            </p>
            <p>
              We cover dogs, cats, birds, rabbits, reptiles, and exotic animals. We believe every
              companion animal deserves access to quality veterinary care, regardless of species.
            </p>
          </div>
        </div>
      </section>

      {/* How the tool works */}
      <section className="py-16 bg-[#0D1B3E] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bebas text-4xl tracking-widest text-white mb-8 text-center">
            HOW THE TOOL WORKS
          </h2>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              Our comparison database is maintained by a dedicated research team that reviews
              insurance policy documents, monitors pricing changes, and verifies coverage details
              directly with providers on a rolling basis.
            </p>
            <p>
              When you filter by animal type, price, or coverage parameters, we apply those
              filters in real-time against our normalized dataset. No provider pays to appear
              higher in results — rankings are determined entirely by rating, pricing, and
              relevant coverage for your selected criteria.
            </p>
            <p>
              When you click "Get a Quote" or "Contact", you're directed to the provider's own
              systems. Compare Pet Plans does not process insurance applications or handle premium payments.
              We are a comparison and education platform only.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-bebas text-4xl tracking-widest text-white mb-12 text-center">
          WHAT WE STAND FOR
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((v) => (
            <div key={v.title} className="bg-[#0D1B3E] border border-white/10 p-6 flex gap-4">
              <div className="w-10 h-10 bg-brand-navy flex items-center justify-center flex-shrink-0">
                <v.icon className="w-5 h-5 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-bebas text-xl tracking-wide text-white mb-1">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-[#0D1B3E] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bebas text-4xl tracking-widest text-white mb-12 text-center">
            THE TEAM
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-black/30 border border-white/10 p-5 text-center"
              >
                <div className="text-4xl mb-3">{member.emoji}</div>
                <div className="font-semibold text-white text-sm">{member.name}</div>
                <div className="text-gray-500 text-xs mt-1">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1E3A8A]">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="font-bebas text-4xl tracking-widest text-white mb-4">
            START COMPARING TODAY
          </h2>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 bg-brand-red text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
          >
            Compare Plans <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
