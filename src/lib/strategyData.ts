export type EvidenceTag =
  | "verified"
  | "inferred"
  | "proposed"
  | "assumption"
  | "unknown";

export const evidenceMeta: Record<EvidenceTag, { label: string; description: string }> = {
  verified: {
    label: "Verified",
    description: "Stated in the owner brief or published on a cited source page.",
  },
  inferred: {
    label: "Inferred",
    description: "A reasoned reading of the available evidence, not a confirmed fact.",
  },
  proposed: {
    label: "Proposed",
    description: "Draft copy or policy created for this page. Owner approval is required.",
  },
  assumption: {
    label: "Assumption",
    description: "A working choice made because the brief left this input blank.",
  },
  unknown: {
    label: "Unknown",
    description: "Not supplied and not located. It must not be presented as fact.",
  },
};

export type Source = {
  id: string;
  label: string;
  url: string;
  note: string;
};

export const sources: Source[] = [
  {
    id: "balloonia-home",
    label: "Balloonia Events — homepage",
    url: "https://balloonia.events/",
    note: "London, Ontario competitor. Headline, services, quote timeframe, founder story and on-site testimonials reviewed.",
  },
  {
    id: "balloonia-weddings",
    label: "Balloonia Events — wedding page",
    url: "https://balloonia.events/services/weddings",
    note: "Published local pricing ranges, FAQ topics and venue-coordination claims reviewed.",
  },
  {
    id: "balloonia-shop",
    label: "Balloonia Events — full arch product",
    url: "https://shop.balloonia.events/products/full-balloon-arch",
    note: "Published CAD price and delivery/setup inclusion reviewed.",
  },
  {
    id: "beautiful-home",
    label: "Beautiful Balloons — homepage",
    url: "https://www.beautifulballoons.ca/",
    note: "London, Ontario competitor. Services, free quote CTA, logo-free visual assets and anniversary claim reviewed.",
  },
  {
    id: "mccullochs",
    label: "McCullochs Balloon Decorating",
    url: "https://www.mccullochscostume.com/balloondecorating.html",
    note: "London, Ontario competitor. Storefront details, Qualatex claim and inventory-led positioning reviewed.",
  },
  {
    id: "aarvee",
    label: "Aarvee Balloons Decoration",
    url: "https://www.aarveeballoonsdecoration.com/",
    note: "London, Ontario competitor. Theme-led offer, address in schema and published service range reviewed.",
  },
  {
    id: "balloonista",
    label: "Balloonista — London, UK",
    url: "https://www.balloonista.com/",
    note: "Only used for the regional fork. Homepage displays a 4.9 rating from 170+ Google reviews and luxury venue clients, as published.",
  },
  {
    id: "bubble-bounce",
    label: "Bubble & Bounce — London, UK",
    url: "https://bubbleandbounce.co.uk/balloon-decor-event-styling-packages/",
    note: "Only used for the regional fork. Page displays a 4.7 Trustindex score and a 2012 operating claim, as published.",
  },
  {
    id: "london-event-decor",
    label: "London Event Decor — Trustindex profile",
    url: "https://www.trustindex.io/reviews/www.bloomandballoon.com",
    note: "Only used for the regional fork. Aggregator shows 5.0 from 164 reviews across Google and Trustindex, as published.",
  },
];

export type AuditRow = {
  label: string;
  value: string;
  tag: EvidenceTag;
  note: string;
};

