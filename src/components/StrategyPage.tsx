import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BalloonMark,
  Check,
  Close,
  Sparkle,
} from "./Icons";
import { BrandLockup } from "./Shared";
import { scrollToId, track } from "../lib/analytics";
import { cn } from "../utils/cn";
import {
  abTests,
  auditRows,
  benchmarkNote,
  buildNotes,
  checklistGroups,
  competitors,
  competitorMethod,
  conversionActions,
  coreOffer,
  evidenceMeta,
  launchRisks,
  ownerUnknowns,
  positioningStatement,
  reviewMining,
  sources,
  trackingEvents,
  unclaimedPositions,
  weaknesses,
  type EvidenceTag,
} from "../lib/strategyData";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "audit", label: "01 · Audit" },
  { id: "competitors", label: "02 · Competitors" },
  { id: "positioning", label: "03 · Positioning" },
  { id: "build", label: "04 · Build notes" },
  { id: "checklist", label: "05 · Launch list" },
  { id: "tests", label: "06 · A/B plan" },
  { id: "tracking", label: "07 · Tracking" },
  { id: "approval", label: "Checkpoint" },
  { id: "sources", label: "Sources" },
];

const TAG_CLASS: Record<EvidenceTag, string> = {
  verified: "tag-verified",
  inferred: "tag-inferred",
  proposed: "tag-proposed",
  assumption: "tag-assumption",
  unknown: "tag-unknown",
};

function Tag({ tag }: { tag: EvidenceTag }) {
  return (
    <span className={cn("tag", TAG_CLASS[tag])} title={evidenceMeta[tag].description}>
      {evidenceMeta[tag].label}
    </span>
  );
}

