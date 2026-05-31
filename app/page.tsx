import Image from "next/image";
import Link from "next/link";
import { Crown } from "lucide-react";
import { BrandIntro } from "@/app/components/BrandIntro";
import { MarketplaceHeader } from "@/app/components/MarketplaceHeader";
import { MarketplaceSearch } from "@/app/components/MarketplaceSearch";
import {
  featuredService,
  portfolioProjects,
  primaryServices,
  secondaryServices,
} from "@/app/data/marketplace";
import { createSupabaseClient } from "@/lib/supabase";

const fallbackCategories = [
  {
    name: "Interior studios",
    count_label: "420 vetted partners",
    accent_class: "bg-emerald-900",
  },
  {
    name: "Statement furniture",
    count_label: "1,850 ready pieces",
    accent_class: "bg-stone-900",
  },
  {
    name: "Lighting ateliers",
    count_label: "310 sculptural edits",
    accent_class: "bg-amber-700",
  },
  {
    name: "Surface libraries",
    count_label: "2,400 material samples",
    accent_class: "bg-teal-800",
  },
];

const fallbackInteriorFirms = [
  {
    name: "Aaranya Atelier",
    city: "Mumbai",
    specialty: "Warm luxury homes, turnkey apartments, and custom furniture",
    rating: "4.9",
  },
  {
    name: "Studio Vistara",
    city: "Bengaluru",
    specialty: "Minimal villas, spatial planning, and material-led interiors",
    rating: "4.8",
  },
  {
    name: "Nivasa Design House",
    city: "Delhi NCR",
    specialty: "Premium residences, wardrobes, kitchens, and styling",
    rating: "4.9",
  },
  {
    name: "Lumen & Lime Interiors",
    city: "Pune",
    specialty: "Compact urban homes, lighting plans, and renovation work",
    rating: "4.7",
  },
  {
    name: "Casa Mehr Studio",
    city: "Hyderabad",
    specialty: "Contemporary family homes, finishes, and project coordination",
    rating: "4.8",
  },
];

const fallbackMaterialSuppliers = [
  {
    name: "Marble & Grain Co.",
    city: "Jaipur",
    specialty: "Natural stone, quartz slabs, and premium countertop sourcing",
    rating: "4.8",
  },
  {
    name: "Brassline Hardware",
    city: "Mumbai",
    specialty: "Handles, hinges, locks, wardrobe systems, and fittings",
    rating: "4.7",
  },
  {
    name: "Terra Tile Depot",
    city: "Ahmedabad",
    specialty: "Porcelain tiles, handmade tiles, cladding, and mosaics",
    rating: "4.9",
  },
  {
    name: "Oak & Veneer Supply",
    city: "Bengaluru",
    specialty: "Plywood, veneer, laminates, fluted panels, and wall surfaces",
    rating: "4.8",
  },
  {
    name: "Lumora Lighting Trade",
    city: "Delhi NCR",
    specialty: "Architectural lights, profile systems, and decorative fixtures",
    rating: "4.7",
  },
];

const fallbackArchitectFirms = [
  {
    name: "Axis Courtyard Architects",
    city: "Delhi NCR",
    specialty: "Residential planning, approvals, facade design, and site BOQs",
    rating: "4.9",
  },
  {
    name: "Prism Habitat Studio",
    city: "Mumbai",
    specialty: "Apartment layouts, redevelopment homes, and detail drawings",
    rating: "4.8",
  },
  {
    name: "Gridline Works",
    city: "Hyderabad",
    specialty: "Commercial interiors, working drawings, and MEP coordination",
    rating: "4.7",
  },
  {
    name: "Arka Form Lab",
    city: "Bengaluru",
    specialty: "Villas, farmhouses, passive design, and construction detailing",
    rating: "4.9",
  },
  {
    name: "Northlight Planning Co.",
    city: "Pune",
    specialty: "Floor plans, structural coordination, and municipal drawings",
    rating: "4.8",
  },
];

const stats = [
  ["18k+", "curated products"],
  ["740", "design professionals"],
  ["46", "global maker regions"],
  ["4.9/5", "project concierge rating"],
];