export const auditRows: AuditRow[] = [
  {
    label: "Business name",
    value: "Breathtaking Balloon Co",
    tag: "verified",
    note: "Owner-supplied in the brief. Exact-name search did not return an official website or business profile.",
  },
  {
    label: "Industry / sub-niche",
    value: "Custom balloon installation and event styling",
    tag: "inferred",
    note: "Reasoned from the business name and the London balloon-decor search category. Not stated by the owner.",
  },
  {
    label: "Location",
    value: "London — region unresolved",
    tag: "unknown",
    note: "The city is owner-supplied. No state, province or country was given. The competitor set below uses London, Ontario provisionally; the page does not name a region.",
  },
  {
    label: "Website / profiles",
    value: "None supplied; no official profile located",
    tag: "unknown",
    note: "No website, Google Business Profile, Yelp page or social profile was provided. An exact-name search did not surface one. This is not proof that none exists.",
  },
  {
    label: "Phone, email, address",
    value: "Not supplied; not verified",
    tag: "unknown",
    note: "No contact information is published in the page footer. Click-to-call is intentionally inactive.",
  },
  {
    label: "What they sell",
    value: "Arches, garlands, backdrops, ceilings and milestone moments",
    tag: "proposed",
    note: "A reasonable category offer based on the service name. Product mix, inclusions and availability need owner confirmation.",
  },
  {
    label: "Price tier",
    value: "No client prices available",
    tag: "unknown",
    note: "No price, starting price or price range is displayed on the page. Competitor ranges are not treated as the client's prices.",
  },
  {
    label: "Logo",
    value: "No logo asset supplied or located",
    tag: "unknown",
    note: "The page uses a clearly labelled typographic wordmark and balloon mark placeholder. It is not claimed as the brand's logo.",
  },
  {
    label: "Brand colours",
    value: "Working palette only; not sampled from a brand file",
    tag: "inferred",
    note: "Ivory #F6EFE4, wine #4A1F3D, plum #62284F, butter #F0D9A7, blush #F2DCDA and charcoal-ink #2B1925 were selected for this draft. They are not verified brand colours.",
  },
  {
    label: "Fonts",
    value: "Fraunces + Manrope",
    tag: "proposed",
    note: "Selected for this page. No current font files or site CSS were available to detect.",
  },
  {
    label: "Proof assets",
    value: "0 verified ratings · 0 verified reviews",
    tag: "unknown",
    note: "No rating, review count, years in business, award, licence or insurance claim could be verified. The page shows review placeholders rather than invented praise.",
  },
  {
    label: "Hours",
    value: "Not supplied",
    tag: "unknown",
    note: "Displayed as 'to be confirmed' and excluded from schema.",
  },
  {
    label: "Primary goal",
    value: "Quote request",
    tag: "assumption",
    note: "The brief's GOAL input was blank. A quote request is the measurable primary action; a phone call is secondary but cannot go live without a number.",
  },
  {
    label: "Traffic source",
    value: "Local search + social",
    tag: "assumption",
    note: "The brief's TRAFFIC input was blank. The page is written for high-intent local traffic and visual social referral. Confirm before choosing ad channels.",
  },
];

export const launchRisks = [
  {
    rank: "01",
    title: "No proof to earn trust",
    body: "No rating, review, real photo, client name or credential was found. For a visual, trust-led purchase, that is the largest conversion gap.",
    tag: "inferred" as EvidenceTag,
  },
  {
    rank: "02",
    title: "No live contact path",
    body: "A phone number and form inbox are both missing. High-intent callers have no way to become leads, and no one can receive a submitted enquiry.",
    tag: "inferred" as EvidenceTag,
  },
  {
    rank: "03",
    title: "“London” is not a market yet",
    body: "The country, province/state and service radius are unresolved. Local SEO, ad targeting and competitor pricing cannot be finalised until this is known.",
    tag: "inferred" as EvidenceTag,
  },
  {
    rank: "04",
    title: "No approved offer or policy",
    body: "The colour plan, quote turnaround, delivery inclusions, cancellation terms and guarantee are all proposals. An unapproved promise is a legal and trust risk.",
    tag: "inferred" as EvidenceTag,
  },
  {
    rank: "05",
    title: "No brand or photo assets",
    body: "A logo, favicon and real installation photos are needed before launch. Concept images are labelled and must not be shown as past work.",
    tag: "inferred" as EvidenceTag,
  },
];

export type Competitor = {
  name: string;
  market: string;
  url: string;
  sourceId: string;
  headline: string;
  offer: string;
  cta: string;
  pricing: string;
  proof: string;
  strengths: string[];
  gap: string;
};

