"use client";

import { FormEvent, useMemo, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

type LoginRole = "customer" | "business";
type BusinessDetails = {
  businessName: string;
  contactName: string;
  phone: string;
  city: string;
  serviceType: string;
};

const loginOptions: Array<{
  role: LoginRole;
  title: string;
  description: string;
  bullets: string[];
}> = [
  {
    role: "customer",
    title: "Login as customer",
    description: "Find designers, architects, materials, and skilled workers.",
    bullets: ["Save project location", "Shortlist experts", "Request quotes"],
  },
  {
    role: "business",
    title: "Login as business",
    description: "Manage listings, leads, service areas, and marketplace work.",
    bullets: ["Receive enquiries", "Show services", "Update availability"],
  },
];

export function LoginForm() {
  const [role, setRole] = useState<LoginRole>("customer");
  const [email, setEmail] = useState("");
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    businessName: "",
    contactName: "",
    phone: "",
    city: "",
    serviceType: "Interior designer",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeOption = useMemo(
    () => loginOptions.find((option) => option.role === role) ?? loginOptions[0],
    [role],
  );

  function updateBusinessDetails(field: keyof BusinessDetails, value: string) {
    setBusinessDetails((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const supabase = createSupabaseClient();

    if (!supabase) {
      setIsSubmitting(false);
      setStatus({
        type: "error",
        message:
          "Supabase is not configured yet. Add your project URL and publishable key to .env.local to enable login.",
      });
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data:
          role === "business"
            ? {
                role,
                business_name: businessDetails.businessName,
                contact_name: businessDetails.contactName,
                phone: businessDetails.phone,
                city: businessDetails.city,
                service_type: businessDetails.serviceType,
              }
            : { role },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setIsSubmitting(false);

    if (error) {
      setStatus({ type: "error", message: error.message });
      return;
    }

    setStatus({
      type: "success",
      message: `Check ${email} for your ${role} login link.`,
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-4">
        {loginOptions.map((option) => {
          const isActive = option.role === role;

          return (
            <button
              className={`rounded-lg border p-6 text-left shadow-sm transition ${
                isActive
                  ? "border-[#35564d] bg-[#eef3ef]"
                  : "border-[#ded7ca] bg-white hover:border-[#a89472]"
              }`}
              key={option.role}
              onClick={() => setRole(option.role)}
              type="button"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b675f]">
                {option.role}
              </span>
              <h2 className="mt-3 text-2xl font-semibold text-[#171716]">
                {option.title}
              </h2>
              <p className="mt-3 leading-7 text-[#605b52]">
                {option.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {option.bullets.map((bullet) => (
                  <span
                    className="rounded-full border border-[#d3c8b7] bg-white px-3 py-2 text-sm font-medium text-[#35312c]"
                    key={bullet}
                  >
                    {bullet}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <form
        className="rounded-lg border border-[#ded7ca] bg-white p-6 shadow-sm md:p-8"
        onSubmit={handleSubmit}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6b675f]">
          {activeOption.role} access
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#171716]">
          {activeOption.title}
        </h1>
        <p className="mt-4 leading-7 text-[#605b52]">
          {role === "business"
            ? "Share your business details and we will send a secure login link for your marketplace account."
            : "Enter your email and we will send a secure login link for your customer account."}
        </p>

        {role === "business" ? (
          <div className="mt-8 grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-semibold text-[#35312c]"
                  htmlFor="business-name"
                >
                  Business name
                </label>
                <input
                  className="mt-2 min-h-12 w-full rounded-full border border-[#d3c8b7] bg-[#f8f5ef] px-5 text-base outline-none transition placeholder:text-[#9b948a] focus:border-[#35564d]"
                  id="business-name"
                  onChange={(event) =>
                    updateBusinessDetails("businessName", event.target.value)
                  }
                  placeholder="Studio or company name"
                  required
                  type="text"
                  value={businessDetails.businessName}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-[#35312c]"
                  htmlFor="contact-name"
                >
                  Contact person
                </label>
                <input
                  className="mt-2 min-h-12 w-full rounded-full border border-[#d3c8b7] bg-[#f8f5ef] px-5 text-base outline-none transition placeholder:text-[#9b948a] focus:border-[#35564d]"
                  id="contact-name"
                  onChange={(event) =>
                    updateBusinessDetails("contactName", event.target.value)
                  }
                  placeholder="Owner or manager name"
                  required
                  type="text"
                  value={businessDetails.contactName}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-semibold text-[#35312c]"
                  htmlFor="service-type"
                >
                  Business type
                </label>
                <select
                  className="mt-2 min-h-12 w-full rounded-full border border-[#d3c8b7] bg-[#f8f5ef] px-5 text-base outline-none transition focus:border-[#35564d]"
                  id="service-type"
                  onChange={(event) =>
                    updateBusinessDetails("serviceType", event.target.value)
                  }
                  value={businessDetails.serviceType}
                >
                  <option>Interior designer</option>
                  <option>Architect</option>
                  <option>Material supplier</option>
                  <option>Electrician</option>
                  <option>POP artist</option>
                  <option>Wall artist</option>
                  <option>Carpenter</option>
                  <option>Painter</option>
                  <option>Other skilled worker team</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-[#35312c]"
                  htmlFor="city"
                >
                  Service city
                </label>
                <input
                  className="mt-2 min-h-12 w-full rounded-full border border-[#d3c8b7] bg-[#f8f5ef] px-5 text-base outline-none transition placeholder:text-[#9b948a] focus:border-[#35564d]"
                  id="city"
                  onChange={(event) =>
                    updateBusinessDetails("city", event.target.value)
                  }
                  placeholder="Mumbai, Pune, Delhi NCR"
                  required
                  type="text"
                  value={businessDetails.city}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-semibold text-[#35312c]"
                  htmlFor="phone"
                >
                  Phone number
                </label>
                <input
                  className="mt-2 min-h-12 w-full rounded-full border border-[#d3c8b7] bg-[#f8f5ef] px-5 text-base outline-none transition placeholder:text-[#9b948a] focus:border-[#35564d]"
                  id="phone"
                  onChange={(event) =>
                    updateBusinessDetails("phone", event.target.value)
                  }
                  placeholder="+91 98765 43210"
                  required
                  type="tel"
                  value={businessDetails.phone}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-[#35312c]"
                  htmlFor="email"
                >
                  Business email
                </label>
                <input
                  className="mt-2 min-h-12 w-full rounded-full border border-[#d3c8b7] bg-[#f8f5ef] px-5 text-base outline-none transition placeholder:text-[#9b948a] focus:border-[#35564d]"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="business@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <label
              className="mt-8 block text-sm font-semibold text-[#35312c]"
              htmlFor="email"
            >
              Email address
            </label>
            <input
              className="mt-2 min-h-12 w-full rounded-full border border-[#d3c8b7] bg-[#f8f5ef] px-5 text-base outline-none transition placeholder:text-[#9b948a] focus:border-[#35564d]"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </>
        )}

        <button
          className="mt-6 min-h-12 w-full rounded-full bg-[#171716] px-6 text-sm font-semibold text-white transition hover:bg-[#35564d] disabled:cursor-not-allowed disabled:bg-[#8a857d]"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Sending login link..." : activeOption.title}
        </button>

        {status.message ? (
          <p
            className={`mt-4 rounded-lg px-4 py-3 text-sm leading-6 ${
              status.type === "success"
                ? "bg-emerald-50 text-emerald-900"
                : "bg-amber-50 text-amber-900"
            }`}
          >
            {status.message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
