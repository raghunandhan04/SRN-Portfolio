// Home landing page hero

// Landing hero with name and brief about

export default function Home() {
  return (
    <div className="relative text-center">
      {/* subtle background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-card/60"></div>

      {/* Hero */}
      <div className="py-16 md:py-24">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wide leading-none">
          RAGHUNANDHAN S
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Full‑stack developer and AI/ML enthusiast focused on building useful, elegant products.
        </p>
      </div>

  {/* About section removed from landing; accessible via navbar link only */}
    </div>
  );
}