const fallbackLocations = [
  "Agartala",
  "Agra",
  "Ahmedabad",
  "Ahmednagar",
  "Aizawl",
  "Ajmer",
  "Akola",
  "Alappuzha",
  "Aligarh",
  "Allahabad",
  "Alwar",
  "Ambala",
  "Amravati",
  "Amritsar",
  "Anand",
  "Anantapur",
  "Asansol",
  "Aurangabad",
  "Bareilly",
  "Bathinda",
  "Belagavi",
  "Bengaluru",
  "Berhampur",
  "Bhagalpur",
  "Bharuch",
  "Bhavnagar",
  "Bhilai",
  "Bhopal",
  "Bhubaneswar",
  "Bikaner",
  "Bilaspur",
  "Bokaro",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Dehradun",
  "Delhi NCR",
  "Dhanbad",
  "Durgapur",
  "Erode",
  "Faridabad",
  "Gandhinagar",
  "Ghaziabad",
  "Gorakhpur",
  "Guntur",
  "Gurugram",
  "Guwahati",
  "Gwalior",
  "Haldwani",
  "Hisar",
  "Hubballi",
  "Hyderabad",
  "Imphal",
  "Indore",
  "Itanagar",
  "Jabalpur",
  "Jaipur",
  "Jalandhar",
  "Jammu",
  "Jamnagar",
  "Jamshedpur",
  "Jhansi",
  "Jodhpur",
  "Jorhat",
  "Kadapa",
  "Kakinada",
  "Kannur",
  "Kanpur",
  "Karnal",
  "Kochi",
  "Kolhapur",
  "Kolkata",
  "Kollam",
  "Kota",
  "Kozhikode",
  "Kurnool",
  "Lucknow",
  "Ludhiana",
  "Madurai",
  "Mangaluru",
  "Mathura",
  "Meerut",
  "Mohali",
  "Mumbai",
  "Mysuru",
  "Nagpur",
  "Nashik",
  "Navi Mumbai",
  "Noida",
  "Panaji",
  "Panipat",
  "Patiala",
  "Patna",
  "Pondicherry",
  "Pune",
  "Raipur",
  "Rajahmundry",
  "Rajkot",
  "Ranchi",
  "Rohtak",
  "Rourkela",
  "Salem",
  "Sambalpur",
  "Shillong",
  "Shimla",
  "Siliguri",
  "Solapur",
  "Srinagar",
  "Surat",
  "Thane",
  "Thiruvananthapuram",
  "Thrissur",
  "Tiruchirappalli",
  "Tirupati",
  "Tiruppur",
  "Udaipur",
  "Ujjain",
  "Vadodara",
  "Varanasi",
  "Vellore",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
];

type ProviderCard = {
  name: string;
  city: string;
  specialty: string;
  rating: string;
};

function getProviderFallback(data: unknown, fallback: ProviderCard[]) {
  return Array.isArray(data) && data.length > 0
    ? (data as ProviderCard[])
    : fallback;
}

