"use client";

import { useStore } from "@/lib/store";
import AnimalSelector from "./AnimalSelector";
import { Search, RotateCcw } from "lucide-react";

const reimbursementOptions = [
  { value: "any", label: "Any" },
  { value: "70", label: "70%+" },
  { value: "80", label: "80%+" },
  { value: "90", label: "90%+" },
  { value: "100", label: "100%" },
];

const annualMaxOptions = [
  { value: "any", label: "Any" },
  { value: "3000", label: "$3K+" },
  { value: "5000", label: "$5K+" },
  { value: "10000", label: "$10K+" },
  { value: "unlimited", label: "Unlimited" },
];

const deductibleOptions = [
  { value: "any", label: "Any" },
  { value: "under200", label: "Under $200" },
  { value: "200to500", label: "$200–$500" },
  { value: "500plus", label: "$500+" },
];

const waitingOptions = [
  { value: "any", label: "Any" },
  { value: "7", label: "Under 7 days" },
  { value: "14", label: "Under 14 days" },
];

const sortOptions = [
  { value: "rating", label: "Top Rated" },
  { value: "price", label: "Lowest Price" },
  { value: "reviews", label: "Most Reviews" },
  { value: "claims", label: "Fastest Claims" },
];

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#0F1F4A] border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-brand-blue appearance-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#0F1F4A]">
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default function FilterSidebar() {
  const { filters, updateFilter, resetFilters, comparedIds, setActiveModal } = useStore();

  return (
    <div className="flex flex-col gap-6">
      <AnimalSelector />

      <div className="w-full h-px bg-white/10" />

      {/* Price slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bebas text-sm tracking-widest text-gray-400 uppercase">Max Monthly Price</h3>
          <span className="text-brand-red font-bold text-sm">${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={10}
          max={200}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
          className="w-full accent-brand-red cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>$10</span>
          <span>$200</span>
        </div>
      </div>

      {/* Filter selects */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="font-bebas text-xs tracking-widest text-gray-400 uppercase">Reimbursement</label>
          <Select
            value={filters.minReimbursement}
            onChange={(v) => updateFilter("minReimbursement", v)}
            options={reimbursementOptions}
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-bebas text-xs tracking-widest text-gray-400 uppercase">Annual Max Coverage</label>
          <Select
            value={filters.maxAnnual}
            onChange={(v) => updateFilter("maxAnnual", v)}
            options={annualMaxOptions}
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-bebas text-xs tracking-widest text-gray-400 uppercase">Deductible</label>
          <Select
            value={filters.deductible}
            onChange={(v) => updateFilter("deductible", v)}
            options={deductibleOptions}
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-bebas text-xs tracking-widest text-gray-400 uppercase">Waiting Period</label>
          <Select
            value={filters.waitingPeriod}
            onChange={(v) => updateFilter("waitingPeriod", v)}
            options={waitingOptions}
          />
        </div>
      </div>

      {/* Search */}
      <div className="space-y-1.5">
        <label className="font-bebas text-xs tracking-widest text-gray-400 uppercase">Search Provider</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Provider name..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter("searchTerm", e.target.value)}
            className="w-full bg-[#0F1F4A] border border-white/10 text-white text-sm pl-9 pr-3 py-2 focus:outline-none focus:border-brand-blue placeholder-gray-600"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-1.5">
        <label className="font-bebas text-xs tracking-widest text-gray-400 uppercase">Sort By</label>
        <Select
          value={filters.sortBy}
          onChange={(v) => updateFilter("sortBy", v)}
          options={sortOptions}
        />
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="flex items-center gap-2 text-brand-red text-sm font-semibold hover:text-red-400 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset Filters
      </button>

      {/* Compare bar */}
      {comparedIds.length >= 2 && (
        <div className="border border-brand-blue/50 bg-brand-navy/40 p-4 space-y-3">
          <div className="text-xs text-gray-400 font-semibold">
            <span className="text-white font-bold">{comparedIds.length}</span> of 4 selected
          </div>
          <button
            onClick={() => setActiveModal("compare")}
            className="w-full bg-brand-navy border border-brand-blue text-white py-2.5 text-sm font-bold tracking-widest uppercase hover:bg-brand-blue transition-colors"
          >
            Compare Selected
          </button>
        </div>
      )}
    </div>
  );
}
