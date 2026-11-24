import { useState } from "react";
import { scrollToId, track } from "../lib/analytics";
import {
  ArchIcon,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BalloonMark,
  Calendar,
  Check,
  Clock,
  GarlandIcon,
  MapPin,
  Menu,
  CeilingIcon,
  Close,
  NumbersIcon,
  Phone,
  Plus,
  Sparkle,
} from "./Icons";
import { BrandLockup, PhonePendingDialog } from "./Shared";
import { QuoteForm } from "./QuoteForm";
import { cn } from "../utils/cn";

const NAV = [
  { label: "The work", id: "work" },
  { label: "What we make", id: "services" },
  { label: "How it works", id: "process" },
  { label: "FAQ", id: "faq" },
];

const SERVICES = [
  {
    icon: ArchIcon,
    title: "Arches & entrances",
    description:
      "A frame for the first look, the vows or the grand opening. Organic, hooped or sculptural.",
    tags: "Weddings · Entrances",
    type: "Wedding",
  },
  {
    icon: GarlandIcon,
    title: "Garlands & walls",
    description:
      "Dessert-table runs, stair rails and photo walls. Built to the length your space needs.",
    tags: "Showers · Photo moments",
    type: "Bridal or baby shower",
  },
  {
    icon: CeilingIcon,
    title: "Ceiling moments",
    description:
      "Floating clusters and suspended installations that bring the eye up and the room together.",
    tags: "Receptions · Brand events",
    type: "Corporate or brand event",
  },
  {
    icon: NumbersIcon,
    title: "Milestones & brands",
    description:
      "Number installations, product launches and colour-matched displays for the moments that mark a year.",
    tags: "Birthdays · Launches",
    type: "Birthday or milestone",
  },
];

const PAIN_POINTS = [
  {
    title: "“Blush” is not a colour code.",
    problem:
      "A photo can make dusty pink look peach. A stock palette can clash with your invitations, venue or flowers.",
    solution:
      "We plan around your actual swatch, the room's light and the way the photos will look — not a catalogue page.",
  },
  {
    title: "DIY always takes longer.",
    problem:
      "Balloon garlands look simple online. Then event morning arrives, the arch is half-built, and you are still inflating.",
    solution:
      "Delivery and on-site setup are scoped into your quote. We build before guests arrive, so you can get ready.",
  },
  {
    title: "A quote should not surprise you.",
    problem:
      "Travel, takedown or extra colours appear at the end. What felt like a yes starts to feel like a maybe.",
    solution:
      "One itemised quote with the scope, travel, setup and takedown set out before you commit.",
  },
];

const WHY_POINTS = [
  {
    title: "Colour first",
    body: "We start with your invitations, florals or venue. The palette follows your day, not our favourite reel.",
  },
  {
    title: "Made for the room",
    body: "Scale, ceiling height and guest sightlines are part of the plan. A small room gets a moment that fits.",
  },
  {
    title: "One clear paper trail",
    body: "Your scope, colours, timing and costs live in one written quote — not a chain of half-answers.",
  },
  {
    title: "Setup handled",
    body: "We arrive with the kit, build on site and leave the room finished. Takedown can be added to your quote.",
  },
];

const FAQS = [
  {
    question: "How much does a balloon installation cost?",
    answer:
      "The price depends on the size, the number of colours, venue access and build time. Send your date, venue and the feeling you want. You will get one clear, itemised quote instead of a guess from a price list that was never built for your room.",
  },
  {
    question: "Do you deliver and set up?",
    answer:
      "Yes. Delivery and setup are written into your quote as separate, visible lines. We confirm the venue's access rules and setup window ahead of the day, then build on site.",
  },
  {
    question: "Can you match the colours on my invitation?",
    answer:
      "Yes. Send a swatch, invitation, fabric sample or venue photo with your enquiry. We plan the balloon mix around what you are already using, and you approve the colour direction before we build.",
  },
  {
    question: "How far ahead should I book?",
    answer:
      "Share your date and we will confirm availability before you plan anything else. Weekend dates and peak season go first, so it is worth asking early. If your date is close, still ask — a clear yes or no is better than a maybe.",
  },
  {
    question: "How long will the balloons last?",
    answer:
      "It depends on the balloon type, the room, sunlight and heat. Tell us where the installation will live and how long it needs to look its best. We will recommend the right mix and setup timing for those conditions.",
  },
  {
    question: "What do you need from my venue?",
    answer:
      "A venue contact, an access time, the ceiling height and any rules about hanging, adhesives or rigging. If you do not have those details yet, send the venue name and we will ask the right questions.",
  },
];

