import React from "react";

const TuanLiveProgramsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-yellow-400 sm:text-4xl md:text-5xl">
          TUAN OnlineTV – Live Programs
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-300 sm:text-lg">
          Experience real-time African innovation, culture, and technology stories from TUAN OnlineTV.
        </p>
      </div>

      {/* Live Video Section */}
      <div className="mt-10 flex flex-col items-center justify-center space-y-8 sm:mt-12">
        <div className="w-full max-w-4xl aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
          {/* You can embed a real livestream here */}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
            title="TUAN OnlineTV Live Stream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Schedule / Upcoming Programs */}
        <div className="w-full max-w-4xl text-left">
          <h2 className="mb-4 text-xl font-semibold text-yellow-400 sm:text-2xl">
            📺 Upcoming Programs
          </h2>
          <ul className="space-y-4">
            <li className="p-4 bg-gray-900 rounded-xl">
              <h3 className="text-base font-bold sm:text-lg">Africa’s Tech Revolution</h3>
              <p className="text-gray-400 text-sm">Today • 6:00 PM EAT</p>
            </li>
            <li className="p-4 bg-gray-900 rounded-xl">
              <h3 className="text-base font-bold sm:text-lg">Women in Innovation</h3>
              <p className="text-gray-400 text-sm">Tomorrow • 4:00 PM EAT</p>
            </li>
            <li className="p-4 bg-gray-900 rounded-xl">
              <h3 className="text-base font-bold sm:text-lg">Youth Building Africa</h3>
              <p className="text-gray-400 text-sm">Friday • 7:30 PM EAT</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TuanLiveProgramsPage;
