import { Link } from "react-router-dom";

const discovery = [
  { title: "Explore Our Vision", to: "/about", description: "Understand what TUAN is building and how it creates value for communities and businesses." },
  { title: "Explore Divisions", to: "/divisions", description: "See the full range of services from software and telecom to TUAN Live, TUAN Academy, and TUAN Innovations Hub." },
  { title: "TUAN Academy", to: "/academy", description: "Join live classes, learn from trusted instructors, and replay lessons anytime." },
  { title: "TUAN Live", to: "/media", description: "Follow live programs, partner channels, and recorded shows in one place." },
  { title: "TUAN Marketplace", to: "/marketplace", description: "Choose verified ICT companies and freelancers for your next project." },
  { title: "Join as Student, Client, Partner, or Investor", to: "/auth", description: "Create your account and access services tailored to your role." },
];

export default function HomePage() {
  return (
    <div>
      <section className="sunbird-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
          <div>
            <p className="eyebrow">TUAN Digital Platform</p>
            <h1 className="mt-5 max-w-3xl font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Trusted all-in-one digital platform for skills, services, and innovation.
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg">
              TUAN Digital is a product of TUAN Creations Company Ltd, built to help clients, students, investors, and partners access trusted services, learning, media, and innovation in one platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-primary" to="/auth">Create Your Account</Link>
              <Link className="btn-ghost" to="/blog">Read Ecosystem Stories</Link>
            </div>
          </div>
          <div className="sunbird-wave" aria-hidden />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 pb-20 pt-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {discovery.map((item) => (
          <Link key={item.title} to={item.to} className="card card-hover">
            <h3 className="font-display text-xl">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--text-soft)]">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="card">
          <p className="eyebrow">Core Components</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <h3 className="font-display text-xl">Software & ICT Services</h3>
              <p className="mt-2 text-sm text-[var(--text-soft)]">Practical digital services for businesses, institutions, and organizations ready to scale.</p>
            </div>
            <div>
              <h3 className="font-display text-xl">TUAN Academy</h3>
              <p className="mt-2 text-sm text-[var(--text-soft)]">Trusted learning paths for students and professionals, with live sessions and replays.</p>
            </div>
            <div>
              <h3 className="font-display text-xl">TUAN Marketplace</h3>
              <p className="mt-2 text-sm text-[var(--text-soft)]">A verified space where clients can find reliable freelancers, firms, and digital solutions.</p>
            </div>
            <div>
              <h3 className="font-display text-xl">TUAN Collaborations Hub</h3>
              <p className="mt-2 text-sm text-[var(--text-soft)]">Simple teamwork tools for project updates, communication, and shared delivery.</p>
            </div>
            <div>
              <h3 className="font-display text-xl">TUAN Live</h3>
              <p className="mt-2 text-sm text-[var(--text-soft)]">Media that educates, promotes partner work, and keeps communities informed.</p>
            </div>
            <div>
              <h3 className="font-display text-xl">TUAN Innovations Hub</h3>
              <p className="mt-2 text-sm text-[var(--text-soft)]">Hands-on innovation tracks in IoT, robotics, and chip design for future-ready builders.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
