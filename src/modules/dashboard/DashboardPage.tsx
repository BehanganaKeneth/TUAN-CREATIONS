import { dashboardMetrics } from "../../services/mockApi";
import { useAuth } from "../../store/auth";

const roleTips = {
  student: "Continue learning, join live sessions, and build projects.",
  partner: "Publish courses, create listings, and stream media content.",
  client: "Browse verified providers and track project delivery.",
  investor: "Monitor growth metrics, partner quality, and module activity.",
};

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="card">
        <p className="text-sm text-[var(--text-soft)]">Welcome back</p>
        <h2 className="mt-2 font-display text-3xl">{user?.name}</h2>
        <p className="mt-2 text-sm text-[var(--text-soft)]">Role path: {roleTips[user?.role ?? "student"]}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <article key={metric.label} className="card">
            <p className="text-xs uppercase tracking-wide text-[var(--text-soft)]">{metric.label}</p>
            <p className="mt-3 font-display text-3xl text-[var(--gold)]">{metric.value}</p>
            <p className="mt-2 text-xs text-[var(--text-soft)]">{metric.trend}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
