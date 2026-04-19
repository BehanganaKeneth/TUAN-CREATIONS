export default function AboutPage() {
  const pillars = [
    {
      title: "Identity",
      text: "Every experience in TUAN OS is connected to who you are and what role you play in the ecosystem.",
    },
    {
      title: "Trust",
      text: "Verification, accountability, and transparent interactions power sustainable digital growth.",
    },
    {
      title: "Shared Systems",
      text: "Courses, marketplace, media, and collaboration are interlinked so one action creates multi-layer value.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="eyebrow">About TUAN</p>
      <h1 className="mt-4 max-w-3xl font-display text-5xl">Building the United African Nation in Technology.</h1>
      <p className="mt-6 max-w-4xl text-[var(--text-soft)]">
        TUAN is a connected digital infrastructure designed for African realities: fragmented systems, underutilized talent, and the need for trusted ecosystem-led execution.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="card">
            <h2 className="font-display text-2xl text-[var(--gold)]">{pillar.title}</h2>
            <p className="mt-3 text-sm text-[var(--text-soft)]">{pillar.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
