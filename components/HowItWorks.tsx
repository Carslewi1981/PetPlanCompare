const steps = [
  {
    number: "01",
    title: "Choose Your Animal",
    description:
      "Select your pet type from our full range: dogs, cats, birds, rabbits, reptiles, and exotic animals.",
  },
  {
    number: "02",
    title: "Filter by Price & Coverage",
    description:
      "Set your budget, desired reimbursement rate, annual maximum, and other key preferences.",
  },
  {
    number: "03",
    title: "Compare & Contact",
    description:
      "View plans side-by-side, compare features and exclusions, then contact providers directly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0A0A0A] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl tracking-widest text-white mb-3">
            HOW IT <span className="text-brand-red">WORKS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Finding the right pet insurance takes less than 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col p-8 border border-white/10 bg-[#0D1B3E] hover:border-brand-blue/30 transition-colors group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-white/10" />
              )}

              <div className="font-bebas text-7xl text-brand-red/20 leading-none mb-4 group-hover:text-brand-red/40 transition-colors">
                {step.number}
              </div>
              <h3 className="font-bebas text-2xl tracking-widest text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
