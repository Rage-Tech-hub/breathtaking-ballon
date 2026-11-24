import { useEffect, useRef, useState } from "react";
import { formatEventDate, track } from "../lib/analytics";
import { ArrowRight, Check, Sparkle } from "./Icons";

type FormFields = {
  name: string;
  email: string;
  date: string;
  celebration: string;
};

type FieldErrors = Partial<Record<keyof FormFields, string>>;

const CELEBRATIONS = [
  "Wedding",
  "Bridal or baby shower",
  "Birthday or milestone",
  "Corporate or brand event",
  "Something else",
];

function todayValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  return new Date(today.getTime() - offset * 60_000).toISOString().split("T")[0];
}

export function QuoteForm({
  initialCelebration = "",
  source = "final_cta",
}: {
  initialCelebration?: string;
  source?: string;
}) {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    date: "",
    celebration: initialCelebration,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const started = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (initialCelebration) {
      setFields((current) => ({ ...current, celebration: initialCelebration }));
    }
  }, [initialCelebration]);

  function noteStart() {
    if (started.current) return;
    started.current = true;
    track("quote_form_start", { source });
  }

  function update<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (fields.name.trim().length < 2) next.name = "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
      next.email = "Add an email we can reply to.";
    }
    if (!fields.date) {
      next.date = "Choose your event date.";
    } else if (fields.date < todayValue()) {
      next.date = "Please choose today or a future date.";
    }
    if (!fields.celebration) next.celebration = "Pick the closest option.";
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      const field = formRef.current?.querySelector<HTMLInputElement | HTMLSelectElement>(
        `[name="${first}"]`
      );
      field?.focus();
      track("quote_form_error", { source, field: first });
      return;
    }

    track("quote_submit", {
      source,
      celebration: fields.celebration,
      has_event_date: Boolean(fields.date),
    });
    setSubmitted(true);
  }

  function reset() {
    setFields({ name: "", email: "", date: "", celebration: "" });
    setErrors({});
    setSubmitted(false);
    started.current = false;
  }

  if (submitted) {
    return (
      <div
        className="rounded-lg border border-line bg-paper p-7 shadow-[0_18px_45px_rgba(43,25,37,0.12)] sm:p-8"
        role="status"
        aria-live="polite"
      >
        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
          <Check className="h-6 w-6" />
        </span>
        <p className="eyebrow mb-2 text-wine">Enquiry captured</p>
        <h3 className="font-display text-3xl leading-tight text-ink">
          Thanks, {fields.name.trim().split(" ")[0]}. That&apos;s the easy part.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          On the live page, this would go straight to the studio inbox with a confirmation
          email. <strong className="font-bold text-ink">This is a design preview, so nothing
          has been sent or stored.</strong>
        </p>
        <div className="mt-5 rounded-sm bg-shell/70 p-4 text-[0.78rem] leading-relaxed text-ink">
          <p className="font-bold uppercase tracking-[0.13em]">Preview summary</p>
          <p className="mt-1.5">
            {fields.celebration} · {formatEventDate(fields.date)} · {fields.email}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-sm bg-wine px-5 py-3 text-sm font-bold text-ivory transition-colors hover:bg-plum"
          >
            Start another
            <Sparkle className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center border-b border-ink/30 py-1 text-sm font-bold text-ink transition-colors hover:border-ink"
          >
            Back to the page
          </button>
        </div>
        <p className="mt-6 text-[0.67rem] leading-relaxed text-muted">
          Launch task: connect this form to the owner&apos;s verified inbox, add a consent
          line, and send a real confirmation message.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onFocus={noteStart}
      noValidate
      className="rounded-lg border border-line bg-paper p-6 shadow-[0_18px_45px_rgba(43,25,37,0.14)] sm:p-8"
      aria-label="Request a colour plan"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow mb-1.5 text-wine">Four quick fields</p>
          <h3 className="font-display text-[1.8rem] leading-tight text-ink">
            Tell us about your event.
          </h3>
        </div>
        <span className="mt-1 hidden shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[0.57rem] font-bold uppercase tracking-[0.1em] text-muted sm:inline-flex">
          No pressure
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="quote-name" className="mb-1.5 block text-[0.72rem] font-bold text-ink">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Sam Taylor"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            className="field"
          />
          {errors.name && (
            <p id="quote-name-error" className="mt-1 text-[0.7rem] font-semibold text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="quote-email" className="mb-1.5 block text-[0.72rem] font-bold text-ink">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="sam@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            className="field"
          />
          {errors.email && (
            <p id="quote-email-error" className="mt-1 text-[0.7rem] font-semibold text-danger">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-date" className="mb-1.5 block text-[0.72rem] font-bold text-ink">
            Event date <span aria-hidden="true">*</span>
          </label>
          <input
            id="quote-date"
            name="date"
            type="date"
            required
            min={todayValue()}
            value={fields.date}
            onChange={(event) => update("date", event.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "quote-date-error" : undefined}
            className="field"
          />
          {errors.date && (
            <p id="quote-date-error" className="mt-1 text-[0.7rem] font-semibold text-danger">
              {errors.date}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="quote-celebration"
            className="mb-1.5 block text-[0.72rem] font-bold text-ink"
          >
            What are we celebrating? <span aria-hidden="true">*</span>
          </label>
          <select
            id="quote-celebration"
            name="celebration"
            required
            value={fields.celebration}
            onChange={(event) => update("celebration", event.target.value)}
            aria-invalid={Boolean(errors.celebration)}
            aria-describedby={errors.celebration ? "quote-celebration-error" : undefined}
            className="field min-h-[46px]"
          >
            <option value="">Choose one</option>
            {CELEBRATIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.celebration && (
            <p
              id="quote-celebration-error"
              className="mt-1 text-[0.7rem] font-semibold text-danger"
            >
              {errors.celebration}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-wine px-6 py-3.5 text-sm font-bold text-ivory transition-colors hover:bg-plum"
      >
        Request my colour plan
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-3 text-center text-[0.66rem] leading-relaxed text-muted">
        By sending this, you agree to be contacted about your event. No spam, no sharing.
        <br />
        <span className="font-semibold">Design preview: this form does not send or store data.</span>
      </p>
    </form>
  );
}