export const competitors: Competitor[] = [
  {
    name: "Balloonia Events",
    market: "London, Ontario",
    url: "https://balloonia.events/",
    sourceId: "balloonia-home",
    headline:
      "“Custom balloon installations, built fresh for your event.” (exact as published)",
    offer:
      "Wedding arches, shower walls, corporate activations, birthdays and grad backdrops; build, delivery, install and cleanup.",
    cta: "Order online / send event details for a custom quote",
    pricing:
      "Highly visible: from $599 for a metal round arch, from $799 for a grand arch; wedding arches published at $499–$2,400. Quote returned within 24 hours, as claimed. [VERIFIED as published]",
    proof:
      "On-site client testimonials and large real-install gallery. No aggregate review rating or count displayed; platform verification is [UNKNOWN].",
    strengths: [
      "Clear price ranges before contact",
      "Founder story and real install imagery",
      "Detailed venue, access and structural guidance",
      "Fast quote promise and online ordering",
    ],
    gap:
      "The site uses production-heavy copy and a broad offer. A small, focused page can answer price, timing and colour questions faster.",
  },
  {
    name: "Beautiful Balloons",
    market: "London, Ontario",
    url: "https://www.beautifulballoons.ca/",
    sourceId: "beautiful-home",
    headline:
      "“Create Memorable Events — Book Now” (page title; no clear on-page headline extracted)",
    offer:
      "Balloon garlands and backdrops, shimmer/greenery walls, arch and ring stands, delivery, setup and tear-down.",
    cta: "“Grab A Free Quote !” (as published)",
    pricing: "No public decor pricing found. [UNKNOWN]",
    proof:
      "Self-published fifth-anniversary claim. No rating, review count or verified client review found. [VERIFIED as published / rating UNKNOWN]",
    strengths: [
      "Free quote CTA repeated on the page",
      "Full setup and tear-down listed",
      "Strong visual portfolio",
      "Clear service categories",
    ],
    gap:
      "No visible starting prices and no platform-level proof. A page that sets out inclusions and quote scope can reduce uncertainty.",
  },
  {
    name: "McCullochs Balloon Decorating",
    market: "London, Ontario",
    url: "https://www.mccullochscostume.com/balloondecorating.html",
    sourceId: "mccullochs",
    headline:
      "“Balloon Decorating in London, Ontario” with “No job is too big or too small.” (as published)",
    offer:
      "Balloon décor, sculpture, corporate logo design, balloon drops, seasonal décor and a retail balloon department.",
    cta: "Visit the store at 1140 Dundas St; no clear online quote path extracted",
    pricing:
      "No decor pricing found; individual retail balloon prices are listed. [UNKNOWN for installs]",
    proof:
      "Self-published Qualatex-certified balloon artist claim and a physical storefront. No rating or review count verified. [UNKNOWN]",
    strengths: [
      "Physical retail presence and broad inventory",
      "Established local-search visibility",
      "Sculptural and corporate capability",
      "Low-friction storefront contact",
    ],
    gap:
      "Dated presentation and an unclear online conversion path. A modern, mobile-first quote experience can feel lower-effort.",
  },
  {
    name: "Aarvee Balloons Decoration",
    market: "London, Ontario",
    url: "https://www.aarveeballoonsdecoration.com/",
    sourceId: "aarvee",
    headline: "“Celebrate with us your best Moments” (exact as published)",
    offer:
      "Custom themed balloon décor, Indian wedding mandaps, birthdays, showers and corporate events.",
    cta: "Theme gallery / direct enquiry; no clear primary CTA extracted",
    pricing: "No public pricing found. [UNKNOWN]",
    proof:
      "Address in site schema at 400 Lyle St #614. No rating or review count verified. [UNKNOWN]",
    strengths: [
      "Distinct cultural and themed niche",
      "Strong, recognisable visual style",
      "Wedding and mandap capability",
      "Claims service across Canada",
    ],
    gap:
      "Theme-led rather than host-led; little reassurance on process, quote scope or timing. Clear planning content is an opening.",
  },
];

export const competitorMethod = [
  {
    title: "How this set was chosen",
    tag: "inferred" as EvidenceTag,
    body: "Searched “[balloon décor] [London]” and reviewed the map/listing-style local results. The only coherent direct set returned was London, Ontario. These four are the closest visible matches by service and city. They were not selected by rating.",
  },
  {
    title: "Why it is provisional",
    tag: "unknown" as EvidenceTag,
    body: "The owner supplied “London” with no state, province or country. If this is London, UK, these are not the direct competitors. The UK cohort I sampled includes Balloonista, Bubble & Bounce and London Event Decor; review depth and luxury positioning are visibly more mature there. Re-run the local set before launch.",
  },
  {
    title: "What could not be verified",
    tag: "unknown" as EvidenceTag,
    body: "No reliable star rating or review count was accessible for the four Ontario competitors. No 1–3 star review corpus was exposed in the pages reviewed. I have not invented sample complaints to fill the gap.",
  },
];

