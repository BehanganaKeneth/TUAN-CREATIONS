import React from "react";
import { Link } from "react-router-dom";

const TuanNewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 sm:py-16">
      {/* 🔹 Top Section: TUAN Online TV CTA */}
      <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
          TUAN OnlineTV 🎥
        </h1>
        <p className="mx-auto mb-7 max-w-2xl text-base text-gray-600 sm:text-lg">
          Catch our live sessions, news highlights, and inspiring interviews with
          Africa&apos;s innovators and changemakers.
        </p>

        {/* ✅ Prominent Live Button */}
        <Link
          to="/tuan-live"
          className="inline-flex items-center rounded-full bg-yellow-500 px-6 py-3 text-base font-semibold text-black shadow-md transition-all duration-300 hover:bg-yellow-400 sm:px-8 sm:py-4 sm:text-lg"
        >
          🔴 Join Us Live on TUAN OnlineTV
        </Link>
      </div>

      {/* 🔹 Divider */}
      <div className="mx-auto mb-10 max-w-6xl border-t border-gray-200 sm:mb-12"></div>

      {/* 🔹 News & Blog Section */}
      <div className="mx-auto mb-8 max-w-6xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          TUAN News &amp; Blog
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
          Insights, stories, and updates from Africa&apos;s tech, innovation, and leadership frontlines.
        </p>
      </div>

      {/* 🔹 Article Cards */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Article 1 */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src="https://source.unsplash.com/random/400x250?africa,technology"
            alt="Article"
            className="h-40 w-full object-cover sm:h-48"
          />
          <div className="p-5 text-left sm:p-6">
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
              The Rise of African Tech Startups
            </h3>
            <p className="text-sm text-gray-600">
              Exploring how young innovators are transforming the continent’s
              digital future.
            </p>
          </div>
        </div>

        {/* Article 2 */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src="https://source.unsplash.com/random/400x250?africa,innovation"
            alt="Article"
            className="h-40 w-full object-cover sm:h-48"
          />
          <div className="p-5 text-left sm:p-6">
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
              Creative Solutions for African Challenges
            </h3>
            <p className="text-sm text-gray-600">
              From sustainable tech to community-driven startups, see what’s next.
            </p>
          </div>
        </div>

        {/* Article 3 */}
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <img
            src="https://source.unsplash.com/random/400x250?uganda,entrepreneurship"
            alt="Article"
            className="h-40 w-full object-cover sm:h-48"
          />
          <div className="p-5 text-left sm:p-6">
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
              Uganda’s Youth Entrepreneurs Changing the Game
            </h3>
            <p className="text-sm text-gray-600">
              How young minds are redefining leadership and digital transformation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuanNewsPage;
