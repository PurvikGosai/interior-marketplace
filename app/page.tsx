import Image from "next/image";
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

const fallbackLabourTeams = [
  "Electricians",
  "POP artists",
  "Wall artists",
  "Painters",
  "Carpenters",
  "Plumbers",
  "Tile masons",
  "False ceiling teams",
  "Civil masons",
  "Granite installers",
  "Marble polishers",
  "Wallpaper installers",
  "Texture painters",
  "Gypsum board installers",
  "HVAC technicians",
  "AC installers",
  "Smart home technicians",
  "CCTV installers",
  "Networking technicians",
  "Modular kitchen fitters",
  "Wardrobe installers",
  "Furniture polishers",
  "Upholstery workers",
  "Curtain installers",
  "Blinds installers",
  "Glass partition installers",
  "Aluminium fabricators",
  "Welders",
  "MS fabricators",
  "Stainless steel fabricators",
  "Waterproofing teams",
  "Flooring installers",
  "Vinyl flooring workers",
  "Wooden flooring installers",
  "Epoxy flooring teams",
  "Stone cladding workers",
  "Exterior painters",
  "Deep cleaning crews",
  "Site supervisors",
  "Demolition workers",
  "Loaders and helpers",
  "Drilling teams",
  "Core cutting workers",
  "Pest control technicians",
  "Gardening teams",
  "Landscape workers",
  "Swimming pool technicians",
  "Solar panel installers",
  "Fire safety installers",
  "Signage installers",
];

type ProviderCard = {
  name: string;
  city: string;
  specialty: string;
  rating: string;
};

function getCategoryAccent(accentClass: string) {
  const accents: Record<string, string> = {
    "bg-amber-700": "bg-amber-700",
    "bg-emerald-900": "bg-emerald-900",
    "bg-stone-900": "bg-stone-900",
    "bg-teal-800": "bg-teal-800",
  };

  return accents[accentClass] ?? "bg-stone-900";
}

function getProviderFallback(data: unknown, fallback: ProviderCard[]) {
  return Array.isArray(data) && data.length > 0
    ? (data as ProviderCard[])
    : fallback;
}

