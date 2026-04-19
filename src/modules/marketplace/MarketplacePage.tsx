import { listings } from "../../services/mockApi";

export default function MarketplacePage() {
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="font-display text-3xl">TUAN Marketplace</h2>
        <p className="mt-2 text-sm text-[var(--text-soft)]">
          Explore verified providers, compare offerings, and move from order to review with trust signals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {listings.map((item) => (
          <article key={item.id} className="card card-hover">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-[var(--line)] px-2 py-1 text-xs text-[var(--text-soft)]">{item.type}</span>
              <span className={`text-xs ${item.verified ? "text-emerald-300" : "text-amber-300"}`}>
                {item.verified ? "Verified Provider" : "Pending Verification"}
              </span>
            </div>
            <h3 className="mt-3 font-display text-xl">{item.name}</h3>
            <p className="mt-2 text-sm text-[var(--text-soft)]">{item.provider}</p>
            <p className="mt-4 text-lg text-[var(--gold)]">{item.price}</p>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary text-xs">Order</button>
              <button className="btn-ghost text-xs">Track</button>
              <button className="btn-ghost text-xs">Review</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
