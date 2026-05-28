create table if not exists public.marketplace_categories (
  id bigint primary key generated always as identity,
  name text not null,
  count_label text not null,
  accent_class text not null default 'bg-stone-900',
  display_order integer not null default 0
);

create table if not exists public.marketplace_locations (
  id bigint primary key generated always as identity,
  name text not null,
  display_order integer not null default 0
);

create table if not exists public.labour_teams (
  id bigint primary key generated always as identity,
  name text not null,
  display_order integer not null default 0
);

create table if not exists public.interior_firms (
  id bigint primary key generated always as identity,
  name text not null,
  city text not null,
  specialty text not null,
  rating text not null default '4.8',
  display_order integer not null default 0
);

create table if not exists public.material_suppliers (
  id bigint primary key generated always as identity,
  name text not null,
  city text not null,
  specialty text not null,
  rating text not null default '4.8',
  display_order integer not null default 0
);

create table if not exists public.architect_firms (
  id bigint primary key generated always as identity,
  name text not null,
  city text not null,
  specialty text not null,
  rating text not null default '4.8',
  display_order integer not null default 0
);

create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('customer', 'business')),
  full_name text,
  contact_name text,
  business_name text,
  service_type text,
  city text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.marketplace_categories enable row level security;
alter table public.marketplace_locations enable row level security;
alter table public.labour_teams enable row level security;
alter table public.interior_firms enable row level security;
alter table public.material_suppliers enable row level security;
alter table public.architect_firms enable row level security;
alter table public.user_profiles enable row level security;

create unique index if not exists marketplace_categories_name_key
on public.marketplace_categories (name);

create unique index if not exists marketplace_locations_name_key
on public.marketplace_locations (name);

create unique index if not exists labour_teams_name_key
on public.labour_teams (name);

create unique index if not exists interior_firms_name_key
on public.interior_firms (name);

create unique index if not exists material_suppliers_name_key
on public.material_suppliers (name);

create unique index if not exists architect_firms_name_key
on public.architect_firms (name);

drop policy if exists "public can read marketplace categories" on public.marketplace_categories;
create policy "public can read marketplace categories"
on public.marketplace_categories
for select
to anon
using (true);

drop policy if exists "public can read marketplace locations" on public.marketplace_locations;
create policy "public can read marketplace locations"
on public.marketplace_locations
for select
to anon
using (true);

drop policy if exists "public can read labour teams" on public.labour_teams;
create policy "public can read labour teams"
on public.labour_teams
for select
to anon
using (true);

drop policy if exists "public can read interior firms" on public.interior_firms;
create policy "public can read interior firms"
on public.interior_firms
for select
to anon
using (true);

drop policy if exists "public can read material suppliers" on public.material_suppliers;
create policy "public can read material suppliers"
on public.material_suppliers
for select
to anon
using (true);

drop policy if exists "public can read architect firms" on public.architect_firms;
create policy "public can read architect firms"
on public.architect_firms
for select
to anon
using (true);

drop policy if exists "users can read own profile" on public.user_profiles;
create policy "users can read own profile"
on public.user_profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "users can insert own profile" on public.user_profiles;
create policy "users can insert own profile"
on public.user_profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "users can update own profile" on public.user_profiles;
create policy "users can update own profile"
on public.user_profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

insert into public.marketplace_categories (name, count_label, accent_class, display_order)
values
  ('Interior studios', '420 vetted partners', 'bg-emerald-900', 1),
  ('Statement furniture', '1,850 ready pieces', 'bg-stone-900', 2),
  ('Lighting ateliers', '310 sculptural edits', 'bg-amber-700', 3),
  ('Surface libraries', '2,400 material samples', 'bg-teal-800', 4)
on conflict (name) do nothing;

insert into public.marketplace_locations (name, display_order)
values
  ('Mumbai', 1),
  ('Delhi NCR', 2),
  ('Bengaluru', 3),
  ('Hyderabad', 4),
  ('Pune', 5),
  ('Ahmedabad', 6),
  ('Jaipur', 7),
  ('Surat', 8)
on conflict (name) do nothing;

