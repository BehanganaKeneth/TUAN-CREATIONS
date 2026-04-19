import { Link, NavLink, Outlet } from "react-router-dom";

const publicNav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/divisions", label: "Divisions" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)]">
      <div className="hero-glow" aria-hidden />

      <header className="sticky top-0 z-40 backdrop-blur-md bg-[color:rgba(8,17,29,0.78)] border-b border-[var(--line)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="font-display text-xl tracking-wide text-[var(--gold)]">
            TUAN OS
          </Link>

          <nav className="hidden gap-2 md:flex">
            {publicNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-[var(--gold)] text-[var(--ink)]"
                      : "text-[var(--text-soft)] hover:bg-[var(--card)] hover:text-[var(--text)]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link className="btn-primary text-sm" to="/auth">
            Enter Ecosystem
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-[var(--line)] bg-[color:rgba(7,14,24,0.9)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 text-sm text-[var(--text-soft)] sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
          <p>TUAN Digital Operating System - Unified African digital infrastructure.</p>
          <p>Copyright 2026 TUAN Creations (Africa) LTD</p>
        </div>
      </footer>
    </div>
  );
}
