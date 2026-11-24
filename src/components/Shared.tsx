import { useEffect, useRef } from "react";
import { ArrowRight, BalloonMark, Close, Phone } from "./Icons";
import { cn } from "../utils/cn";

export function BrandLockup({
  dark = false,
  compact = false,
  onClick,
  className,
}: {
  dark?: boolean;
  compact?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("group flex items-center gap-2.5 text-left", className)}
      aria-label="Breathtaking Balloon Co. home (typographic logo placeholder)"
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:-rotate-6",
          compact ? "h-9 w-9" : "h-11 w-11",
          dark ? "border-ivory/35 text-butter" : "border-ink/20 text-plum"
        )}
      >
        <BalloonMark filled className={compact ? "h-6 w-6" : "h-7 w-7"} />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display leading-none tracking-[-0.02em]",
            compact ? "text-[1.15rem]" : "text-[1.35rem]",
            dark ? "text-ivory" : "text-ink"
          )}
        >
          Breathtaking
        </span>
        <span
          className={cn(
            "mt-1 text-[0.52rem] font-bold uppercase leading-none tracking-[0.37em]",
            dark ? "text-ivory/65" : "text-muted"
          )}
        >
          Balloon Co.
        </span>
      </span>
    </button>
  );
}

export function PreviewRibbon({
  mode,
  onNavigate,
}: {
  mode: "landing" | "strategy";
  onNavigate: () => void;
}) {
  return (
    <div className="no-print bg-ink px-4 py-2 text-ivory">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-2 text-[0.66rem] leading-snug tracking-wide">
          <span
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-butter"
            aria-hidden="true"
          />
          <span className="truncate">
            <strong className="font-bold">Design preview.</strong>
            <span className="hidden sm:inline">
              {" "}
              Unverified facts are marked. Imagery is concept-only.
            </span>
            <span className="sm:hidden"> Not for public launch.</span>
          </span>
        </p>
        <button
          type="button"
          onClick={onNavigate}
          className="inline-flex shrink-0 items-center gap-1.5 border-b border-ivory/40 pb-0.5 text-[0.63rem] font-bold uppercase tracking-[0.12em] text-ivory transition-colors hover:border-butter hover:text-butter"
        >
          {mode === "landing" ? "Strategy room" : "View landing page"}
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function PhonePendingDialog({
  open,
  onClose,
  onQuote,
}: {
  open: boolean;
  onClose: () => void;
  onQuote: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActive?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/65 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-dialog-title"
        className="relative w-full max-w-md overflow-hidden rounded-t-2xl bg-paper p-6 shadow-2xl sm:rounded-lg sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-shell hover:text-ink"
          aria-label="Close dialog"
        >
          <Close className="h-5 w-5" />
        </button>
        <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-blush text-plum">
          <Phone className="h-5 w-5" />
        </span>
        <p className="eyebrow mb-2 text-peony">Calling is not live</p>
        <h2 id="phone-dialog-title" className="font-display text-3xl leading-tight text-ink">
          We won&apos;t invent a phone number.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          No business line was supplied or verified for this preview, so click-to-call is
          intentionally inactive. Send an enquiry instead and we&apos;ll have a reason to reply.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              onClose();
              onQuote();
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-wine px-5 py-3 text-sm font-bold text-ivory transition-colors hover:bg-plum"
          >
            Request a colour plan
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-sm border border-ink/20 px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-shell"
          >
            Keep looking
          </button>
        </div>
        <p className="mt-4 text-[0.66rem] uppercase tracking-[0.12em] text-muted">
          Launch task · add the verified business number
        </p>
      </div>
    </div>
  );
}