export const reviewMining = [
  {
    label: "Client reviews",
    tag: "unknown" as EvidenceTag,
    body: "No client reviews exist because no client review profile was supplied or located. The page uses attributed placeholder slots, not fabricated quotes.",
  },
  {
    label: "Negative competitor reviews",
    tag: "unknown" as EvidenceTag,
    body: "The accessible competitor pages did not surface 1–3 star reviews. Ratings and review corpora remain unknown. Complaint-based positioning is therefore evidence-limited and must be validated with the owner and live review access.",
  },
  {
    label: "Five-star language",
    tag: "verified" as EvidenceTag,
    body: "Balloonia's self-published testimonials emphasise colour match, photographing beautifully, professional setup, detailed styling and a smooth process. These are published on the competitor's own site, not an independently verified review platform.",
  },
  {
    label: "Objections competitors answer",
    tag: "verified" as EvidenceTag,
    body: "Competitor FAQ pages spend substantial space on price ranges, how far ahead to book, delivery/travel, venue access, custom colours and outdoor balloon life. That confirms these are questions the category expects; it does not prove how often they block a purchase.",
  },
  {
    label: "Likely market pain",
    tag: "inferred" as EvidenceTag,
    body: "Colour mismatch, unclear inclusions and event-day reliability are the strongest inferable themes. They align with the visual nature of the product and the volume of competitor reassurance around pricing, setup and colour matching.",
  },
  {
    label: "Market proof bar",
    tag: "verified" as EvidenceTag,
    body: "In the London, UK cohort sampled, London Event Decor's Trustindex profile displays 5.0 from 164 reviews, while Balloonista displays 4.9 from 170+ Google reviews. These are published on each source, not independently audited. If the owner's London is the UK, the page must not launch without verified social proof.",
  },
];

export const weaknesses = [
  "No proof assets. A premium visual service with no faces, reviews or real installs has an immediate credibility ceiling.",
  "No verified contact channel. A quote form without an owner inbox or phone is not a funnel; it is a mock-up.",
  "No defined market. London can be Ontario, the UK or Kentucky. Ads, SEO and competitor pricing depend on this answer.",
  "No approved commercial promise. Free colour plan, response time, deposits and setup scope are all drafts.",
  "No original brand assets. The wordmark and photos are placeholders until files arrive.",
];

export const unclaimedPositions = [
  {
    title: "Show the plan before asking for the deposit",
    tag: "proposed" as EvidenceTag,
    body: "No competitor page reviewed publicly promises a tailored colour-and-scale plan before booking. Balloonia promises the most transparent process, but leads with price ranges and product ordering. A visual pre-booking plan is a defensible, low-cost way to reduce colour anxiety.",
  },
  {
    title: "Make every line visible",
    tag: "proposed" as EvidenceTag,
    body: "Balloonia publishes ranges and Beautiful Balloons offers a free quote, but neither publicly demonstrates an itemised quote with setup, travel and takedown. A visible quote standard can answer the surprise-cost objection without naming a competitor.",
  },
  {
    title: "A finished room, not an install appointment",
    tag: "proposed" as EvidenceTag,
    body: "Setup and teardown are not unclaimed (competitors already offer both). The gap is in proving the hand-off: what is finished, when the client can walk in, and what is removed afterwards. Present this as a written standard, not a vague 'hassle-free' claim.",
  },
];

export const positioningStatement =
  "For London hosts who care how the room looks and photographs, Breathtaking Balloon Co. designs custom balloon installations with a colour-first plan, an itemised quote and setup handled before guests arrive.";

export const coreOffer =
  "The Colour Plan + Clear Quote: a tailored colour-and-scale direction plus one itemised quote covering delivery, setup and agreed extras — approved before the deposit.";

export const conversionActions = [
  {
    label: "Primary",
    action: "Quote request",
    detail:
      "A four-field enquiry captures name, email, date and celebration type. It is measurable, fits a high-consideration visual purchase, and works without a phone number. Wire it to the owner's inbox before launch.",
  },
  {
    label: "Secondary",
    action: "Phone call",
    detail:
      "Useful for urgent dates, venues and planners, but intentionally inactive until a verified business number is supplied. No placeholder tel: link is shipped.",
  },
];