insert into public.marketplace_locations (name, display_order)
values
  ('Agartala', 9),
  ('Agra', 10),
  ('Ahmednagar', 11),
  ('Aizawl', 12),
  ('Ajmer', 13),
  ('Akola', 14),
  ('Alappuzha', 15),
  ('Aligarh', 16),
  ('Allahabad', 17),
  ('Alwar', 18),
  ('Ambala', 19),
  ('Amravati', 20),
  ('Amritsar', 21),
  ('Anand', 22),
  ('Anantapur', 23),
  ('Asansol', 24),
  ('Aurangabad', 25),
  ('Bareilly', 26),
  ('Bathinda', 27),
  ('Belagavi', 28),
  ('Berhampur', 29),
  ('Bhagalpur', 30),
  ('Bharuch', 31),
  ('Bhavnagar', 32),
  ('Bhilai', 33),
  ('Bhopal', 34),
  ('Bhubaneswar', 35),
  ('Bikaner', 36),
  ('Bilaspur', 37),
  ('Bokaro', 38),
  ('Chandigarh', 39),
  ('Chennai', 40),
  ('Coimbatore', 41),
  ('Cuttack', 42),
  ('Dehradun', 43),
  ('Dhanbad', 44),
  ('Durgapur', 45),
  ('Erode', 46),
  ('Faridabad', 47),
  ('Gandhinagar', 48),
  ('Ghaziabad', 49),
  ('Gorakhpur', 50),
  ('Guntur', 51),
  ('Gurugram', 52),
  ('Guwahati', 53),
  ('Gwalior', 54),
  ('Haldwani', 55),
  ('Hisar', 56),
  ('Hubballi', 57),
  ('Imphal', 58),
  ('Indore', 59),
  ('Itanagar', 60),
  ('Jabalpur', 61),
  ('Jalandhar', 62),
  ('Jammu', 63),
  ('Jamnagar', 64),
  ('Jamshedpur', 65),
  ('Jhansi', 66),
  ('Jodhpur', 67),
  ('Jorhat', 68),
  ('Kadapa', 69),
  ('Kakinada', 70),
  ('Kannur', 71),
  ('Kanpur', 72),
  ('Karnal', 73),
  ('Kochi', 74),
  ('Kolhapur', 75),
  ('Kolkata', 76),
  ('Kollam', 77),
  ('Kota', 78),
  ('Kozhikode', 79),
  ('Kurnool', 80),
  ('Lucknow', 81),
  ('Ludhiana', 82),
  ('Madurai', 83),
  ('Mangaluru', 84),
  ('Mathura', 85),
  ('Meerut', 86),
  ('Mohali', 87),
  ('Mysuru', 88),
  ('Nagpur', 89),
  ('Nashik', 90),
  ('Navi Mumbai', 91),
  ('Noida', 92),
  ('Panaji', 93),
  ('Panipat', 94),
  ('Patiala', 95),
  ('Patna', 96),
  ('Pondicherry', 97),
  ('Raipur', 98),
  ('Rajahmundry', 99),
  ('Rajkot', 100),
  ('Ranchi', 101),
  ('Rohtak', 102),
  ('Rourkela', 103),
  ('Salem', 104),
  ('Sambalpur', 105),
  ('Shillong', 106),
  ('Shimla', 107),
  ('Siliguri', 108),
  ('Solapur', 109),
  ('Srinagar', 110),
  ('Thane', 111),
  ('Thiruvananthapuram', 112),
  ('Thrissur', 113),
  ('Tiruchirappalli', 114),
  ('Tirupati', 115),
  ('Tiruppur', 116),
  ('Udaipur', 117),
  ('Ujjain', 118),
  ('Vadodara', 119),
  ('Varanasi', 120),
  ('Vellore', 121),
  ('Vijayawada', 122),
  ('Visakhapatnam', 123),
  ('Warangal', 124)
on conflict (name) do nothing;

