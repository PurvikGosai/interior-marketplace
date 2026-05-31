"use client";

import { FormEvent, useState } from "react";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
  { label: "Interior designer", slug: "interior-designers" },
  { label: "Architect", slug: "architects" },
  { label: "Material supplier", slug: "material-suppliers" },
  { label: "Skilled worker", slug: "skilled-workers" },
];

export function MarketplaceSearch({ cities }: { cities: string[] }) {
  const router = useRouter();
  const [service, setService] = useState(services[0].slug);
  const [city, setCity] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = city ? `?city=${encodeURIComponent(city)}` : "";
    router.push(`/services/${service}${search}`);
  }

  return (
    <form
      className="grid overflow-hidden rounded-lg bg-white shadow-2xl shadow-black/25 md:grid-cols-[1fr_1fr_auto]"
      id="marketplace-search"
      onSubmit={handleSubmit}
    >
      <label className="flex min-h-16 items-center gap-3 border-b border-[#e5ded2] px-4 md:border-b-0 md:border-r">
        <Search className="size-5 shrink-0 text-[#a67638]" />
        <span className="sr-only">Select service</span>
        <select
          className="min-w-0 flex-1 bg-transparent text-base font-medium text-[#35312c] outline-none"
          onChange={(event) => setService(event.target.value)}
          value={service}
        >
          {services.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex min-h-16 items-center gap-3 border-b border-[#e5ded2] px-4 md:border-b-0">
        <MapPin className="size-5 shrink-0 text-[#a67638]" />
        <span className="sr-only">Search city</span>
        <input
          className="min-w-0 flex-1 bg-transparent text-base font-medium text-[#35312c] outline-none placeholder:text-[#8f877d]"
          list="hero-city-options"
          onChange={(event) => setCity(event.target.value)}
          placeholder="Search or select city"
          type="search"
          value={city}
        />
        <datalist id="hero-city-options">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>
      </label>

      <button
        className="min-h-16 bg-[#a67638] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#875e2a]"
        type="submit"
      >
        Get started
      </button>
    </form>
  );
}