export const buildNotes = [
  {
    label: "Page structure",
    body: "Hero → pain/solution → services → concept work → honest proof → approach → three-step process → proposed clarity standards → FAQ → quote form with area/hours/contact status.",
  },
  {
    label: "Meta",
    body: "Title: “Balloon Decor in London | Breathtaking Balloon Co.”. Description focuses on custom balloon arches, garlands and backdrops for London celebrations, a colour-led plan and one clear quote. Region must be added once confirmed.",
  },
  {
    label: "Schema",
    body: "Minimal LocalBusiness JSON-LD includes only the verified name and London areaServed. Phone, address, URL, hours, price range and aggregateRating are deliberately omitted until verified.",
  },
  {
    label: "Contrast",
    body: "Measured WCAG ratios: ink/ivory 14.49:1, wine/ivory 11.83:1, muted/ivory 5.35:1, butter/wine 9.77:1. Peony measures 3.58:1 on ivory, so it is restricted to large/decorative marks; readable copy uses plum, wine or ink.",
  },
  {
    label: "Forms & accessibility",
    body: "Four labelled fields, inline validation, no dependency on colour alone, visible focus rings, keyboard-operable accordion, skip-free semantic landmarks, descriptive alt text and lazy loading below the fold.",
  },
  {
    label: "Mobile conversion",
    body: "Sticky call + quote bar on mobile. The call button opens a transparent placeholder note until a verified number exists. The primary action remains fixed and reachable one-handed.",
  },
  {
    label: "Known limitation",
    body: "No owner-provided proof, prices or policies exist, so the page labels these rather than filling gaps. Real photography, reviews and terms must replace the placeholders before anyone can call the page launch-ready.",
  },
];

export type ChecklistGroup = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const checklistGroups: ChecklistGroup[] = [
  {
    id: "owner-assets",
    title: "Owner must supply",
    description: "Facts and assets the page cannot invent.",
    items: [
      "Confirm the market: London, Ontario / London, UK / London, KY (or other) and the service radius.",
      "Verified business phone number and the hours it is answered.",
      "Email or CRM inbox to receive quote requests, plus an owner or studio contact name.",
      "Street address, if public, or a written service-area business policy.",
      "Vector logo files, favicon and any approved brand palette / fonts.",
      "Six to ten real installation photos with photographer credit and permission.",
      "Three verified client reviews, exact words, first name + initial, platform and permission.",
      "Current Google rating, review count and profile URL, only if the profile exists.",
      "Verified starting prices or approved price ranges; otherwise keep quote-only wording.",
      "Approved inclusions: delivery, travel, setup, takedown, disposal and deposit.",
      "Approved cancellation, weather, reschedule and refund policy.",
      "Proof for any licence, insurance, certification, years-in-business or award claim.",
    ],
  },
  {
    id: "owner-approvals",
    title: "Owner must approve",
    description: "Proposed copy that is not factual yet.",
    items: [
      "The positioning statement and hero headline.",
      "The “Colour Plan + Clear Quote” offer and whether it is free or deposit-backed.",
      "Response-time language. The current page does not claim 24 hours.",
      "All four proposed service standards and the three clarity steps.",
      "Every FAQ answer, especially availability, setup, outdoor life and venue rules.",
      "The exact business name, service area, hours and address as they appear on the Google profile.",
      "Whether the no-deposit and sample privacy wording is accurate.",
      "A final read of all customer-facing copy for UK vs Canadian spelling.",
    ],
  },
  {
    id: "build-integration",
    title: "Build & integration",
    description: "Technical work needed before launch.",
    items: [
      "Connect the quote form to the verified inbox / CRM and add a real confirmation email.",
      "Add spam protection and disclose how form data is stored.",
      "Publish a privacy policy and cookie / consent handling appropriate to the market.",
      "Install GA4/GTM and map quote_submit + verified call_click as conversions.",
      "Capture utm_source, utm_medium, utm_campaign, gclid and fbclid into hidden lead fields.",
      "Add dynamic call tracking only if the tracked number is approved and consistent.",
      "Update LocalBusiness schema with phone, address, URL, hours, geo and price range only after verification.",
      "Replace concept images with optimised real photos; keep descriptive alt text accurate.",
      "Add favicon, correct OG image and a canonical URL once the domain is known.",
      "Test at 320 px, on iOS Safari, with keyboard only, at 200% zoom and with reduced motion.",
      "Run Lighthouse / PageSpeed and fix any LCP image or contrast regressions.",
      "Remove the preview ribbon and change the footer status only after every item above is signed off.",
    ],
  },
];