function Kicker({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3 text-muted">
      <span className="text-plum">{index}</span>
      <span className="h-px w-8 bg-line" aria-hidden="true" />
      {children}
    </p>
  );
}

function ConceptTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[0.56rem] font-bold uppercase tracking-[0.12em] text-ivory backdrop-blur",
        className
      )}
    >
      <span className="h-1 w-1 rounded-full bg-butter" aria-hidden="true" />
      Concept image
    </span>
  );
}

export function LandingPage({ onOpenStrategy }: { onOpenStrategy: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [celebration, setCelebration] = useState("");

  function navigate(id: string, label: string) {
    scrollToId(id);
    setMenuOpen(false);
    track("section_nav", { section: id, label, source: "landing" });
  }

  function goQuote(type = "", location = "generic") {
    if (type) setCelebration(type);
    setMenuOpen(false);
    track("cta_click", { location, cta: "quote", event_type: type || "unspecified" });
    window.setTimeout(() => scrollToId("quote"), 50);
  }

  function openCall(location: string) {
    track("call_click", { location, phone_status: "unverified_placeholder" });
    setCallOpen(true);
  }

  return (
    <div id="top">
      <header className="sticky top-0 z-50 border-b border-line/75 bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:h-[72px] lg:px-10">
          <BrandLockup
            compact
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
          />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id, item.label)}
                className="link-underline py-2 text-[0.76rem] font-bold text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => openCall("header")}
              className="group flex items-center gap-2 px-2 py-2 text-[0.76rem] font-bold text-ink"
            >
              <Phone className="h-4 w-4 text-plum" />
              <span className="link-underline">Call</span>
              <span className="rounded-full border border-line px-1.5 py-0.5 text-[0.52rem] uppercase tracking-wider text-muted">
                No. TBC
              </span>
            </button>
            <button
              type="button"
              onClick={() => goQuote("", "header")}
              className="inline-flex items-center gap-2 rounded-sm bg-wine px-4 py-2.5 text-[0.76rem] font-bold text-ivory transition-colors hover:bg-plum"
            >
              Plan my event
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 items-center gap-2 rounded-full border border-ink/15 px-3 text-ink md:hidden"
        >
          <span className="text-[0.57rem] font-extrabold uppercase tracking-[0.12em]">Menu</span>
            {menuOpen ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="border-t border-line bg-paper px-5 py-5 md:hidden">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id, item.label)}
                  className="flex items-center justify-between border-b border-line/70 py-3.5 text-left font-display text-xl text-ink"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 text-plum" />
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => goQuote("", "mobile_menu")}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-wine px-5 py-3.5 text-sm font-bold text-ivory"
            >
              Plan my event
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openCall("mobile_menu");
              }}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 py-2 text-[0.78rem] font-bold text-ink"
            >
              <Phone className="h-4 w-4 text-plum" />
              Call the studio
              <span className="rounded-full border border-line px-1.5 py-0.5 text-[0.52rem] uppercase tracking-wider text-muted">
                Number pending
              </span>
            </button>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-12 pt-6 sm:pt-12 lg:px-10 lg:pb-20 lg:pt-16">
          <div
            className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full border border-wine/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -left-16 top-32 h-48 w-48 rounded-full border border-wine/10"
            aria-hidden="true"
          />
          <div className="mx-auto grid max-w-[1280px] items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="animate-fade-up relative z-10">
              <div className="mb-4 flex flex-wrap items-center gap-3 sm:mb-6">
                <span className="eyebrow inline-flex items-center gap-2 text-plum">
                  <Sparkle className="h-3.5 w-3.5" />
                  Custom balloon installations · London
                </span>
                <span className="hidden h-px w-10 bg-line sm:block" aria-hidden="true" />
                <span className="hidden text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-muted sm:inline">
                  One-of-a-kind, not one-size
                </span>
              </div>

              <h1 className="display-balance max-w-[13ch] font-display text-[clamp(2.9rem,7.7vw,6.5rem)] font-light leading-[0.93] tracking-[-0.045em] text-ink sm:leading-[0.91]">
                The room everyone{" "}
                <em className="font-normal italic tracking-[-0.03em] text-wine">
                  stops to photograph.
                </em>
              </h1>

              <p className="copy-pretty mt-4 max-w-[34rem] text-[0.96rem] leading-relaxed text-muted sm:mt-7 sm:text-[1.11rem]">
                Custom balloon arches, garlands and backdrops for London weddings, showers and
                milestone moments. Designed around your colours, your venue and your people —
                then installed before guests arrive.
              </p>

              <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
                <button
                  type="button"
                  onClick={() => goQuote("", "hero")}
                  className="group inline-flex min-h-[52px] items-center justify-center gap-3 rounded-sm bg-wine px-7 py-3.5 text-[0.87rem] font-bold text-ivory shadow-[0_10px_28px_rgba(74,31,61,0.18)] transition-all hover:-translate-y-0.5 hover:bg-plum"
                >
                  Get my colour plan
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate("work", "See the installations")}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm px-3 py-3.5 text-[0.85rem] font-bold text-ink transition-colors hover:text-plum"
                >
                  See the installations
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line/80 pt-4 sm:mt-8 sm:pt-5">
                {["Colour-led design", "Event-day setup", "One clear quote"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-ink/80"
                  >
                    <Check className="h-3.5 w-3.5 text-moss" />
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[0.61rem] leading-relaxed text-muted">
                Proposed service standards · owner approval required before launch.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[520px] lg:pr-4">
              <div
                className="absolute -inset-x-5 bottom-4 top-8 rounded-t-[16rem] border border-line bg-blush/45"
                aria-hidden="true"
              />
              <div className="dot-grid absolute -right-4 -top-4 h-28 w-24 opacity-60" aria-hidden="true" />
              <div className="arch-frame relative isolate aspect-[4/5] overflow-hidden bg-shell shadow-[0_28px_70px_rgba(74,31,61,0.16)]">
                <img
                  src="/images/hero-arch.jpg"
                  alt="Concept image: a peach, blush, cream and sage balloon arch framing a garden wedding table."
                  className="h-full w-full object-cover"
                  width="1024"
                  height="1280"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-ink/5" aria-hidden="true" />
                <ConceptTag className="absolute right-3 top-[30%]" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-ivory/80">
                      Peach · blush · sage
                    </p>
                    <p className="mt-1 font-display text-[1.35rem] leading-tight text-ivory">
                      Garden wedding, softly done.
                    </p>
                  </div>
                  <span className="hidden rounded-full border border-ivory/40 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.13em] text-ivory/90 sm:inline">
                    Mood, not a past job
                  </span>
                </div>
              </div>

              <div className="absolute -left-4 top-8 flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full border border-wine/15 bg-paper text-center shadow-lg sm:-left-7 sm:h-[108px] sm:w-[108px]">
                <span className="animate-spin-slow absolute inset-1 rounded-full border border-dashed border-wine/25" aria-hidden="true" />
                <BalloonMark className="h-5 w-5 text-peony" />
                <span className="mt-1 text-[0.49rem] font-extrabold uppercase leading-[1.4] tracking-[0.12em] text-wine">
                  Built for
                  <br />
                  the photos
                </span>
              </div>

              <div className="absolute -bottom-6 -right-3 hidden w-[205px] border border-line bg-paper p-4 shadow-[0_16px_35px_rgba(43,25,37,0.14)] sm:block lg:-right-6">
                <p className="eyebrow text-plum">Before the build</p>
                <p className="mt-2 font-display text-[1.05rem] leading-snug text-ink">
                  Your palette and scale, agreed in writing.
                </p>
                <p className="mt-2 text-[0.62rem] leading-relaxed text-muted">
                  A proposed first step, not a verified promise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-line bg-paper/80 py-3">
          <p className="sr-only">
            Event types: weddings, bridal showers, birthdays, baby showers, corporate events,
            ceiling installations.
          </p>
          <div className="marquee-track flex w-max animate-marquee" aria-hidden="true">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 items-center">
                {[
                  "Weddings",
                  "Bridal showers",
                  "Birthdays",
                  "Baby showers",
                  "Brand moments",
                  "Ceiling installs",
                ].map((item) => (
                  <span
                    key={`${group}-${item}`}
                    className="flex items-center gap-6 px-6 text-[0.66rem] font-bold uppercase tracking-[0.17em] text-ink/70"
                  >
                    {item}
                    <span className="h-1 w-1 rounded-full bg-peony/70" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="why" className="scroll-mt-28 px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <Kicker index="01">The real brief</Kicker>
              <h2 className="display-balance mt-5 max-w-[12ch] font-display text-[clamp(2.5rem,5vw,4.4rem)] font-light leading-[0.98] tracking-[-0.035em] text-ink">
                Beautiful on the grid. Chaos on the day.
              </h2>
              <p className="copy-pretty mt-5 max-w-sm text-[0.98rem] leading-relaxed text-muted">
                Most balloon regret is not really about balloons. It is the colour that arrives
                wrong, the quote that keeps growing, or the arch that is still unfinished when
                guests arrive.
              </p>

              <figure className="relative mt-9 overflow-hidden rounded-t-[7rem] rounded-b-lg border border-line bg-shell">
                <img
                  src="/images/studio-detail.jpg"
                  alt="Concept image: hands tying peach, blush and cream balloons beside fabric colour swatches on a studio table."
                  className="aspect-[5/4] w-full object-cover"
                  width="1280"
                  height="960"
                  loading="lazy"
                />
                <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="bg-paper/95 px-3 py-2 text-[0.62rem] font-semibold leading-snug text-ink backdrop-blur">
                    Palette · scale · venue. Planned together.
                  </span>
                  <ConceptTag />
                </figcaption>
              </figure>
            </div>

            <div className="lg:pt-20">
              <p className="mb-2 max-w-lg text-[0.72rem] font-bold uppercase tracking-[0.16em] text-muted">
                Start here
              </p>
              <div>
                {PAIN_POINTS.map((point, index) => (
                  <article
                    key={point.title}
                    className="grid gap-4 border-t border-line py-7 sm:grid-cols-[auto_1fr] sm:gap-6"
                  >
                    <span className="font-display text-[1.6rem] leading-none text-peony/80">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.55rem] font-normal leading-tight tracking-[-0.02em] text-ink">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">
                        {point.problem}
                      </p>
                      <p className="mt-3 flex items-start gap-2 text-[0.82rem] font-semibold leading-snug text-ink">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-moss" />
                        {point.solution}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
              <button
                type="button"
                onClick={() => navigate("process", "See our approach")}
                className="mt-3 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[0.76rem] font-bold text-ink transition-colors hover:border-wine hover:text-wine"
              >
                See how we keep it calm
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 border-y border-line bg-paper px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <Kicker index="02">What we make</Kicker>
                <h2 className="display-balance mt-5 max-w-[15ch] font-display text-[clamp(2.5rem,5vw,4.3rem)] font-light leading-[0.98] tracking-[-0.035em] text-ink">
                  Made to fill a room. Or just the frame.
                </h2>
              </div>
              <p className="max-w-[23rem] text-[0.9rem] leading-relaxed text-muted md:pb-2">
                Pick the closest starting point. We will size it to your space, palette and
                setup window. Every proposal is quoted to the actual job.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="group relative flex flex-col rounded-t-[5rem] rounded-b-md border border-line bg-ivory/70 p-6 pt-10 transition-all duration-300 hover:-translate-y-1 hover:border-wine/35 hover:shadow-[0_18px_35px_rgba(43,25,37,0.08)]"
                  >
                    <span className="absolute right-5 top-5 font-display text-sm text-muted/70">
                      0{index + 1}
                    </span>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-wine/15 bg-paper text-plum">
                      <Icon className="h-8 w-8" />
                    </span>
                    <h3 className="mt-7 font-display text-[1.48rem] leading-tight tracking-[-0.02em] text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.83rem] leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <p className="mt-5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-muted">
                      {service.tags}
                    </p>
                    <button
                      type="button"
                      onClick={() => goQuote(service.type, `service_${index + 1}`)}
                      className="mt-4 inline-flex items-center gap-2 self-start border-b border-ink/25 pb-0.5 text-[0.72rem] font-bold text-ink transition-colors group-hover:border-wine group-hover:text-wine"
                      aria-label={`Start a quote for ${service.title}`}
                    >
                      Start here
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col justify-between gap-3 rounded-sm bg-shell/70 px-5 py-4 sm:flex-row sm:items-center">
              <p className="text-[0.8rem] font-semibold leading-snug text-ink">
                Not sure what fits your room? Send a photo. We will suggest the scale and
                colour mix before you book.
              </p>
              <button
                type="button"
                onClick={() => goQuote("Something else", "services_footer")}
                className="inline-flex shrink-0 items-center gap-2 self-start text-[0.72rem] font-bold text-wine sm:self-auto"
              >
                Ask for a direction
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-wine px-5 py-16 text-ivory lg:px-10 lg:py-20">
          <div
            className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-ivory/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full border border-ivory/10"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <p className="eyebrow text-butter">The starting point</p>
              <h2 className="display-balance mt-4 max-w-[15ch] font-display text-[clamp(2.4rem,4.8vw,4rem)] font-light leading-[0.98] tracking-[-0.035em]">
                Start with a colour plan, not a price list.
              </h2>
              <p className="copy-pretty mt-5 max-w-[34rem] text-[0.94rem] leading-relaxed text-ivory/80">
                Tell us the date, the venue and the colours you are already using. We will come
                back with a clear direction, the scale that fits and one itemised quote.
              </p>
              <button
                type="button"
                onClick={() => goQuote("", "offer_band")}
                className="group mt-7 inline-flex min-h-[50px] items-center gap-3 rounded-sm bg-butter px-6 py-3 text-[0.82rem] font-extrabold text-ink transition-colors hover:bg-ivory"
              >
                Get my colour plan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="rounded-sm border border-ivory/25 bg-ivory/[0.07] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3 border-b border-ivory/20 pb-4">
                <p className="font-display text-lg">In your event plan</p>
                <span className="rounded-full border border-ivory/30 px-2 py-1 text-[0.52rem] uppercase tracking-[0.1em] text-ivory/70">
                  Owner approval
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {[
                  "Colour and finish direction",
                  "Scale that suits your venue",
                  "Itemised setup, travel and hire",
                  "A written setup window",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.82rem] text-ivory/90">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ivory/35">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.62rem] leading-relaxed text-ivory/60">
                Proposed offer. Pricing, inclusions and approval steps must be confirmed by the
                owner before this page goes live.
              </p>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <Kicker index="03">A look at the feeling</Kicker>
                <h2 className="display-balance mt-5 max-w-[13ch] font-display text-[clamp(2.5rem,5vw,4.3rem)] font-light leading-[0.98] tracking-[-0.035em] text-ink">
                  A little proof for your eyes.
                </h2>
              </div>
              <p className="max-w-[21rem] text-[0.87rem] leading-relaxed text-muted sm:pb-2">
                Concept imagery sets the tone until the owner supplies real installs. No stock
                photo pretending to be a past job.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <figure className="group relative overflow-hidden rounded-tl-[8rem] rounded-br-lg bg-shell">
                <img
                  src="/images/gallery-shower.jpg"
                  alt="Concept image: an ivory, blush and butter balloon garland over a bridal shower dessert table."
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  width="1024"
                  height="1280"
                  loading="lazy"
                />
                <ConceptTag className="absolute right-4 top-4" />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/75 to-transparent p-5 pt-16 text-ivory">
                  <p className="eyebrow text-ivory/70">Mood 01</p>
                  <p className="mt-1 font-display text-2xl">Soft colour, sharp finish.</p>
                  <p className="mt-1 text-[0.7rem] text-ivory/75">
                    Bridal shower · garland wall
                  </p>
                </figcaption>
              </figure>

              <div className="grid gap-4">
                <figure className="group relative overflow-hidden rounded-tr-[8rem] bg-shell">
                  <img
                    src="/images/gallery-birthday.jpg"
                    alt="Concept image: a burgundy, coral and chrome milestone birthday balloon backdrop with number balloons."
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    width="1024"
                    height="640"
                    loading="lazy"
                  />
                  <ConceptTag className="absolute left-3 top-3" />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-16 text-ivory">
                    <p className="eyebrow text-ivory/70">Mood 02</p>
                    <p className="mt-1 font-display text-xl">The grown-up milestone.</p>
                  </figcaption>
                </figure>

                <div className="grid gap-4 sm:grid-cols-2">
                  <figure className="group relative overflow-hidden rounded-sm bg-shell">
                    <img
                      src="/images/gallery-corporate.jpg"
                      alt="Concept image: a sculptural cream, chocolate and chrome balloon installation at a modern brand launch."
                      className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      width="1024"
                      height="1024"
                      loading="lazy"
                    />
                    <ConceptTag className="absolute left-3 top-3" />
                    <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-12 text-ivory">
                      <p className="text-[0.7rem] font-bold">Brand moments, not party props.</p>
                    </figcaption>
                  </figure>

                  <div className="dot-grid flex flex-col justify-between rounded-sm border border-line bg-paper p-5">
                    <Sparkle className="h-6 w-6 text-peony" />
                    <div>
                      <p className="mt-6 font-display text-[1.35rem] leading-tight text-ink">
                        Have a reference saved?
                      </p>
                      <p className="mt-2 text-[0.75rem] leading-relaxed text-muted">
                        Send the photo. We will tell you what is realistic for your venue and
                        budget.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goQuote("", "gallery")}
                      className="mt-5 inline-flex items-center gap-2 self-start border-b border-ink/25 pb-0.5 text-[0.7rem] font-bold text-ink hover:border-wine hover:text-wine"
                    >
                      Start with the reference
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="scroll-mt-24 border-y border-line bg-blush/55 px-5 py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <Kicker index="04">Client words</Kicker>
                <h2 className="display-balance mt-5 max-w-[12ch] font-display text-[clamp(2.4rem,4.8vw,4rem)] font-light leading-[0.98] tracking-[-0.035em] text-ink">
                  Real words only.
                </h2>
                <p className="copy-pretty mt-5 max-w-sm text-[0.91rem] leading-relaxed text-ink/75">
                  This desk is reserved for verified client words — quoted exactly, attributed
                  properly, and added only with permission. No stock praise. No made-up stars.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-sm border border-wine/20 bg-paper/70 px-3 py-2 text-[0.65rem] font-semibold text-wine">
                  <span className="h-1.5 w-1.5 rounded-full bg-peony" aria-hidden="true" />
                  Review count and rating pending verification
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((slot) => (
                  <div
                    key={slot}
                    className="relative flex min-h-[220px] flex-col justify-between rounded-sm border border-dashed border-wine/30 bg-paper/55 p-5"
                  >
                    <div>
                      <span className="tag border-wine/20 bg-paper text-wine/75">
                        Review slot 0{slot}
                      </span>
                      <p className="mt-5 font-display text-[1.05rem] italic leading-relaxed text-ink/60">
                        [A real review goes here — the client&apos;s exact words, with their
                        permission.]
                      </p>
                    </div>
                    <p className="mt-6 text-[0.62rem] font-bold uppercase leading-relaxed tracking-[0.1em] text-muted">
                      [Name] · [Google / Facebook]
                      <br />
                      [Month, year]
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="approach" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="relative">
              <div className="sticky top-28">
                <Kicker index="05">The approach</Kicker>
                <h2 className="display-balance mt-5 max-w-[11ch] font-display text-[clamp(2.5rem,5vw,4.3rem)] font-light leading-[0.98] tracking-[-0.035em] text-ink">
                  Calm is part of the design.
                </h2>
                <p className="copy-pretty mt-5 max-w-sm text-[0.94rem] leading-relaxed text-muted">
                  You should be getting ready, not chasing setup. The details below are the
                  working standard we would put in writing.
                </p>
                <div className="mt-8 hidden overflow-hidden rounded-t-[6rem] rounded-b-md border border-line bg-shell lg:block">
                  <img
                    src="/images/hero-arch.jpg"
                    alt="Concept image: a softly coloured balloon arch at a garden wedding."
                    className="aspect-[5/4] w-full object-cover"
                    width="1024"
                    height="820"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div>
              {WHY_POINTS.map((point, index) => (
                <div
                  key={point.title}
                  className="group grid grid-cols-[auto_1fr] gap-4 border-t border-line py-7 sm:gap-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-wine/20 font-display text-[0.82rem] text-wine transition-colors group-hover:bg-wine group-hover:text-ivory">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.45rem] leading-snug text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-[0.88rem] leading-relaxed text-muted">
                      {point.body}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-line pt-6">
                <p className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-muted">
                  <span className="mt-0.5 rounded-sm border border-line px-1.5 py-0.5 text-[0.54rem] font-bold uppercase tracking-[0.08em]">
                    Draft
                  </span>
                  Proposed standards shown for approval. No guarantee or warranty is published
                  because none has been verified.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="scroll-mt-24 bg-paper px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-2xl">
              <Kicker index="06">How it works</Kicker>
              <h2 className="display-balance mt-5 font-display text-[clamp(2.5rem,5vw,4.3rem)] font-light leading-[0.98] tracking-[-0.035em] text-ink">
                Three steps. No guesswork.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "Tell us the moment",
                  body: "Share your date, venue and the colours you are already using. Four fields is enough to start.",
                  note: "A photo of the space helps.",
                },
                {
                  n: "02",
                  title: "See your plan",
                  body: "We come back with a colour direction, scale and an itemised quote. Ask questions before you commit.",
                  note: "The starting point, made clear.",
                },
                {
                  n: "03",
                  title: "Arrive to the finished room",
                  body: "We deliver, build and finish the installation before guests arrive. Takedown can be added.",
                  note: "You get ready. We get building.",
                },
              ].map((step, index) => (
                <article
                  key={step.n}
                  className="relative border-t border-line pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0"
                >
                  <span className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-wine md:-left-[5px] md:top-0" aria-hidden="true" />
                  <p className="font-display text-[2.6rem] leading-none text-peony/65">{step.n}</p>
                  <h3 className="mt-5 font-display text-[1.5rem] leading-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.87rem] leading-relaxed text-muted">{step.body}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-moss">
                    <Check className="h-3 w-3" />
                    {step.note}
                  </p>
                  {index === 2 && (
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={() => goQuote("", "process")}
                        className="inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[0.74rem] font-bold text-ink transition-colors hover:border-wine hover:text-wine"
                      >
                        Start step one
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-ivory px-5 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-[1180px] items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-muted">Clarity before commitment</p>
              <h2 className="display-balance mt-4 max-w-[14ch] font-display text-[clamp(2.1rem,4vw,3.2rem)] font-light leading-[1] tracking-[-0.03em] text-ink">
                You will know what you are getting.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "An itemised quote before your deposit",
                "A colour plan you approve before we build",
                "A written arrival window before event day",
              ].map((item) => (
                <div key={item} className="rounded-sm border border-line bg-paper p-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-moss/10 text-moss">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="mt-4 text-[0.82rem] font-bold leading-relaxed text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mx-auto mt-7 max-w-[1180px] text-[0.65rem] leading-relaxed text-muted">
            These are proposed booking steps, awaiting owner approval. No refund, discount,
            response-time or performance guarantee is claimed or published.
          </p>
        </section>

        <section id="faq" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <Kicker index="07">Fair questions</Kicker>
              <h2 className="display-balance mt-5 max-w-[10ch] font-display text-[clamp(2.5rem,5vw,4.3rem)] font-light leading-[0.98] tracking-[-0.035em] text-ink">
                Ask us anything.
              </h2>
              <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-muted">
                The things hosts usually want to sort before they send an enquiry.
              </p>
              <button
                type="button"
                onClick={() => goQuote("", "faq")}
                className="mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[0.74rem] font-bold text-ink hover:border-wine hover:text-wine"
              >
                Ask a different question
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <FaqList />
          </div>
        </section>

        <section id="quote" className="scroll-mt-20 bg-wine px-5 py-16 text-ivory sm:pt-20 lg:px-10 lg:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow text-butter">Let&apos;s make the room</p>
              <h2 className="display-balance mt-4 max-w-[12ch] font-display text-[clamp(2.7rem,5.2vw,4.7rem)] font-light leading-[0.96] tracking-[-0.038em]">
                Your date. Your colours. One room worth photographing.
              </h2>
              <p className="copy-pretty mt-5 max-w-[32rem] text-[0.94rem] leading-relaxed text-ivory/80">
                Send the four essentials. Ask for references, too. This is the start of the
                planning conversation, not a checkout.
              </p>

              <div className="mt-8 space-y-4 border-t border-ivory/20 pt-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-butter" />
                  <div>
                    <p className="text-[0.82rem] font-bold">London & surrounding events</p>
                    <p className="text-[0.65rem] text-ivory/60">
                      Service radius to be confirmed by the owner
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-butter" />
                  <div>
                    <p className="text-[0.82rem] font-bold">Studio hours · to be confirmed</p>
                    <p className="text-[0.65rem] text-ivory/60">
                      No hours are published until they are verified
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openCall("final_cta")}
                  className="group flex items-center gap-3 text-left"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/30 text-butter">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[0.82rem] font-bold">Call the studio</span>
                    <span className="block text-[0.65rem] text-ivory/60">
                      Number pending · tap for the preview note
                    </span>
                  </span>
                </button>
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-sm border border-ivory/20 bg-ivory/[0.06] p-3">
                <Calendar className="h-4 w-4 shrink-0 text-butter" />
                <p className="text-[0.68rem] leading-relaxed text-ivory/75">
                  Booking a specific date? Add it in the form. Availability is confirmed in
                  writing.
                </p>
              </div>
            </div>

            <div className="lg:pt-2">
              <QuoteForm initialCelebration={celebration} source="final_cta" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-5 pb-24 pt-12 text-ivory md:pb-12 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 border-b border-ivory/15 pb-10 md:grid-cols-[1.3fr_0.8fr_1fr]">
            <div>
              <BrandLockup dark />
              <p className="mt-5 max-w-xs text-[0.8rem] leading-relaxed text-ivory/60">
                Custom balloon installations for London celebrations. Colour-led, venue-aware,
                built to be photographed.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ivory/20 px-2.5 py-1 text-[0.54rem] font-bold uppercase tracking-[0.1em] text-ivory/65">
                <span className="h-1 w-1 rounded-full bg-butter" />
                Typographic logo placeholder
              </p>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-col items-start gap-2">
              <p className="eyebrow mb-2 text-ivory/45">Explore</p>
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id, `footer_${item.label}`)}
                  className="link-underline py-1 text-[0.78rem] text-ivory/75 hover:text-ivory"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goQuote("", "footer")}
                className="mt-1 border-b border-ivory/35 pb-0.5 text-[0.76rem] font-bold text-ivory hover:border-butter hover:text-butter"
              >
                Request a colour plan
              </button>
            </nav>

            <div>
              <p className="eyebrow mb-3 text-ivory/45">Studio details</p>
              <dl className="space-y-2.5 text-[0.73rem] leading-snug">
                {[
                  ["Name", "Breathtaking Balloon Co."],
                  ["Area", "London · to be confirmed"],
                  ["Phone", "Add verified number"],
                  ["Hours", "Add verified hours"],
                  ["Address", "Add verified address"],
                ].map(([term, value]) => (
                  <div key={term} className="flex justify-between gap-4 border-b border-ivory/10 pb-2">
                    <dt className="shrink-0 text-ivory/45">{term}</dt>
                    <dd className="text-right text-ivory/80">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
            <p className="text-[0.62rem] leading-relaxed text-ivory/45">
              © {new Date().getFullYear()} Breathtaking Balloon Co. · Preview draft, not for
              public launch. No ratings, reviews, prices or guarantees published without proof.
            </p>
            <button
              type="button"
              onClick={onOpenStrategy}
              className="inline-flex items-center gap-1.5 self-start text-[0.63rem] font-bold uppercase tracking-[0.13em] text-ivory/70 hover:text-butter sm:self-auto"
            >
              Strategy &amp; pre-launch notes
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </footer>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md md:hidden",
          menuOpen && "hidden"
        )}
      >
        <div className="mx-auto flex max-w-md items-center gap-2">
          <button
            type="button"
            onClick={() => goQuote("", "sticky_mobile")}
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-sm bg-wine px-4 py-3 text-[0.8rem] font-bold text-ivory"
          >
            Plan my event
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => openCall("sticky_mobile")}
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-sm border border-ink/20 px-4 py-3 text-[0.8rem] font-bold text-ink"
            aria-label="Call Breathtaking Balloon Co. — phone number pending"
          >
            <Phone className="h-4 w-4 text-plum" />
            Call
          </button>
        </div>
      </div>

      <PhonePendingDialog
        open={callOpen}
        onClose={() => setCallOpen(false)}
        onQuote={() => goQuote("", "phone_dialog")}
      />
    </div>
  );
}

function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {FAQS.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.question} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                onClick={() => {
                  const next = isOpen ? -1 : index;
                  setOpen(next);
                  if (next === index) track("faq_open", { question: faq.question });
                }}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
                className="flex w-full items-start justify-between gap-5 py-5 text-left"
              >
                <span className="font-display text-[1.11rem] leading-snug text-ink sm:text-[1.25rem]">
                  {faq.question}
                </span>
                <span
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                    isOpen
                      ? "rotate-45 border-wine bg-wine text-ivory"
                      : "border-ink/20 text-ink"
                  )}
                  aria-hidden="true"
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-button-${index}`}
              hidden={!isOpen}
              className="pb-6 pr-10"
            >
              <p className="max-w-[40rem] text-[0.87rem] leading-relaxed text-muted">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
      <p className="mt-5 text-[0.62rem] leading-relaxed text-muted">
        Draft answers. Operational details require owner confirmation before launch.
      </p>
    </div>
  );
}