function ProviderGrid({ providers }: { providers: ProviderCard[] }) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {providers.map((provider) => (
        <article
          className="rounded-lg border border-[#ded7ca] bg-white p-5 shadow-sm"
          key={provider.name}
        >
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
        </article>
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
      labourTeams: fallbackLabourTeams,
      interiorFirms: fallbackInteriorFirms,
      materialSuppliers: fallbackMaterialSuppliers,
      architectFirms: fallbackArchitectFirms,
    };
  }

  const [
    categoriesResult,
    locationsResult,
    labourTeamsResult,
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
        .from("labour_teams")
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
    labourTeams:
      labourTeamsResult.data && labourTeamsResult.data.length > 0
        ? labourTeamsResult.data.map((team) => team.name)
        : fallbackLabourTeams,
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
    categories,
    locations,
    labourTeams,
    interiorFirms,
    materialSuppliers,
    architectFirms,
  } = await getMarketplaceData();
  const cityOptions = Array.from(new Set([...locations, ...fallbackLocations])).sort();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ef] text-[#1b1b1d]">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-white/20 bg-[#10100f]/55 text-white backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a className="text-sm font-semibold uppercase tracking-[0.28em]" href="#">
            Maison Market
          </a>
          <div className="hidden items-center gap-8 text-sm text-white/78 md:flex">
            <a className="transition hover:text-white" href="#interior-designers">
              Interior designers
            </a>
            <a className="transition hover:text-white" href="#architects">
              Architects
            </a>
            <a className="transition hover:text-white" href="#material">
              Material
            </a>
            <a className="transition hover:text-white" href="#man-power">
              Man power
            </a>
            <a className="transition hover:text-white" href="#location">
              Location
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              className="rounded-full border border-white/35 px-4 py-2 text-sm font-medium transition hover:border-white hover:bg-white/10"
              href="/login"
            >
              Login
            </a>
          </div>
        </nav>
      </header>

      <section className="relative min-h-[92vh] text-white">
        <Image
          src="/interior-marketplace-hero.png"
          alt="Luxury contemporary living room with curated furniture and sculptural lighting"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,13,12,0.88)_0%,rgba(12,13,12,0.64)_38%,rgba(12,13,12,0.08)_76%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f8f5ef] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8 lg:pb-20">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/82 backdrop-blur">
              Curated interiors, sourced beautifully
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[0.98] sm:text-7xl lg:text-8xl">
              The premium marketplace for finished spaces.
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-white/78 sm:text-xl">
              Discover interior studios, collectible furniture, artisan
              lighting, and trade-ready materials from a single refined source.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#151515] shadow-2xl shadow-black/20 transition hover:bg-[#f3eadc]"
                href="#interior-designers"
              >
                Find designers
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                href="#architects"
              >
                Find architects
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([value, label]) => (
              <div
                className="border-t border-white/24 pt-4 text-white/82"
                key={label}
              >
                <div className="text-3xl font-semibold text-white">{value}</div>
                <div className="mt-1 text-sm uppercase tracking-[0.18em]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-20"
        id="location"
      >
        <div className="grid gap-8 rounded-lg border border-[#ded7ca] bg-white p-6 shadow-sm md:grid-cols-[0.92fr_1.08fr] md:p-8 lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6b675f]">
              Location based marketplace
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#171716] sm:text-5xl">
              Find nearby interior experts, suppliers, and labour teams.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#605b52]">
              Select your city or project area to discover available designers,
              architects, material vendors, electricians, POP artists, wall
              artists, and other workers around you.
            </p>
          </div>

          <div className="rounded-lg bg-[#f8f5ef] p-5 md:p-6">
            <label
              className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6b675f]"
              htmlFor="city-search"
            >
              Search or select project city
            </label>
            <input
              className="mt-3 min-h-12 w-full rounded-full border border-[#d3c8b7] bg-white px-5 text-base text-[#171716] outline-none transition placeholder:text-[#9b948a] focus:border-[#35564d]"
              id="city-search"
              list="city-options"
              placeholder="Type or choose a city in India"
              type="search"
            />
            <datalist id="city-options">
              {cityOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </datalist>
            <a
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#171716] px-6 text-sm font-semibold text-white transition hover:bg-[#35564d]"
              href="#interior-designers"
            >
              Find providers in this city
            </a>
            <p className="mt-4 text-sm leading-6 text-[#605b52]">
              Start typing to search the list, or open the field suggestions to
              choose from available Indian cities.
            </p>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-24"
        id="interior-designers"
      >
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6b675f]">
              Interior designers
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#171716] sm:text-5xl">
              Find the right designer for every room, budget, and style.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#605b52] lg:justify-self-end">
            Browse verified interior designers by portfolio, city, project
            type, availability, and design language, then shortlist the teams
            that match your requirement.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <a
              className="group rounded-lg border border-[#ded7ca] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#a89472] hover:shadow-xl hover:shadow-stone-900/8"
              href="#interior-designers"
              key={category.name}
            >
              <span
                className={`block h-2 w-12 rounded-full ${getCategoryAccent(
                  category.accent_class,
                )}`}
              />
              <h3 className="mt-10 text-2xl font-semibold tracking-tight">
                {category.name}
              </h3>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-[#777167]">
                {category.count_label}
              </p>
              <span className="mt-8 inline-block text-sm font-semibold text-[#35564d] transition group-hover:translate-x-1">
                Browse category
              </span>
            </a>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6b675f]">
            Featured interior firms
          </p>
          <ProviderGrid providers={interiorFirms} />
        </div>
      </section>

      <section
        className="scroll-mt-24 bg-[#171716] px-5 py-20 text-white sm:px-8 lg:py-24"
        id="material"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c9b98f]">
                Material marketplace
              </p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                Curated material and product supply with trade clarity.
              </h2>
            </div>
            <a
              className="inline-flex w-fit rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white/84 transition hover:border-white hover:text-white"
              href="#material"
            >
              View all material
            </a>
          </div>

          <div className="mt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#c9b98f]">
              Featured material suppliers
            </p>
            <ProviderGrid providers={materialSuppliers} />
          </div>
        </div>
      </section>

      <section
        className="mx-auto grid max-w-7xl scroll-mt-24 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:py-24"
        id="architects"
      >
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6b675f]">
            Architects
          </p>
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Architecture support for planning, drawings, and execution.
          </h2>
          <p className="text-lg leading-8 text-[#605b52]">
            Connect with architects for layouts, structure coordination,
            authority drawings, site planning, BOQs, and execution-ready
            documentation.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            ["01", "Create a project palette", "Save products, finishes, studios, and inspiration into client-ready boards."],
            ["02", "Validate every specification", "Confirm dimensions, finish batches, stock windows, and trade pricing before purchase."],
            ["03", "Coordinate fulfillment", "Track vendors, freight, receiver notes, and install deadlines from one dashboard."],
          ].map(([step, title, copy]) => (
            <div
              className="grid gap-5 rounded-lg border border-[#ded7ca] bg-white p-6 shadow-sm sm:grid-cols-[4rem_1fr]"
              key={step}
            >
              <div className="text-3xl font-semibold text-[#a97d32]">{step}</div>
              <div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-7 text-[#605b52]">{copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6b675f]">
            Featured architect firms
          </p>
          <ProviderGrid providers={architectFirms} />
        </div>
      </section>

      <section
        className="scroll-mt-24 bg-[#d9d0c0] px-5 py-16 sm:px-8"
        id="man-power"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#5f584f]">
              Man power
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-[#171716] sm:text-5xl">
              Find skilled labour workers for every interior site task.
            </h2>
          </div>
          <div className="rounded-lg bg-[#171716] p-6 text-white shadow-2xl shadow-stone-900/20">
            <p className="text-lg leading-8 text-white/76">
              Connect with electricians, POP artists, wall artists, painters,
              carpenters, plumbers, tile masons, ceiling teams, and other
              skilled workers needed for residential and commercial interiors.
            </p>
            <div className="mt-6 rounded-lg border border-white/16 bg-white/8 p-4">
              <label
                className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70"
                htmlFor="labour-search"
              >
                Search or select labour type
              </label>
              <input
                className="mt-3 min-h-12 w-full rounded-full border border-white/16 bg-[#171716] px-5 text-base text-white outline-none transition placeholder:text-white/42 focus:border-white"
                id="labour-search"
                list="labour-options"
                placeholder={`Type or choose from ${labourTeams.length} labour types`}
                type="search"
              />
              <datalist id="labour-options">
                {labourTeams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </datalist>
            </div>
            <a
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#171716] transition hover:bg-[#f3eadc]"
              href="mailto:partners@maisonmarket.example"
            >
              Request labour workers
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
