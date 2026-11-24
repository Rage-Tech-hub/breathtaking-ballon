type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Preview-safe tracking shim. Events are pushed in the same shape we would
 * forward to GA4/GTM after launch. No third-party script is loaded here.
 */
export function track(event: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    ...payload,
    preview: true,
  });

  if (typeof console !== "undefined") {
    console.info(`[track] ${event}`, payload);
  }
}

export function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function formatEventDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
