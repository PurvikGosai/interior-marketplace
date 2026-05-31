"use client";

import { FormEvent, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { primaryServices, secondaryServices } from "@/app/data/marketplace";

const popularSearches = [
  ["Interior designers in Mumbai", "interior-designers", "Mumbai"],
  ["Architects in Bengaluru", "architects", "Bengaluru"],
  ["Stone suppliers in Jaipur", "stone-and-tiles", "Jaipur"],
  ["Electricians in Pune", "electricians", "Pune"],
  ["Turnkey studios in Delhi NCR", "turnkey-studios", "Delhi NCR"],
  ["Kitchen materials in Hyderabad", "material-suppliers", "Hyderabad"],
];

const searchServices = [...primaryServices, ...secondaryServices];

export function SearchExplorer() {
  const router = useRouter();
  const [service, setService] = useState("interior-designers");
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = query ? `?q=${encodeURIComponent(query)}` : "";
    router.push(`/services/${service}${search}`);
  }

  return (
    <div>
      <form
        className="grid overflow-hidden rounded-lg border border-[#ddd5ca] bg-white shadow-sm md:grid-cols-[17rem_1fr_auto]"
        onSubmit={handleSubmit}
      >
        <label className="relative flex min-h-16 items-center border-b border-[#ddd5ca] bg-[#23443d] px-5 text-white md:border-b-0 md:border-r">
          <span className="sr-only">Search category</span>
          <select
            className="w-full appearance-none bg-transparent pr-8 text-base font-semibold outline-none"
            onChange={(event) => setService(event.target.value)}
            value={service}
          >
            {searchServices.map((item) => (
              <option className="bg-white text-[#35312c]" key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-5 size-5" />
        </label>

        <label className="flex min-h-16 items-center gap-3 px-5">
          <Search className="size-5 shrink-0 text-[#a67638]" />
          <span className="sr-only">Search True Designs</span>
          <input
            autoFocus
            className="min-w-0 flex-1 text-base outline-none placeholder:text-[#9b948a]"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search designers, materials, workers, cities..."
            type="search"
            value={query}
          />
        </label>

        <button
          className="min-h-14 bg-[#a67638] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#875e2a] md:min-h-16"
          type="submit"
        >
          Search
        </button>
      </form>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold">Popular searches</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {popularSearches.map(([label, slug, city]) => (
            <button
              className="rounded-full border border-[#d8cbb8] bg-white px-4 py-3 text-sm font-medium text-[#35312c] transition hover:border-[#35564d] hover:text-[#35564d]"
              key={label}
              onClick={() =>
                router.push(`/services/${slug}?city=${encodeURIComponent(city)}`)
              }
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
