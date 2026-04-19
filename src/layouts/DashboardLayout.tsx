import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";

const moduleNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/academy", label: "Academy" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/media", label: "Media" },
  { to: "/collaboration", label: "Collaboration" },
  { to: "/iot", label: "IoT & Innovation" },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
        <aside className="h-fit rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5">
          <Link to="/dashboard" className="font-display text-lg text-[var(--gold)]">
            TUAN Digital
          </Link>
          <p className="mt-2 text-sm text-[var(--text-soft)]">{user?.name} ({user?.role})</p>

          <nav className="mt-6 flex flex-col gap-2">
            {moduleNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-[var(--gold)] text-[var(--ink)]"
                      : "text-[var(--text-soft)] hover:bg-[color:rgba(220,173,75,0.14)] hover:text-[var(--text)]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button className="mt-6 w-full rounded-xl border border-[var(--line)] px-3 py-2 text-sm text-[var(--text-soft)] hover:bg-[var(--panel)]" onClick={logout}>
            Sign out
          </button>
        </aside>

        <section className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-[var(--line)] pb-4">
            <h1 className="font-display text-2xl">{moduleNav.find((i) => i.to === location.pathname)?.label ?? "Module"}</h1>
            <Link className="text-sm text-[var(--gold)] hover:underline" to="/">
              Public Site
            </Link>
          </div>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
