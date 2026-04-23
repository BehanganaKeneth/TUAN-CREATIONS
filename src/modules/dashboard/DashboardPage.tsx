import { useEffect, useState } from "react";
import { getDashboardMetrics, type DashboardMetric } from "../../services/api";
import { useAuth } from "../../store/auth";

const roleTips = {
  student: "Continue learning, join live classes, and revisit recordings anytime.",
  partner: "Show your services, attract new clients, and manage delivery in one place.",
  client: "Find trusted providers, request services, and follow progress from start to finish.",
  investor: "Track growth, partner activity, and platform performance with clear visibility.",
  admin: "Monitor the platform, review user activity, and keep operations running smoothly.",
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getDashboardMetrics()
      .then((items) => {
        if (!isMounted) return;
        setMetrics(items);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="card">
        <p className="text-sm text-[var(--text-soft)]">Welcome back</p>
        <h2 className="mt-2 font-display text-3xl">{user?.name}</h2>
        <p className="mt-2 text-sm text-[var(--text-soft)]">Your path: {roleTips[user?.role ?? "student"]}</p>
        <p className="mt-3 text-sm text-[var(--text-soft)]">
          This dashboard helps you move smoothly across learning, services, media, collaboration, and innovation opportunities.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          <div className="card sm:col-span-2 xl:col-span-4">Loading dashboard metrics...</div>
        ) : (
          metrics.map((metric) => (
          <article key={metric.label} className="card">
            <p className="text-xs uppercase tracking-wide text-[var(--text-soft)]">{metric.label}</p>
            <p className="mt-3 font-display text-3xl text-[var(--gold)]">{metric.value}</p>
            <p className="mt-2 text-xs text-[var(--text-soft)]">{metric.trend}</p>
          </article>
          ))
        )}
      </div>
    </div>
  );
}