function ProviderGrid({
  href,
  providers,
}: {
  href: string;
  providers: ProviderCard[];
}) {
  const providerImages = [
    "/marketplace/interior-living.png",
    "/marketplace/portfolio-kitchen.png",
    "/marketplace/portfolio-bedroom.png",
    "/marketplace/portfolio-bath.png",
    "/marketplace/material-library.png",
  ];

  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {providers.map((provider, index) => (
        <Link
          className="overflow-hidden rounded-lg border border-[#ded7ca] bg-white shadow-sm"
          href={href}
          key={provider.name}
        >
          <div className="relative aspect-[16/10]">
            <Image
              alt={`${provider.name} portfolio`}
              className="object-cover"
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
              src={providerImages[index % providerImages.length]}
            />
          </div>
          <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold leading-tight text-[#171716]">
              {provider.name}
            </h3>
            <span className="rounded-full bg-[#eef3ef] px-2.5 py-1 text-xs font-semibold text-[#35564d]">
              {provider.rating}
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#777167]">
            {provider.city}
          </p>
          <p className="mt-4 text-sm leading-6 text-[#605b52]">
            {provider.specialty}
          </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

async function getMarketplaceData() {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return {
      categories: fallbackCategories,
      locations: fallbackLocations,
      interiorFirms: fallbackInteriorFirms,
      materialSuppliers: fallbackMaterialSuppliers,
      architectFirms: fallbackArchitectFirms,
    };
  }

  const [
    categoriesResult,
    locationsResult,
    interiorFirmsResult,
    materialSuppliersResult,
    architectFirmsResult,
  ] = await Promise.all([
      supabase
        .from("marketplace_categories")
        .select("name,count_label,accent_class,display_order")
        .order("display_order", { ascending: true }),
      supabase
        .from("marketplace_locations")
        .select("name,display_order")
        .order("display_order", { ascending: true }),
      supabase
        .from("interior_firms")
        .select("name,city,specialty,rating,display_order")
        .order("display_order", { ascending: true }),
      supabase
        .from("material_suppliers")
        .select("name,city,specialty,rating,display_order")
        .order("display_order", { ascending: true }),
      supabase
        .from("architect_firms")
        .select("name,city,specialty,rating,display_order")
        .order("display_order", { ascending: true }),
    ]);

  return {
    categories:
      categoriesResult.data && categoriesResult.data.length > 0
        ? categoriesResult.data
        : fallbackCategories,
    locations:
      locationsResult.data && locationsResult.data.length > 0
        ? locationsResult.data.map((location) => location.name)
        : fallbackLocations,
    interiorFirms: getProviderFallback(
      interiorFirmsResult.data,
      fallbackInteriorFirms,
    ),
    materialSuppliers: getProviderFallback(
      materialSuppliersResult.data,
      fallbackMaterialSuppliers,
    ),
    architectFirms: getProviderFallback(
      architectFirmsResult.data,
      fallbackArchitectFirms,
    ),
  };
}

export default async function Home() {
  const {
    locations,
    interiorFirms,
    materialSuppliers,
    architectFirms,
  } = await getMarketplaceData();
  const cityOptions = Array.from(new Set([...locations, ...fallbackLocations])).sort();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ef] text-[#1b1b1d]">
      <BrandIntro />
      <div className="marketplace-entrance">
      <MarketplaceHeader />

      <section className="relative min-h-[660px] text-white lg:min-h-[calc(100vh-6.5rem)]">
        <Image
          src="/interior-marketplace-hero.png"
          alt="Luxury contemporary living room with curated furniture and sculptural lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,18,16,0.28)_0%,rgba(13,18,16,0.56)_64%,rgba(13,18,16,0.88)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[660px] max-w-7xl items-end px-5 pb-14 pt-16 sm:px-8 lg:min-h-[calc(100vh-6.5rem)] lg:pb-20">
          <div className="mx-auto w-full max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
              Interior planning, sourcing, and execution
            </p>
            <h1 className="mt-4 text-balance text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              Your space, designed your way.
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-pretty text-lg leading-8 text-white/86 sm:text-xl">
              Find trusted interior designers, architects, and material
              suppliers across India.
            </p>

            <div className="mt-8 text-left">
              <MarketplaceSearch cities={cityOptions} />
            </div>

            <p className="mt-5 text-sm leading-6 text-white/78">
              Popular searches: Interior designers in Mumbai | Architects in
              Bengaluru | Electricians in Pune | Tile suppliers in Delhi NCR
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e5ded2] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a67638]">
                Popular searches
              </p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Start with the service you need
              </h2>
            </div>
            <Link className="hidden text-sm font-semibold text-[#35564d] sm:block" href="/services/featured-listings">
              View featured listings
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {primaryServices
              .filter((service) => service.slug !== "skilled-workers")
              .map((service) => (
              <Link className="group" href={`/services/${service.slug}`} key={service.slug}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    alt={service.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    src={service.image}
                  />
                </div>
                <h3 className="mt-3 text-lg font-semibold">{service.title}</h3>
                <p className="mt-1 text-sm text-[#70695f]">
                  Explore verified profiles and portfolios
                </p>
              </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e5ded2] bg-[#fbfaf7]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a67638]">
                Interior categories
              </p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Browse the marketplace by category
              </h2>
            </div>
            <Link className="text-sm font-semibold text-[#35564d]" href="/services/interior-designers">
              View all categories
            </Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {secondaryServices.slice(0, 6).map((service, index) => (
              <Link
                className={`group grid min-h-36 overflow-hidden rounded-lg md:grid-cols-[1.1fr_0.9fr] ${
                  index % 3 === 0
                    ? "bg-[#dbe4df]"
                    : index % 3 === 1
                      ? "bg-[#ead9c9]"
                      : "bg-[#e8e1d6]"
                }`}
                href={`/services/${service.slug}`}
                key={service.slug}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#605b52]">
                    {service.description}
                  </p>
                </div>
                <div className="relative min-h-36 overflow-hidden">
                  <Image
                    alt={service.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    src={service.image}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e5ded2] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#a67638]">
                <Crown className="size-5 fill-[#efd9a7]" />
                Featured listings
              </p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Profiles getting noticed this week
              </h2>
            </div>
            <Link className="text-sm font-semibold text-[#35564d]" href={`/services/${featuredService.slug}`}>
              Explore True Select
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {primaryServices.slice(0, 3).map((service) => (
              <Link
                className="group overflow-hidden rounded-lg border border-[#e5ded2] bg-[#fbfaf7]"
                href={`/services/${featuredService.slug}`}
                key={service.slug}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    alt={service.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src={service.image}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-1 text-sm text-[#70695f]">
                    Featured professionals and complete profiles
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl scroll-mt-28 px-5 py-16 sm:px-8 lg:py-20"
        id="interior-designers"
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a67638]">
              Popular interior firms
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Designers for every room, budget, and style.
            </h2>
          </div>
          <Link className="text-sm font-semibold text-[#35564d]" href="/services/interior-designers">
            View all designers
          </Link>
        </div>
        <ProviderGrid href="/services/interior-designers" providers={interiorFirms} />
      </section>

      <section
        className="scroll-mt-28 bg-[#1e312d] px-5 py-16 text-white sm:px-8 lg:py-20"
        id="material"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4b27a]">
                Material suppliers
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Source materials with dependable local supply.
              </h2>
            </div>
            <Link
              className="inline-flex w-fit rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white/84 transition hover:border-white hover:text-white"
              href="/services/material-suppliers"
            >
              View all material
            </Link>
          </div>

          <ProviderGrid href="/services/material-suppliers" providers={materialSuppliers} />
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl scroll-mt-28 px-5 py-16 sm:px-8 lg:py-20"
        id="architects"
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a67638]">
              Architect firms
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Planning expertise for confident execution.
            </h2>
          </div>
          <Link className="text-sm font-semibold text-[#35564d]" href="/services/architects">
            View all architects
          </Link>
        </div>
        <ProviderGrid href="/services/architects" providers={architectFirms} />
      </section>

      <section className="bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl pb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a67638]">
            Real portfolio stories
          </p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Finished spaces from marketplace studios
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <Link
                className="group overflow-hidden rounded-lg border border-[#e5ded2] bg-[#fbfaf7]"
                href="/services/featured-listings"
                key={project.title}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    alt={project.title}
                    className="object-cover transition duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    src={project.image}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-[#70695f]">
                    {project.studio} | {project.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-5 border-y border-[#e5ded2] py-7 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label}>
              <p className="text-3xl font-semibold text-[#23443d]">{value}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.16em] text-[#70695f]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-[#172723] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold tracking-[0.14em]">TRUE DESIGNS</p>
            <p className="mt-2 text-sm text-white/65">
              Interior expertise, materials, and site teams in one place.
            </p>
          </div>
          <Link className="text-sm font-semibold text-[#d4b27a]" href="/login">
            List your business
          </Link>
        </div>
      </footer>
      </div>
    </main>
  );
}
