import { Link } from "react-router-dom";

const discovery = [
  { title: "Explore Vision", to: "/about", description: "Understand why TUAN exists and what it is building." },
  { title: "Explore System", to: "/divisions", description: "View all modules and how they integrate under one identity layer." },
  { title: "Start Learning", to: "/academy", description: "Browse courses and join live academy experiences." },
  { title: "Watch TUAN TV", to: "/media", description: "Access live programs and recorded channels." },
  { title: "Hire Services", to: "/marketplace", description: "Find verified providers for products and delivery." },
  { title: "Join Ecosystem", to: "/auth", description: "Create a role-based identity and unlock your dashboard." },
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <p className="eyebrow">Africa's Digital Operating System</p>
        <h1 className="mt-5 max-w-4xl font-display text-5xl leading-tight sm:text-6xl">
          One connected platform for learning, commerce, media, collaboration, and innovation.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-[var(--text-soft)]">
          TUAN OS is not a collection of tools. It is a unified identity-driven ecosystem where every action compounds value across the continent.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/auth">Enter Protected Ecosystem</Link>
          <Link className="btn-ghost" to="/blog">Read Ecosystem Stories</Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {discovery.map((item) => (
          <Link key={item.title} to={item.to} className="card card-hover">
            <h3 className="font-display text-xl">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-soft)]">{item.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