export const ownerUnknowns = [
  "Which London, and what is the exact service area?",
  "What is the phone number, and can calls be tracked?",
  "Where should quote-form enquiries and confirmations go?",
  "What is the public address or service-area policy?",
  "What are the real opening hours?",
  "What is the current Google Business Profile / Yelp status and rating?",
  "Does a logo or brand guideline exist?",
  "Can the owner supply real photos and customer permissions?",
  "What are the actual service inclusions and starting prices?",
  "Is the colour plan free, and what is the promised turnaround?",
  "What guarantee, cancellation and weather policies are real?",
  "Which goal and traffic source did the blank template inputs intend?",
];

export const abTests = [
  {
    rank: "01",
    name: "Verified proof vs. honest placeholder",
    impact: "Highest expected impact",
    scope: "Review module",
    hypothesis:
      "Showing a verified Google rating plus three attributed reviews immediately below the hero will increase quote starts and submissions compared with a placeholder proof panel.",
    control: "Current honest placeholder panel.",
    variant:
      "Real rating + three real reviews + one real install photo. Only launch once every element is verifiable and permitted.",
    metric: "quote_submit per session; quote_form_start as a leading indicator.",
    caveat:
      "Dependent on owner-supplied proof. Do not run a fake-review variant under any circumstances.",
    tag: "proposed" as EvidenceTag,
  },
  {
    rank: "02",
    name: "Colour-plan offer vs. outcome headline",
    impact: "High expected impact",
    scope: "Hero",
    hypothesis:
      "A specific, low-risk offer (“Get my colour plan”) gives a visual buyer a clearer next step than a generic outcome headline and increases quote submissions.",
    control: "Current colour-first headline + 'Get my colour plan' CTA.",
    variant:
      "Outcome-first headline focused on the finished room + 'Plan my installation' CTA. Keep the same form and body sections.",
    metric: "cta_click to quote_submit conversion; scroll depth to services.",
    caveat:
      "Requires one offer definition. If the colour plan has a cost, the test must reflect that honestly.",
    tag: "proposed" as EvidenceTag,
  },
  {
    rank: "03",
    name: "Four-field form vs. two-step enquiry",
    impact: "Medium expected impact",
    scope: "Final CTA form",
    hypothesis:
      "A shorter first step (celebration + date) with contact details requested second will reduce perceived effort and increase starts, without reducing completed leads.",
    control: "Current single-step four-field form.",
    variant:
      "Two-step form; persist progress; request name + email only after the event details.",
    metric: "form start → submit rate and qualified quote rate.",
    caveat:
      "Two steps can increase starts but lower completion quality. Judge on qualified enquiries, not raw starts.",
    tag: "proposed" as EvidenceTag,
  },
];

export const trackingEvents = [
  {
    event: "call_click",
    trigger: "Any click on a call control (header, final CTA, sticky bar).",
    conversion: "Yes — once a real tel: number exists.",
    notes: "Send phone_location. In preview it records the placeholder state instead.",
  },
  {
    event: "quote_form_start",
    trigger: "First focus inside the quote form.",
    conversion: "No — micro-conversion.",
    notes: "Use for funnel diagnostics and audience building.",
  },
  {
    event: "quote_submit",
    trigger: "Successful client-side validation and confirmation screen.",
    conversion: "Yes — primary.",
    notes: "Send source, event_type and has_event_date. Server-side confirmation is required before launch.",
  },
  {
    event: "quote_form_error",
    trigger: "Validation failure.",
    conversion: "No.",
    notes: "Send field name only; never send personal data.",
  },
  {
    event: "cta_click",
    trigger: "Any quote CTA or service-specific start.",
    conversion: "No.",
    notes: "Send location and event_type to see which proof sections drive intent.",
  },
  {
    event: "faq_open",
    trigger: "A visitor opens an FAQ item.",
    conversion: "No.",
    notes: "Send the question. Objection content can be promoted if it precedes conversions.",
  },
  {
    event: "section_nav",
    trigger: "Header / footer navigation click.",
    conversion: "No.",
    notes: "Use for page-flow understanding.",
  },
  {
    event: "strategy_room_open",
    trigger: "Internal strategy page opened.",
    conversion: "No.",
    notes: "Internal preview event only; exclude from customer reporting after launch.",
  },
];

export const benchmarkNote = {
  estimate:
    "Planning estimate only: 2–5% quote-form conversion from cold paid traffic and 5–10% from warm / branded organic traffic. Small local pages without proof or a phone may fall below 2%.",
  caution:
    "No client baseline exists and no current industry study was verified for this draft. Treat these numbers as an estimate, not a fact. Replace them with the owner's GA4/Ads baseline after 30 days and cite the exact external benchmark report and date if one is required.",
};
