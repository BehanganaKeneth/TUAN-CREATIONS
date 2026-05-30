import React from "react";
import { ShoppingBag, Code2, Briefcase, Globe, Search } from "lucide-react";

const TUANMarketPlacePage: React.FC = () => {
  const companies = [
    {
      name: "TUAN Creations Company Ltd",
      description:
        "Creators of Africa-inspired digital solutions - software, telecom, media and creative technology.",
      category: "Software, Telecom & Media",
      image: "/tuan-logo.png",
    },
    {
      name: "NexTech Uganda",
      description:
        "Leading provider of enterprise AI, cloud, and IoT solutions for modern businesses.",
      category: "AI & Cloud",
      image: "https://via.placeholder.com/80",
    },
    {
      name: "AfriCode Systems",
      description:
        "Building scalable web platforms and custom mobile apps for African startups.",
      category: "Web & Mobile",
      image: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <section className="bg-yellow-600 py-16 text-center text-white sm:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
            TUAN <span className="text-black">MarketPlace</span>
          </h1>
          <p className="text-base font-light sm:text-lg">
            The virtual hub where African Tech Companies and Innovators meet,
            sell, and collaborate.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="mx-auto mb-12 -mt-8 max-w-3xl px-4 sm:px-6">
        <div className="flex items-center rounded-full bg-white p-2 shadow-lg sm:p-3">
          <Search className="text-gray-400 ml-3" size={20} />
          <input
            type="text"
            placeholder="Search companies, software, or innovations..."
            className="flex-1 bg-transparent px-3 text-sm text-gray-700 focus:outline-none sm:text-base"
          />
          <button className="rounded-full bg-yellow-600 px-4 py-2 text-sm text-white transition hover:bg-yellow-500 sm:px-6">
            Search
          </button>
        </div>
      </div>

      {/* Marketplace Grid */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:pb-20">
        {companies.map((company, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="flex items-center justify-center bg-gray-50 p-5 sm:p-6">
              <span className="logo-container h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                <img src={company.image} alt={company.name} />
              </span>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                {company.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {company.description}
              </p>
              <span className="inline-block text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full px-3 py-1">
                {company.category}
              </span>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button className="flex items-center justify-center gap-2 rounded-full bg-yellow-600 px-4 py-2 text-sm text-white transition hover:bg-yellow-500">
                  <ShoppingBag size={16} /> Visit Store
                </button>
                <button className="flex items-center justify-center gap-2 rounded-full border border-yellow-500 px-4 py-2 text-sm text-yellow-600 transition hover:bg-yellow-50">
                  <Briefcase size={16} /> Hire Company
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Info Section */}
      <section className="bg-black py-14 text-center text-yellow-400 sm:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="mb-4 text-xl font-bold sm:text-2xl">
            Powered by African Innovation 🌍
          </h2>
          <p className="text-sm text-yellow-200 sm:text-base">
            TUAN MarketPlace is a home for African Techpreneurs — connecting
            digital creators with enterprises and global opportunities.
          </p>
          <div className="flex justify-center gap-6 mt-6 text-yellow-300">
            <Code2 />
            <Briefcase />
            <Globe />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TUANMarketPlacePage;
