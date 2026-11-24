import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.7} {...base} {...props}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.7} {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.7} {...base} {...props}>
      <path d="M12 4v16" />
      <path d="m6 14 6 6 6-6" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...props}>
      <path d="m4.5 12.5 4.8 4.8L19.5 7" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.8} {...base} {...props}>
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.8} {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.7} {...base} {...props}>
      <path d="M8.4 3.8 6.2 4.6c-1 .4-1.7 1.4-1.5 2.5.9 7.1 5.2 11.4 12.2 12.2 1.1.1 2.1-.6 2.5-1.6l.8-2.2c.3-.8 0-1.7-.8-2.1l-3-1.4c-.8-.4-1.7-.1-2.2.5l-1 1.3a15.4 15.4 0 0 1-5.6-5.6l1.3-1c.6-.5.9-1.4.5-2.2l-1.4-3c-.4-.8-1.3-1.1-2.1-.8Z" />
    </svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M3.5 10.5h17" />
      <path d="M8 14h2M14 14h2M8 17h2M14 17h2" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...props}>
      <path d="M20 10.4c0 5.4-8 11.1-8 11.1s-8-5.7-8-11.1a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.2" r="3" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...props}>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7v5.3l3.6 2.1" />
    </svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.4} {...base} {...props}>
      <path d="M12 2.8c.6 5.4 3.8 8.6 9.2 9.2-5.4.6-8.6 3.8-9.2 9.2-.6-5.4-3.8-8.6-9.2-9.2 5.4-.6 8.6-3.8 9.2-9.2Z" />
      <path d="M19.5 3v3M21 4.5h-3" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" strokeWidth={1.7} {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function BalloonMark({ filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" strokeWidth={1.45} {...base} {...props}>
      <path d="M18.4 6.4c5.3 0 9 4.2 9 9.6 0 6.4-4.1 11.8-8.6 11.8-4.4 0-8.5-5.4-8.5-11.8 0-5.4 3.2-9.6 8.1-9.6Z" fill={filled ? "currentColor" : "none"} />
      <path d="m12 29.2 1.5 3.5h1.6l1.5-3.5" />
      <path d="M15.1 32.7c.1 4.6-1.8 6.1-1.8 9.3" />
      <path d="M32.2 11.7c4 0 6.9 3.2 6.9 7.4 0 5-3.1 9.1-6.6 9.1-3.4 0-6.5-4.1-6.5-9.1 0-4.2 2.5-7.4 6.2-7.4Z" />
      <path d="m27.4 29.3 1.1 2.7h1.3l1.1-2.7" />
      <path d="M29.8 32c.1 3.6-1.4 4.9-1.4 7.5" />
      <path d="M7.2 37.7c9.7 1.9 24.3 1.5 33.7-.2" strokeWidth={1.1} strokeDasharray="1 4" />
    </svg>
  );
}

export function ArchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" strokeWidth={1.2} {...base} {...props}>
      <path d="M8 33V20a12 12 0 0 1 24 0v13" />
      <circle cx="20" cy="8" r="3.2" />
      <circle cx="10" cy="17" r="3.2" />
      <circle cx="30" cy="17" r="3.2" />
      <circle cx="7" cy="27" r="2.6" />
      <circle cx="33" cy="27" r="2.6" />
      <path d="M20 11.2v4.5" />
    </svg>
  );
}

export function GarlandIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" strokeWidth={1.2} {...base} {...props}>
      <path d="M5 10.5c5.8 15.8 24.4 15.8 30 0" />
      <circle cx="8" cy="13" r="3.1" />
      <circle cx="15" cy="19" r="3.6" />
      <circle cx="24" cy="20" r="3.1" />
      <circle cx="31" cy="14" r="3.6" />
      <path d="M18 23.2v8.6M22 23.4v8.4" />
    </svg>
  );
}

export function CeilingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" strokeWidth={1.2} {...base} {...props}>
      <path d="M4 7h32" />
      <path d="M13 7v8M27 7v11M20 7v6" />
      <circle cx="13" cy="18.5" r="3.5" />
      <circle cx="20" cy="16.5" r="3" />
      <circle cx="27" cy="21.5" r="3.5" />
      <path d="M13 22v8M27 25v6M20 19.5v8" />
    </svg>
  );
}

export function NumbersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 40" strokeWidth={1.2} {...base} {...props}>
      <path d="M11 10h7v20h-7" />
      <path d="M29 10h-7v20h7" />
      <circle cx="20" cy="7" r="2.2" />
      <circle cx="9" cy="34" r="2.2" />
      <circle cx="31" cy="34" r="2.2" />
    </svg>
  );
}
