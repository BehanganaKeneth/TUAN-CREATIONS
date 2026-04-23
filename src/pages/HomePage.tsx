import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Globe, BookOpen } from 'lucide-react';

const HomePage = memo(() => {
  const navigate = useNavigate();

  const handleExploreVision = useCallback(() => {
    navigate('/about');
  }, [navigate]);

  const handleJoinMovement = useCallback(() => {
    navigate('/enrollment');
  }, [navigate]);

  const handleGetStarted = useCallback(() => {
    navigate('/enrollment');
  }, [navigate]);

  const handleExploreLearning = useCallback(() => {
    navigate('/learning');
  }, [navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-amber-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="logo-container mx-auto mb-5 h-16 w-[min(100%,12rem)] sm:h-20 sm:w-[14rem]">
            <img
              src="/tuan-logo.png"
              alt="TUAN Creations Company LTD Logo"
            />
          </span>
          <h1 className="mx-auto mb-5 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Building <span className="text-teal-300">The United African Nation</span>
          </h1>
          <p className="mx-auto mb-7 max-w-3xl text-base text-gray-300 sm:text-lg lg:text-xl">
            TUAN Creations Company Ltd is envisioned as a Pan-African ICT innovation enterprise designed to unify and transform the continent's fragmented digital economy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleExploreVision}
              className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors flex items-center justify-center"
            >
              Explore Our Vision <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button 
              onClick={handleJoinMovement}
              className="border border-indigo-300 text-indigo-100 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
            >
              Join the Movement
            </button>
          </div>
        </div>
      </section>

      {/* Key Pillars Section */}
      <section className="py-16 bg-gray-50 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Our Three Pillars</h2>
            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
              The foundation of our strategy rests on three interconnected pillars that will transform Africa's future.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white sm:h-16 sm:w-16">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Unity & Governance</h3>
              <p className="text-gray-600">
                Building shared systems, values, and collaborations that foster trust, efficiency, and unity across African communities.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white sm:h-16 sm:w-16">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Technology & Innovation</h3>
              <p className="text-gray-600">
                Leveraging cutting-edge technology to drive economic growth and digital transformation across the continent.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white sm:h-16 sm:w-16">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">Education & Development</h3>
              <p className="text-gray-600">
                Building world-class educational systems and human capital development programs for sustainable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-5 text-3xl font-bold sm:text-4xl">Ready to Shape Africa's Future?</h2>
          <p className="mx-auto mb-7 max-w-2xl text-base text-gray-300 sm:text-lg lg:text-xl">
            Join us in building a united, prosperous, and technologically advanced Africa.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Learning Platform Preview */}
      <section className="bg-black text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">TUAN Digital Academy</h2>
            <p className="mx-auto max-w-3xl text-base text-gray-300 sm:text-lg lg:text-xl">
              Empowering the next generation of African leaders through world-class digital education and training programs.
            </p>
          </div>

          <div className="bg-gray-500 rounded-lg p-8 text-center">
            <div className="bg-indigo-800 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Transform Your Future</h3>
              <p className="text-gray-300 mb-6">
                Access cutting-edge courses, connect with industry experts, and build the skills needed for Africa's digital economy.
              </p>
              <button 
                onClick={handleExploreLearning}
                className="bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors"
              >
                Explore Learning Platform
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';
export default HomePage;
