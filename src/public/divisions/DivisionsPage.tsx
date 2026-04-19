import { Link } from "react-router-dom";
import { Brain, Tv, Wifi, Rocket, Shield, GraduationCap } from "lucide-react";

const divisions = [
  {
    icon: Brain,
    name: "Software, AI & Robotics Lab",
    description: "Build apps, SaaS tools, AI models, robotics, and embedded systems.",
    color: "from-blue-500 to-blue-600",
    services: ["Custom Software Development", "AI/ML Solutions", "Robotics Engineering", "Mobile Applications", "Web Platforms"],
    to: "/dashboard",
  },
  {
    icon: Tv,
    name: "Media Studio & TUAN TV",
    description: "Produce films, animations, digital campaigns, and run TUAN's broadcast arm.",
    color: "from-purple-500 to-purple-600",
    services: ["Film Production", "Animation Studio", "Digital Marketing", "Broadcasting", "Content Creation"],
    to: "/media",
  },
  {
    icon: Wifi,
    name: "Telecom & IoT Division",
    description: "Create infrastructure for rural and urban access, IoT kits, and digital connectivity.",
    color: "from-green-500 to-green-600",
    services: ["Network Infrastructure", "IoT Solutions", "Rural Connectivity", "Smart City Tech", "Telecommunications"],
    to: "/iot",
  },
  {
    icon: Rocket,
    name: "Aerospace & Embedded Systems",
    description: "Develop satellites, UAVs, telemetry systems, and space technology pilots.",
    color: "from-red-500 to-red-600",
    services: ["Satellite Technology", "UAV Development", "Space Systems", "Telemetry", "Aerospace Engineering"],
    to: "/dashboard",
  },
  {
    icon: Shield,
    name: "Cloud & Cybersecurity Unit",
    description: "Offer secure cloud, blockchain tools, hosting, and analytics platforms.",
    color: "from-indigo-500 to-indigo-600",
    services: ["Cloud Infrastructure", "Cybersecurity", "Blockchain Solutions", "Data Analytics", "Secure Hosting"],
    to: "/dashboard",
  },
  {
    icon: GraduationCap,
    name: "Digital Academy & Incubator",
    description: "Train developers and creatives; incubate startups built on TUAN standards.",
    color: "from-yellow-500 to-yellow-600",
    services: ["Skills Training", "Startup Incubation", "Certification Programs", "Mentorship", "Innovation Labs"],
    to: "/academy",
  },
];

export default function DivisionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="eyebrow">Divisions</p>
      <h1 className="mt-4 font-display text-5xl">Our innovation divisions work together under one trusted platform.</h1>
      <p className="mt-6 max-w-3xl text-[var(--text-soft)]">
        TUAN Digital combines learning, services, media, innovation, and collaboration so visitors can move from discovery to action in one place.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {divisions.map((division) => {
          const Icon = division.icon;
          return (
            <Link key={division.name} to={division.to} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)] shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className={`bg-gradient-to-r ${division.color} p-6`}>
                <div className="flex items-center space-x-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/25">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{division.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-6 text-[var(--text-soft)]">{division.description}</p>
                <div>
                  <h4 className="mb-3 text-lg font-semibold text-[var(--text)]">Key Services</h4>
                  <div className="space-y-2">
                    {division.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-center space-x-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-[var(--gold)]"></div>
                        <span className="text-[var(--text-soft)]">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <section className="mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--text)] mb-6">How our divisions work together</h2>
          <p className="mx-auto max-w-3xl text-[var(--text-soft)]">
            TUAN keeps delivery coordinated so users get one clear experience, while partners still have room to contribute their expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500">
              <span className="text-xl font-bold text-white">🌳</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[var(--text)]">We build the trunk. Partners form the branches.</h3>
            <p className="text-[var(--text-soft)]">TUAN departments lead each area while partners extend the reach and strength of the platform.</p>
          </div>
          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
              <span className="text-xl font-bold text-white">🧑‍💼</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[var(--text)]">We lead. Partners deliver with us.</h3>
            <p className="text-[var(--text-soft)]">TUAN guides the experience while trusted partners deliver services, learning, and media content.</p>
          </div>
          <div className="card text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-500">
              <span className="text-xl font-bold text-white">⟳</span>
            </div>
            <h3 className="mb-3 text-xl font-semibold text-[var(--text)]">We coordinate, not compete.</h3>
            <p className="text-[var(--text-soft)]">Everything stays unified so visitors see one strong TUAN brand and one smooth journey.</p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="rounded-2xl bg-[var(--card)] p-8 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-bold text-[var(--text)]">Example: Digital Inclusion Initiative</h2>
          <p className="mx-auto mb-8 max-w-3xl text-center text-[var(--text-soft)]">
            When a ministry or organisation hires TUAN for a digital inclusion project, the divisions below work together to deliver a complete experience.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="card">
              <Brain className="mb-3 h-8 w-8 text-teal-400" />
              <h4 className="mb-2 font-semibold text-[var(--text)]">Software Division</h4>
              <p className="text-sm text-[var(--text-soft)]">Builds the platform and digital tools with partner engineers.</p>
            </div>
            <div className="card">
              <GraduationCap className="mb-3 h-8 w-8 text-orange-400" />
              <h4 className="mb-2 font-semibold text-[var(--text)]">Academy</h4>
              <p className="text-sm text-[var(--text-soft)]">Creates learning content and training support with regional partners.</p>
            </div>
            <div className="card">
              <Tv className="mb-3 h-8 w-8 text-purple-400" />
              <h4 className="mb-2 font-semibold text-[var(--text)]">Media Studio</h4>
              <p className="text-sm text-[var(--text-soft)]">Produces stories, campaigns, and broadcasts that explain the program.</p>
            </div>
            <div className="card">
              <Wifi className="mb-3 h-8 w-8 text-indigo-300" />
              <h4 className="mb-2 font-semibold text-[var(--text)]">Telecom Division</h4>
              <p className="text-sm text-[var(--text-soft)]">Supports connectivity and infrastructure delivery with licensed partners.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
