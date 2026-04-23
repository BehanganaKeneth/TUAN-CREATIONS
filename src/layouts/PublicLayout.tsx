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
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-center text-[var(--gold)] sm:gap-3 lg:text-left">
            <span className="logo-container logo-container-sm">
              <img src="/tuan-logo.png" alt="TUAN Creations Company Ltd Logo" />
            </span>
            <span className="font-display text-base tracking-wide sm:text-lg lg:text-xl">TUAN Creations Company Ltd</span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-2 md:justify-end">
            {publicNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-xs transition sm:px-4 sm:text-sm ${
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

          <Link className="btn-primary text-xs sm:text-sm" to="/dashboard">
            <span className="block text-center">Explore TUAN Digital Platform</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-[var(--line)] bg-[color:rgba(7,14,24,0.9)]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 text-center text-sm text-[var(--text-soft)] sm:px-6 lg:grid-cols-3 lg:px-8 lg:text-left">
          <div>
            <p>TUAN Digital Platform - a product by TUAN Creations Company Ltd.</p>
            <p className="mt-1 text-xs">[The United African Nation - "All-in-One Digital Space"]</p>
          </div>
          <div className="space-y-1">
            <p>tuancreations.africa@gmail.com</p>
            <p>+256 753 414 058</p>
            <p>Kampala, Uganda</p>
          </div>
          <p className="lg:text-right">Copyright 2026 TUAN Creations Company Ltd</p>
        </div>
      </footer>
    </div>
  );
}
