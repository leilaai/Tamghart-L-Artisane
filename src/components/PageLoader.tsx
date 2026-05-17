export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-cream px-4 py-20 text-center">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 animate-ping rounded-full bg-clay/40" />
        <div className="absolute inset-2 rounded-full border-2 border-earth border-t-transparent animate-spin" />
      </div>
      <p className="text-xs tracking-brand text-earth/70">CHARGEMENT…</p>
    </div>
  );
}
