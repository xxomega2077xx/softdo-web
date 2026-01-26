

const LOGOS = [
  'Microsoft', 'Apple', 'Google', 'Spotify', 'Amazon', 
  'Netflix', 'Adobe', 'Slack', 'Linear', 'Raycast'
];

export const Ticker = () => {
  return (
    <section className="relative w-full overflow-hidden border-y border-[var(--border)] bg-[var(--bg-secondary)]/[0.5] py-10">
      
      {/* Fade Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />

      <div className="flex animate-marquee gap-16 whitespace-nowrap hover:[animation-play-state:paused]">
        {/* Double the logos for seamless loop */}
        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
          <div key={idx} className="flex items-center gap-2 group cursor-default">
            {/* Placeholder logo icon */}
            <div className="h-6 w-6 rounded-sm bg-[var(--text-muted)]/[0.2] transition-colors group-hover:bg-[var(--accent)]" />
            <span className="text-xl font-medium text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-primary)]">
              {logo}
            </span>
          </div>
        ))}
      </div>
      
    </section>
  );
};