function SectionHead({
  number,
  kicker,
  title,
  intro,
}: {
  number: string;
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-8">
      <p className="eyebrow flex items-center gap-3 text-muted">
        <span className="text-wine">{number}</span>
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        {kicker}
      </p>
      <h2 className="display-balance mt-4 max-w-[22ch] font-display text-[clamp(2.1rem,4vw,3.5rem)] font-light leading-[1.01] tracking-[-0.03em] text-ink">
        {title}
      </h2>
      {intro && (
        <p className="copy-pretty mt-4 max-w-[44rem] text-[0.92rem] leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </div>
  );
}

function SourceLink({ id }: { id: string }) {
  const source = sources.find((item) => item.id === id);
  if (!source) return null;

  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 border-b border-wine/35 pb-0.5 text-[0.7rem] font-bold text-wine transition-colors hover:border-wine hover:text-ink"
      title={source.note}
    >
      {source.label}
      <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}

function WhyItShouldWork() {
  const reasons = [
    {
      title: "One action, repeated without clutter",
      body: "Every major section leads to the same four-field quote request. There is one secondary action, calling, and it stays inactive until a real number exists.",
      tag: "proposed" as EvidenceTag,
    },
    {
      title: "A specific promise instead of a mood",
      body: "Competitor pages reviewed lead with custom builds and published ranges. This draft leads with a tangible colour plan, then explains quote scope. The promise is unapproved, but it is more specific than “beautiful balloons.”",
      tag: "inferred" as EvidenceTag,
    },
    {
      title: "Trust friction is visible, not hidden",
      body: "No proof exists yet. The draft shows clearly labelled slots rather than invented testimonials, so the owner knows exactly what must be fixed before launch. Whether the placeholders outperform fake or missing proof is unproven.",
      tag: "inferred" as EvidenceTag,
    },
    {
      title: "Mobile-first, with local-intent basics",
      body: "The primary CTA is reachable in a sticky bar, form labels are persistent, alt text is accurate, and schema includes only verifiable data. The page is ready for a phone number and profile links once supplied.",
      tag: "proposed" as EvidenceTag,
    },
  ];

  return (
    <div className="mt-8 overflow-hidden rounded-md border border-line bg-paper">
      <div className="border-b border-line bg-shell/60 px-5 py-4 sm:px-6">
        <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink">
          Why this should outperform the current state
        </p>
        <p className="mt-1 text-[0.7rem] text-muted">
          There is no current website to benchmark. These are design hypotheses, not measured
          wins.
        </p>
      </div>
      <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {reasons.map((reason, index) => (
          <div key={reason.title} className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-2xl text-peony/70">0{index + 1}</span>
              <Tag tag={reason.tag} />
            </div>
            <h4 className="mt-3 font-display text-[1.2rem] leading-snug text-ink">
              {reason.title}
            </h4>
            <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">{reason.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StrategyPage({ onOpenLanding }: { onOpenLanding: () => void }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const allItems = checklistGroups.flatMap((group) => group.items);
  const done = allItems.filter((_, index) => checked[`${index}`]).length;
  const progress = Math.round((done / allItems.length) * 100);

  function toggleChecklist(key: string) {
    setChecked((current) => ({ ...current, [key]: !current[key] }));
  }

  function goTo(id: string) {
    scrollToId(id);
    track("strategy_nav", { section: id });
  }

  return (
    <div className="paper-texture min-h-screen">
      <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center justify-between gap-2 px-5 py-3 lg:px-10">
          <div className="flex min-w-0 items-center gap-4">
            <BrandLockup compact onClick={onOpenLanding} />
            <span className="hidden h-7 w-px bg-line sm:block" aria-hidden="true" />
            <span className="hidden text-[0.67rem] font-bold uppercase tracking-[0.16em] text-muted sm:block">
              Strategy room
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <span className="mr-1 hidden text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted md:inline">
              Strategy room
            </span>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-sm border border-ink/20 px-2.5 py-2 text-[0.66rem] font-bold text-ink transition-colors hover:border-ink hover:bg-paper sm:px-3 sm:text-[0.68rem]"
            >
              Save PDF
            </button>
            <button
              type="button"
              onClick={onOpenLanding}
              className="inline-flex items-center gap-1.5 rounded-sm bg-wine px-2.5 py-2 text-[0.66rem] font-bold text-ivory transition-colors hover:bg-plum sm:px-3.5 sm:text-[0.68rem]"
            >
              <span className="sm:hidden">Landing page</span>
              <span className="hidden sm:inline">Open landing page</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="overview" className="px-5 pb-14 pt-12 lg:px-10 lg:pb-20 lg:pt-16">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-wine/20 bg-paper px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.13em] text-wine">
                    <Sparkle className="h-3 w-3" />
                    Strategy brief · working draft
                  </span>
                  <span className="tag tag-assumption">Checkpoint open</span>
                </div>

                <h1 className="display-balance mt-6 max-w-[16ch] font-display text-[clamp(3rem,6.7vw,6rem)] font-light leading-[0.92] tracking-[-0.045em] text-ink">
                  Beautiful work.{" "}
                  <em className="font-normal italic text-wine">Verified facts only.</em>
                </h1>

                <p className="copy-pretty mt-6 max-w-[42rem] text-[1rem] leading-relaxed text-muted">
                  Breathtaking Balloon Co has no supplied website, logo, phone, address, hours,
                  pricing or public reviews. This brief separates what is known from what has
                  been inferred, keeps the unknowns visible, and turns the landing page into a
                  working draft the owner can approve.
                </p>
                <p className="mt-3 max-w-[42rem] text-[0.78rem] leading-relaxed text-muted">
                  The exact name did not return an official footprint. That is not proof the
                  business has none. The competitor set is provisional because “London” has no
                  state, province or country.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onOpenLanding}
                    className="group inline-flex items-center gap-2 rounded-sm bg-wine px-5 py-3 text-[0.8rem] font-bold text-ivory transition-colors hover:bg-plum"
                  >
                    View the draft page
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo("approval")}
                    className="inline-flex items-center gap-2 rounded-sm border border-ink/20 bg-paper px-5 py-3 text-[0.8rem] font-bold text-ink transition-colors hover:border-ink"
                  >
                    Jump to owner inputs
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <aside className="rounded-md border border-line bg-paper p-5 shadow-[0_20px_45px_rgba(43,25,37,0.06)] sm:p-6">
                <p className="eyebrow text-wine">At a glance</p>
                <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-line bg-line">
                  {[
                    ["4", "competitors reviewed"],
                    ["0", "verified ratings"],
                    ["12", "owner inputs"],
                    ["1", "primary action"],
                  ].map(([value, label]) => (
                    <div key={label} className="bg-ivory px-4 py-4">
                      <p className="font-display text-3xl leading-none text-ink">{value}</p>
                      <p className="mt-1.5 text-[0.62rem] font-semibold leading-snug text-muted">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3 border-t border-line pt-4">
                  <div className="flex gap-2">
                    <Close className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
                    <p className="text-[0.73rem] leading-relaxed text-muted">
                      <strong className="text-ink">Not launch-ready:</strong> proof, contact
                      details, market and policy approvals are missing.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                    <p className="text-[0.73rem] leading-relaxed text-muted">
                      <strong className="text-ink">Ready for review:</strong> the landing-page
                      structure, copy direction, quote flow and measurement plan.
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-sm bg-shell/70 p-4">
                  <p className="text-[0.59rem] font-extrabold uppercase tracking-[0.12em] text-ink">
                    Evidence key
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {(Object.keys(evidenceMeta) as EvidenceTag[]).map((tag) => (
                      <Tag key={tag} tag={tag} />
                    ))}
                  </div>
                  <p className="mt-2.5 text-[0.62rem] leading-relaxed text-muted">
                    “Verified” means owner-supplied or published on the cited page — not
                    independently audited. Source links appear below every claim.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <div className="border-y border-line bg-ink px-5 py-3 text-ivory lg:px-10">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2">
            <p className="text-[0.65rem] leading-snug">
              <strong className="font-bold text-butter">Launch blocker:</strong> the owner must
              confirm the London market, phone, form inbox and real review assets.
            </p>
            <button
              type="button"
              onClick={() => goTo("approval")}
              className="inline-flex items-center gap-1.5 text-[0.61rem] font-bold uppercase tracking-[0.11em] text-ivory/75 hover:text-butter"
            >
              See the full list
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="grid gap-10 py-12 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-12 lg:py-16">
            <aside className="no-print hidden lg:block">
              <nav
                aria-label="Strategy sections"
                className="sticky top-24 border-l border-line pl-4"
              >
                <p className="mb-3 text-[0.57rem] font-extrabold uppercase tracking-[0.15em] text-muted">
                  In this brief
                </p>
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => goTo(item.id)}
                        className="block w-full py-1.5 text-left text-[0.72rem] font-semibold text-muted transition-colors hover:text-wine"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-sm border border-line bg-paper p-3">
                  <p className="text-[0.55rem] font-bold uppercase tracking-[0.12em] text-muted">
                    Checklist
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-shell">
                    <div
                      className="h-full rounded-full bg-moss transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[0.65rem] font-bold text-ink">
                    {done}/{allItems.length} complete
                  </p>
                </div>
              </nav>
            </aside>

            <div className="min-w-0">
              <section id="audit" className="strategy-section mb-16 lg:mb-24">
                <SectionHead
                  number="01"
                  kicker="Business & brand audit"
                  title="The facts are thin. The room can still be clear."
                  intro="Everything below is either supplied by the owner, inferred from the business name and category, or marked unknown. No logo, colour, price or proof claim has been invented."
                />

                <div className="overflow-hidden rounded-md border border-line bg-paper">
                  <div className="hidden grid-cols-[1.1fr_1.1fr_0.75fr] gap-4 border-b border-line bg-shell/60 px-5 py-3 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-muted sm:grid">
                    <span>Field</span>
                    <span>What we know</span>
                    <span>Evidence</span>
                  </div>
                  <div className="divide-y divide-line">
                    {auditRows.map((row) => (
                      <div
                        key={row.label}
                        className="grid gap-2.5 px-5 py-4 sm:grid-cols-[1.1fr_1.1fr_0.75fr] sm:gap-4"
                      >
                        <p className="text-[0.7rem] font-extrabold uppercase leading-snug tracking-[0.08em] text-muted">
                          {row.label}
                        </p>
                        <div>
                          <p className="text-[0.82rem] font-semibold leading-snug text-ink">
                            {row.value}
                          </p>
                          <p className="mt-1 text-[0.69rem] leading-relaxed text-muted">
                            {row.note}
                          </p>
                        </div>
                        <div className="sm:pt-0.5">
                          <Tag tag={row.tag} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-md border border-line bg-ink p-5 text-ivory sm:p-6">
                    <p className="eyebrow text-butter">Working brand territory</p>
                    <h3 className="mt-3 font-display text-2xl font-light leading-snug">
                      Warm, editorial, grown-up celebration.
                    </h3>
                    <p className="mt-2.5 text-[0.76rem] leading-relaxed text-ivory/65">
                      This is a design proposal, not a recovered brand system. The owner&apos;s
                      real palette and typography should replace it.
                    </p>
                    <div className="mt-4 flex gap-2">
                      {[
                        ["#F6EFE4", "ivory"],
                        ["#4A1F3D", "wine"],
                        ["#F0D9A7", "butter"],
                        ["#C65A78", "peony"],
                      ].map(([hex, name]) => (
                        <div key={hex} className="flex-1">
                          <div
                            className="h-9 rounded-sm border border-ivory/20"
                            style={{ backgroundColor: hex }}
                            aria-hidden="true"
                          />
                          <p className="mt-1 text-[0.52rem] uppercase tracking-wide text-ivory/55">
                            {name}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-[0.6rem] leading-relaxed text-ivory/45">
                      Fraunces (display) + Manrope (body) — proposed. No font files were
                      available to sample.
                    </p>
                  </div>

                  <div className="rounded-md border border-line bg-paper p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="eyebrow text-wine">Before a site audit</p>
                      <Tag tag="unknown" />
                    </div>
                    <h3 className="mt-3 font-display text-[1.6rem] leading-tight text-ink">
                      There is no current page to measure.
                    </h3>
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">
                      No website, Google Business Profile or Yelp listing was supplied. Speed,
                      mobile UX, above-the-fold call visibility, form length, local SEO and
                      trust signals therefore cannot be scored. The new page includes these as
                      launch checks instead of inventing audit scores.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {[
                        "Mobile UX",
                        "Phone visibility",
                        "Form length",
                        "Local SEO basics",
                      ].map((item) => (
                        <span
                          key={item}
                          className="rounded-sm border border-line bg-ivory px-2.5 py-2 text-[0.63rem] font-semibold text-muted"
                        >
                          {item} · not assessable
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-3 flex items-end justify-between gap-3">
                    <h3 className="font-display text-2xl text-ink">
                      Five risks, ranked by likely revenue impact
                    </h3>
                    <span className="tag tag-inferred">Inferred</span>
                  </div>
                  <div className="grid gap-3">
                    {launchRisks.map((risk) => (
                      <div
                        key={risk.rank}
                        className="grid gap-3 rounded-sm border border-line bg-paper px-4 py-4 sm:grid-cols-[44px_1fr_auto] sm:items-start"
                      >
                        <span className="font-display text-2xl leading-none text-peony/75">
                          {risk.rank}
                        </span>
                        <div>
                          <p className="text-[0.83rem] font-bold text-ink">{risk.title}</p>
                          <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">
                            {risk.body}
                          </p>
                        </div>
                        <Tag tag={risk.tag} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="competitors" className="strategy-section mb-16 lg:mb-24">
                <SectionHead
                  number="02"
                  kicker="Provisional local competitor set"
                  title="Four locals. One unresolved market."
                  intro="This is a directional competitor review for London, Ontario. The owner has not confirmed Ontario. No competitor design, imagery or wording has been copied into the landing page."
                />

                <div className="mb-6 grid gap-3 md:grid-cols-3">
                  {competitorMethod.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-sm border border-line bg-paper p-4"
                    >
                      <Tag tag={item.tag} />
                      <h3 className="mt-2.5 font-display text-[1.08rem] text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-md border border-line bg-paper">
                  <div className="hidden grid-cols-[1fr_1fr_1fr] gap-4 bg-shell/60 px-5 py-3 text-[0.58rem] font-extrabold uppercase tracking-[0.14em] text-muted md:grid">
                    <span>Business</span>
                    <span>Offer / CTA</span>
                    <span>Pricing & proof</span>
                  </div>
                  <div className="divide-y divide-line">
                    {competitors.map((competitor) => (
                      <article key={competitor.name} className="p-5 sm:p-6">
                        <div className="grid gap-5 md:grid-cols-[1fr_1fr_1fr] md:gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display text-[1.4rem] leading-tight text-ink">
                                {competitor.name}
                              </h3>
                              <Tag tag="verified" />
                            </div>
                            <p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-muted">
                              {competitor.market} · provisional
                            </p>
                            <p className="mt-3 text-[0.74rem] leading-relaxed text-muted">
                              {competitor.headline}
                            </p>
                            <div className="mt-3">
                              <SourceLink id={competitor.sourceId} />
                            </div>
                          </div>
                          <div>
                            <p className="text-[0.57rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                              Offer
                            </p>
                            <p className="mt-1 text-[0.72rem] leading-relaxed text-ink/80">
                              {competitor.offer}
                            </p>
                            <p className="mt-3 text-[0.57rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                              Primary CTA
                            </p>
                            <p className="mt-1 text-[0.72rem] leading-relaxed text-ink/80">
                              {competitor.cta}
                            </p>
                          </div>
                          <div>
                            <p className="text-[0.57rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                              Pricing transparency
                            </p>
                            <p className="mt-1 text-[0.7rem] leading-relaxed text-ink/80">
                              {competitor.pricing}
                            </p>
                            <p className="mt-3 text-[0.57rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                              Proof
                            </p>
                            <p className="mt-1 text-[0.7rem] leading-relaxed text-ink/80">
                              {competitor.proof}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 border-t border-line pt-4 lg:grid-cols-[1fr_1.1fr]">
                          <div>
                            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-moss">
                              Standout strengths
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {competitor.strengths.map((strength) => (
                                <span
                                  key={strength}
                                  className="rounded-full border border-line bg-ivory px-2.5 py-1 text-[0.61rem] font-semibold text-muted"
                                >
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.12em] text-wine">
                              This page&apos;s opening
                            </p>
                            <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted">
                              {competitor.gap}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="mt-6 rounded-md border border-line bg-paper p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-[1.45rem] text-ink">
                      Review mining: what the market says
                    </h3>
                    <span className="tag tag-unknown">Limits</span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {reviewMining.map((item) => (
                      <div key={item.label} className="rounded-sm border border-line bg-ivory p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-ink">
                            {item.label}
                          </p>
                          <Tag tag={item.tag} />
                        </div>
                        <p className="mt-2 text-[0.72rem] leading-relaxed text-muted">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-sm border-l-2 border-wine bg-shell/60 px-4 py-3">
                    <p className="text-[0.73rem] leading-relaxed text-ink">
                      <strong>Regional fork:</strong> if this is London, UK, the proof bar is
                      visibly higher. UK pages sampled show 4.7–5.0 scores and 164–170+ reviews.
                      The UK set should be researched fully before any ads or SEO work.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {["balloonista", "bubble-bounce", "london-event-decor"].map((id) => (
                        <SourceLink key={id} id={id} />
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section id="positioning" className="strategy-section mb-16 lg:mb-24">
                <SectionHead
                  number="03"
                  kicker="Gaps & positioning"
                  title="Don't out-balloon the market. Out-clarify it."
                  intro="The available evidence supports a clarity-led position, not a claim of superiority. Every recommendation below is a hypothesis to test after the owner supplies proof and contact data."
                />

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-md border border-line bg-paper p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-[1.55rem] text-ink">Weaknesses, bluntly</h3>
                      <Tag tag="inferred" />
                    </div>
                    <ol className="mt-4 space-y-3">
                      {weaknesses.map((item, index) => (
                        <li key={item} className="flex gap-3">
                          <span className="font-display text-lg leading-none text-peony/80">
                            0{index + 1}
                          </span>
                          <p className="text-[0.77rem] leading-relaxed text-muted">{item}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="rounded-md border border-line bg-paper p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-[1.55rem] text-ink">
                        Unclaimed positions
                      </h3>
                      <Tag tag="proposed" />
                    </div>
                    <div className="mt-4 space-y-4">
                      {unclaimedPositions.map((position) => (
                        <div key={position.title} className="border-l border-line pl-3">
                          <p className="text-[0.8rem] font-bold text-ink">{position.title}</p>
                          <p className="mt-1 text-[0.71rem] leading-relaxed text-muted">
                            {position.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-md bg-wine text-ivory">
                  <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
                    <div>
                      <p className="eyebrow text-butter">Recommended positioning</p>
                      <blockquote className="mt-3 font-display text-[clamp(1.45rem,2.5vw,2rem)] font-light leading-snug">
                        “{positioningStatement}”
                      </blockquote>
                      <p className="mt-3 text-[0.64rem] leading-relaxed text-ivory/55">
                        Draft. Owner approval required. No competitor is named in customer-facing
                        copy.
                      </p>
                    </div>
                    <div className="rounded-sm border border-ivory/20 bg-ivory/[0.06] p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="eyebrow text-butter">One core offer</p>
                        <span className="rounded-full border border-ivory/25 px-2 py-1 text-[0.51rem] uppercase tracking-wide text-ivory/65">
                          To approve
                        </span>
                      </div>
                      <p className="mt-3 font-display text-[1.25rem] leading-snug">
                        {coreOffer}
                      </p>
                      <p className="mt-3 text-[0.68rem] leading-relaxed text-ivory/60">
                        Why: the category is visual and competitors devote significant page space
                        to price and custom colour questions. A pre-build colour plan directly
                        addresses those uncertainties without competing on a price claim.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-px border-t border-ivory/15 bg-ivory/15 sm:grid-cols-2">
                    {conversionActions.map((action) => (
                      <div key={action.label} className="bg-wine px-5 py-4 sm:px-7">
                        <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.14em] text-butter/80">
                          {action.label} conversion
                        </p>
                        <p className="mt-1 font-display text-[1.2rem]">{action.action}</p>
                        <p className="mt-1.5 text-[0.67rem] leading-relaxed text-ivory/65">
                          {action.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <WhyItShouldWork />
              </section>

              <section id="build" className="strategy-section mb-16 lg:mb-24">
                <SectionHead
                  number="04"
                  kicker="Build notes & evidence"
                  title="A page built to be finished, not just admired."
                  intro="The landing page is a complete draft, not a live business page. Placeholder labels are a feature: they tell the owner exactly what is missing."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {buildNotes.map((note, index) => (
                    <div key={note.label} className="rounded-sm border border-line bg-paper p-4">
                      <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.12em] text-wine">
                        0{index + 1} · {note.label}
                      </p>
                      <p className="mt-1.5 text-[0.75rem] leading-relaxed text-muted">
                        {note.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-md border border-line bg-shell/65 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-[1.45rem] text-ink">
                      Copy & SEO decisions
                    </h3>
                    <Tag tag="proposed" />
                  </div>
                  <div className="mt-3 grid gap-4 text-[0.75rem] leading-relaxed text-muted sm:grid-cols-2">
                    <p>
                      <strong className="text-ink">Meta title:</strong> Balloon Decor in London |
                      Breathtaking Balloon Co.
                      <br />
                      <strong className="text-ink">Target:</strong> custom balloon arches,
                      garlands and backdrops in London. Add the region once confirmed.
                    </p>
                    <p>
                      <strong className="text-ink">Schema:</strong> name + areaServed only.
                      No phone, address, URL, hours, price shape or aggregateRating until
                      verified. Fake review markup is never acceptable.
                    </p>
                    <p>
                      <strong className="text-ink">Reading level:</strong> short sentences,
                      concrete outcomes, no superlatives or unverifiable “top-rated” language.
                    </p>
                    <p>
                      <strong className="text-ink">Primary trust line:</strong> omitted, because
                      no rating exists. The page does not substitute a claim for a review.
                    </p>
                  </div>
                </div>
              </section>

              <section id="checklist" className="strategy-section mb-16 lg:mb-24">
                <SectionHead
                  number="05"
                  kicker="Pre-launch checklist"
                  title="Nothing goes live until these are real."
                  intro="Tick items as they are completed. This state is for the review session and is not saved between visits."
                />

                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-line bg-paper px-4 py-3">
                  <div>
                    <p className="text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                      Owner launch readiness
                    </p>
                    <p className="mt-0.5 font-display text-2xl text-ink">
                      {done}
                      <span className="text-base text-muted"> / {allItems.length} complete</span>
                    </p>
                  </div>
                  <div className="min-w-[140px] flex-1 sm:max-w-xs">
                    <div
                      className="h-2 overflow-hidden rounded-full bg-shell"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Launch checklist progress"
                    >
                      <div
                        className="h-full rounded-full bg-moss transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                  {checklistGroups.map((group) => (
                    <div
                      key={group.id}
                      className="rounded-md border border-line bg-paper p-5"
                    >
                      <h3 className="font-display text-[1.3rem] leading-tight text-ink">
                        {group.title}
                      </h3>
                      <p className="mt-1 text-[0.67rem] text-muted">{group.description}</p>
                      <ul className="mt-4 space-y-2.5">
                        {group.items.map((item) => {
                          const key = `${allItems.indexOf(item)}`;
                          const isChecked = Boolean(checked[key]);
                          return (
                            <li key={item}>
                              <label className="flex cursor-pointer items-start gap-2.5 text-[0.7rem] leading-relaxed text-muted">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleChecklist(key)}
                                  className="peer sr-only"
                                />
                                <span
                                  className={cn(
                                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-plum peer-focus-visible:ring-offset-2",
                                    isChecked
                                      ? "border-moss bg-moss text-ivory"
                                      : "border-ink/25 bg-ivory text-transparent"
                                  )}
                                  aria-hidden="true"
                                >
                                  <Check className="h-3 w-3" />
                                </span>
                                <span className={isChecked ? "line-through opacity-60" : ""}>
                                  {item}
                                </span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section id="tests" className="strategy-section mb-16 lg:mb-24">
                <SectionHead
                  number="06"
                  kicker="A/B test plan"
                  title="Test proof first. Then test the promise."
                  intro="Ranked by expected impact once the launch blockers are fixed. None of these should run on a page that has no real contact destination."
                />
                <div className="space-y-4">
                  {abTests.map((test) => (
                    <article key={test.rank} className="rounded-md border border-line bg-paper p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-[0.57rem] font-extrabold uppercase tracking-[0.12em] text-wine">
                            Test {test.rank} · {test.scope}
                          </p>
                          <h3 className="mt-1 font-display text-[1.45rem] leading-tight text-ink">
                            {test.name}
                          </h3>
                        </div>
                        <span className="rounded-full border border-moss/30 bg-moss/10 px-2.5 py-1 text-[0.56rem] font-bold uppercase tracking-wide text-moss">
                          {test.impact}
                        </span>
                      </div>
                      <p className="mt-3 text-[0.77rem] leading-relaxed text-muted">
                        <strong className="text-ink">Hypothesis:</strong> {test.hypothesis}
                      </p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div className="rounded-sm bg-ivory p-3 text-[0.69rem] leading-relaxed text-muted">
                          <strong className="text-ink">Control:</strong> {test.control}
                        </div>
                        <div className="rounded-sm bg-blush/45 p-3 text-[0.69rem] leading-relaxed text-muted">
                          <strong className="text-ink">Variant:</strong> {test.variant}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 text-[0.66rem] leading-relaxed text-muted sm:flex-row sm:justify-between">
                        <p>
                          <strong className="text-ink">Metric:</strong> {test.metric}
                        </p>
                        <p className="sm:max-w-[44%]">
                          <strong className="text-ink">Guardrail:</strong> {test.caveat}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-5 rounded-md border border-wine/20 bg-blush/45 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-xl text-ink">Planning benchmark</p>
                    <Tag tag="assumption" />
                  </div>
                  <p className="mt-2 text-[0.77rem] font-semibold leading-relaxed text-ink/80">
                    {benchmarkNote.estimate}
                  </p>
                  <p className="mt-2 text-[0.67rem] leading-relaxed text-muted">
                    {benchmarkNote.caution}
                  </p>
                  <p className="mt-2 text-[0.61rem] leading-relaxed text-muted">
                    Test duration and sample size are not stated as facts. Before running any
                    test, calculate the sample needed for the current traffic level and stop at
                    a pre-registered decision rule.
                  </p>
                </div>
              </section>

              <section id="tracking" className="strategy-section mb-16 lg:mb-24">
                <SectionHead
                  number="07"
                  kicker="Tracking plan"
                  title="Measure the actions that make money."
                  intro="The draft already pushes these names to dataLayer with a preview flag. Before launch, forward them to GA4 / GTM, add consent handling and verify from a real device."
                />
                <div className="overflow-hidden rounded-md border border-line bg-paper">
                  <div className="hidden grid-cols-[1fr_1.4fr_0.9fr_1fr] gap-3 bg-shell/60 px-4 py-3 text-[0.57rem] font-extrabold uppercase tracking-[0.12em] text-muted md:grid">
                    <span>Event</span>
                    <span>Trigger</span>
                    <span>Conversion?</span>
                    <span>Notes</span>
                  </div>
                  <div className="divide-y divide-line">
                    {trackingEvents.map((event) => (
                      <div
                        key={event.event}
                        className="grid gap-2 px-4 py-3.5 md:grid-cols-[1fr_1.4fr_0.9fr_1fr] md:gap-3"
                      >
                        <code className="self-start rounded-sm bg-ink px-1.5 py-1 text-[0.64rem] text-butter">
                          {event.event}
                        </code>
                        <p className="text-[0.7rem] leading-relaxed text-muted">
                          {event.trigger}
                        </p>
                        <p className="text-[0.67rem] font-bold leading-relaxed text-ink">
                          {event.conversion}
                        </p>
                        <p className="text-[0.66rem] leading-relaxed text-muted">
                          {event.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      title: "Attribution",
                      body: "Capture UTM values, gclid and fbclid into the lead payload. Do not rely on a page URL alone.",
                    },
                    {
                      title: "Call quality",
                      body: "If calls matter, use a tracked number with recorded consent rules. Mark only qualified conversations as conversions.",
                    },
                    {
                      title: "Data hygiene",
                      body: "No names or email addresses in analytics event parameters. Keep the submission payload in the CRM, not GA4.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-sm border border-line bg-paper p-4">
                      <p className="text-[0.63rem] font-extrabold uppercase tracking-[0.1em] text-wine">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="approval" className="strategy-section mb-16 lg:mb-24">
                <div className="overflow-hidden rounded-md border border-wine/25 bg-paper">
                  <div className="bg-wine p-5 text-ivory sm:p-7">
                    <p className="eyebrow text-butter">Checkpoint · approval required</p>
                    <h2 className="mt-3 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-tight">
                      Stop here until the owner supplies the unknowns.
                    </h2>
                    <p className="mt-3 max-w-2xl text-[0.82rem] leading-relaxed text-ivory/70">
                      This page is a presentation draft, not a launch. The items below must be
                      answered, uploaded or approved before paid traffic reaches it.
                    </p>
                  </div>
                  <div className="grid gap-px bg-line sm:grid-cols-2">
                    {ownerUnknowns.map((item, index) => (
                      <div key={item} className="flex gap-3 bg-paper px-5 py-3.5">
                        <span className="font-display text-sm leading-snug text-peony/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[0.74rem] leading-relaxed text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col justify-between gap-3 border-t border-line bg-shell/60 px-5 py-4 sm:flex-row sm:items-center">
                    <p className="max-w-xl text-[0.67rem] leading-relaxed text-muted">
                      Do not launch call ads, submit a Google Business Profile update or publish
                      pricing until these are confirmed. Unverified claims have been labelled in
                      the draft, not silently filled.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenLanding}
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-sm bg-ink px-4 py-2.5 text-[0.7rem] font-bold text-ivory hover:bg-wine sm:self-auto"
                    >
                      Review the draft
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </section>

              <section id="sources" className="strategy-section">
                <SectionHead
                  number="08"
                  kicker="Sources"
                  title="Receipts, not vibes."
                  intro="Every competitor claim above links to the page where it was published. Ratings are labelled as published where found and unknown where not."
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  {sources.map((source, index) => (
                    <a
                      key={source.id}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-sm border border-line bg-paper p-4 transition-colors hover:border-wine/40 hover:bg-blush/20"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[0.57rem] font-extrabold uppercase tracking-[0.12em] text-wine">
                          Source {String(index + 1).padStart(2, "0")}
                        </p>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <p className="mt-1.5 text-[0.8rem] font-bold text-ink">{source.label}</p>
                      <p className="mt-1 text-[0.66rem] leading-relaxed text-muted">
                        {source.note}
                      </p>
                    </a>
                  ))}
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-md border border-line bg-paper p-5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-wine">
                      <BalloonMark className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display text-lg text-ink">Ready for a walkthrough?</p>
                      <p className="text-[0.69rem] text-muted">
                        Open the draft, then bring the owner inputs back here.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenLanding}
                    className="inline-flex items-center gap-2 rounded-sm bg-wine px-4 py-2.5 text-[0.72rem] font-bold text-ivory hover:bg-plum"
                  >
                    Open landing page
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-line px-5 py-8 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-4 text-[0.65rem] text-muted sm:flex-row sm:items-center">
          <p>
            Breathtaking Balloon Co · strategy brief · Working draft for owner approval. No
            verified ratings, prices, testimonials or guarantees are claimed.
          </p>
          <button
            type="button"
            onClick={() => goTo("overview")}
            className="inline-flex items-center gap-1.5 self-start font-bold uppercase tracking-[0.11em] text-ink hover:text-wine sm:self-auto"
          >
            Back to top
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </footer>
    </div>
  );
}
