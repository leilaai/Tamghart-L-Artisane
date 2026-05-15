type Props = { className?: string; color?: string };

/** Ornement amazigh stylisé — losanges & chevrons, pour combler l'espace vertical. */
export function AmazighOrnament({ className = "", color = "currentColor" }: Props) {
  return (
    <svg viewBox="0 0 120 24" className={className} aria-hidden fill="none" stroke={color} strokeWidth="1.2">
      <path d="M2 12 H22" strokeOpacity=".5" />
      <path d="M30 4 L42 12 L30 20 L18 12 Z" />
      <path d="M48 6 L60 18 M60 6 L48 18" />
      <path d="M66 12 L78 4 L90 12 L78 20 Z" />
      <path d="M98 12 H118" strokeOpacity=".5" />
      <circle cx="60" cy="12" r="2" fill={color} stroke="none" />
    </svg>
  );
}
