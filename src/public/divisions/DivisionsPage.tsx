import { Link } from "react-router-dom";

const divisions = [
  { name: "Academy", summary: "Courses, enrollments, live classes, recordings.", to: "/academy" },
  { name: "Marketplace", summary: "Listings, verified providers, orders, reviews.", to: "/marketplace" },
  { name: "Media (TUAN TV)", summary: "Live broadcasts, channels, recordings.", to: "/media" },
  { name: "Collaboration", summary: "Projects, teams, chat, delivery workflows.", to: "/collaboration" },
  { name: "IoT & Innovation", summary: "Programs, kits, resources, experimentation.", to: "/iot" },
  { name: "Dashboard", summary: "Role-aware command center for each identity.", to: "/dashboard" },
];

export default function DivisionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="eyebrow">Divisions</p>
      <h1 className="mt-4 font-display text-5xl">Modular services working as one integrated system.</h1>
      <p className="mt-6 max-w-3xl text-[var(--text-soft)]">
        Select any division to enter that module. Authentication is required for protected modules and role actions.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {divisions.map((item) => (
          <Link key={item.name} to={item.to} className="card card-hover">
            <h2 className="font-display text-2xl">{item.name}</h2>
            <p className="mt-3 text-sm text-[var(--text-soft)]">{item.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