insert into public.interior_firms (name, city, specialty, rating, display_order)
values
  ('Aaranya Atelier', 'Mumbai', 'Warm luxury homes, turnkey apartments, and custom furniture', '4.9', 1),
  ('Studio Vistara', 'Bengaluru', 'Minimal villas, spatial planning, and material-led interiors', '4.8', 2),
  ('Nivasa Design House', 'Delhi NCR', 'Premium residences, wardrobes, kitchens, and styling', '4.9', 3),
  ('Lumen & Lime Interiors', 'Pune', 'Compact urban homes, lighting plans, and renovation work', '4.7', 4),
  ('Casa Mehr Studio', 'Hyderabad', 'Contemporary family homes, finishes, and project coordination', '4.8', 5)
on conflict (name) do nothing;

insert into public.material_suppliers (name, city, specialty, rating, display_order)
values
  ('Marble & Grain Co.', 'Jaipur', 'Natural stone, quartz slabs, and premium countertop sourcing', '4.8', 1),
  ('Brassline Hardware', 'Mumbai', 'Handles, hinges, locks, wardrobe systems, and fittings', '4.7', 2),
  ('Terra Tile Depot', 'Ahmedabad', 'Porcelain tiles, handmade tiles, cladding, and mosaics', '4.9', 3),
  ('Oak & Veneer Supply', 'Bengaluru', 'Plywood, veneer, laminates, fluted panels, and wall surfaces', '4.8', 4),
  ('Lumora Lighting Trade', 'Delhi NCR', 'Architectural lights, profile systems, and decorative fixtures', '4.7', 5)
on conflict (name) do nothing;

insert into public.architect_firms (name, city, specialty, rating, display_order)
values
  ('Axis Courtyard Architects', 'Delhi NCR', 'Residential planning, approvals, facade design, and site BOQs', '4.9', 1),
  ('Prism Habitat Studio', 'Mumbai', 'Apartment layouts, redevelopment homes, and detail drawings', '4.8', 2),
  ('Gridline Works', 'Hyderabad', 'Commercial interiors, working drawings, and MEP coordination', '4.7', 3),
  ('Arka Form Lab', 'Bengaluru', 'Villas, farmhouses, passive design, and construction detailing', '4.9', 4),
  ('Northlight Planning Co.', 'Pune', 'Floor plans, structural coordination, and municipal drawings', '4.8', 5)
on conflict (name) do nothing;

insert into public.labour_teams (name, display_order)
values
  ('Electricians', 1),
  ('POP artists', 2),
  ('Wall artists', 3),
  ('Painters', 4),
  ('Carpenters', 5),
  ('Plumbers', 6),
  ('Tile masons', 7),
  ('False ceiling teams', 8),
  ('Civil masons', 9),
  ('Granite installers', 10),
  ('Marble polishers', 11),
  ('Wallpaper installers', 12),
  ('Texture painters', 13),
  ('Gypsum board installers', 14),
  ('HVAC technicians', 15),
  ('AC installers', 16),
  ('Smart home technicians', 17),
  ('CCTV installers', 18),
  ('Networking technicians', 19),
  ('Modular kitchen fitters', 20),
  ('Wardrobe installers', 21),
  ('Furniture polishers', 22),
  ('Upholstery workers', 23),
  ('Curtain installers', 24),
  ('Blinds installers', 25),
  ('Glass partition installers', 26),
  ('Aluminium fabricators', 27),
  ('Welders', 28),
  ('MS fabricators', 29),
  ('Stainless steel fabricators', 30),
  ('Waterproofing teams', 31),
  ('Flooring installers', 32),
  ('Vinyl flooring workers', 33),
  ('Wooden flooring installers', 34),
  ('Epoxy flooring teams', 35),
  ('Stone cladding workers', 36),
  ('Exterior painters', 37),
  ('Deep cleaning crews', 38),
  ('Site supervisors', 39),
  ('Demolition workers', 40),
  ('Loaders and helpers', 41),
  ('Drilling teams', 42),
  ('Core cutting workers', 43),
  ('Pest control technicians', 44),
  ('Gardening teams', 45),
  ('Landscape workers', 46),
  ('Swimming pool technicians', 47),
  ('Solar panel installers', 48),
  ('Fire safety installers', 49),
  ('Signage installers', 50)
on conflict (name) do nothing;
