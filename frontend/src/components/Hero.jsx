// import React from 'react';
// import { Link, Navigate,useNavigate} from 'react-router-dom';
// import { ArrowRight, Play } from 'lucide-react';

// const Hero = () => {
//   const navigate=useNavigate();
//   function clickoncam(){
//     navigate('/create-campaign');
//   }
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left Column - Content */}
//           <div className="space-y-8">
//             <div className="space-y-4">
//               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                 Turn Your
//                 <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
//                   {' '}Dreams{' '}
//                 </span>
//                 Into Reality
//               </h1>
//               <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
//                 Join thousands of creators and backers on the world's most trusted crowdfunding platform. 
//                 Start your campaign today and bring your innovative ideas to life.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button onClick={clickoncam}
                
//                 className=" group cursor-pointer inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//               >
//                 Start Your Campaign
//                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
//               </button>
              
//               <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-emerald-600 bg-white border-2 border-emerald-600 rounded-xl hover:bg-emerald-50 transition-all duration-300">
//                 <Play className="mr-2 h-5 w-5" />
//                 Watch Demo
//               </button>
//             </div>
//             <div className="flex items-center space-x-8 text-sm text-gray-500">
//               <div className="flex items-center space-x-2">
//                 <div className="h-2 w-2 bg-green-500 rounded-full"></div>
//                 <span>Secure Payments</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="h-2 w-2 bg-green-500 rounded-full"></div>
//                 <span>Global Reach</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="h-2 w-2 bg-green-500 rounded-full"></div>
//                 <span>24/7 Support</span>
//               </div>
//             </div>
//           </div>
//           {/* Right Column - Visual */}
//           <div className="relative">
//             <div className="relative z-10">
//               <img
//                 src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
//                 alt="Crowdfunding Success"
//                 className="rounded-2xl shadow-2xl object-cover w-full h-96 lg:h-[500px]"
//               />
//             </div>
//             {/* Floating Elements */}
//             <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20 animate-pulse"></div>
//             <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-75"></div>
//           </div>
//         </div>
//       </div>
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(rgba(0,0,0,0.1) 2px, transparent 2px)`,
//             backgroundSize: '60px 60px',
//           }}
//         ></div>
//       </div>
//     </section>
//   );
// };

// export default Hero;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/SchoolHero.jpg"; // Use a real photo here!

const categories = ["Health", "Education", "Community", "Innovation"];

const HeroSection = ({ trendingCampaigns = [] }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/campaigns?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <section className="premium-gradient-bg py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        {/* Left: Headline, Search, Actions */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Empower Ideas. <span className="text-emerald-600">Fund Dreams.</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Join India’s trusted crowdfunding community. Support inspiring projects, or launch your own and turn your vision into reality.
          </p>
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex mb-4" role="search" aria-label="Search campaigns">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Search campaigns"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-2 rounded-r-lg font-semibold hover:bg-emerald-700 transition"
              aria-label="Search"
            >
              Search
            </button>
          </form>
          {/* Actions */}
          <div className="flex gap-4 mb-4">
            <Link
              to="/create-campaign"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Start a Campaign
            </Link>
            <Link
              to="/campaigns"
              className="bg-white border border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition"
            >
              Explore Campaigns
            </Link>
          </div>
          {/* Social Proof */}
          <div className="flex items-center gap-2 mt-2 mb-4">
            <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              10,000+ backers
            </span>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              ₹5 crore+ raised
            </span>
          </div>
          {/* Quick Category Filter */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/campaigns?category=${cat}`}
                className="bg-white border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs hover:bg-emerald-50 transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
        {/* Right: Image + Trending */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={heroImg}
            alt="Real campaign collage"
            className="rounded-2xl shadow-xl bg-white/80 backdrop-blur w-full max-w-md object-cover mb-6"
          />
          {/* Trending Campaigns Preview */}
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Trending Campaigns</h3>
            <div className="flex flex-col gap-2">
              {trendingCampaigns.length === 0 ? (
                <div className="text-gray-500">No trending campaigns right now.</div>
              ) : (
                trendingCampaigns.slice(0, 3).map(camp => (
                  <Link
                    key={camp._id}
                    to={`/campaigns/${camp._id}`}
                    className="flex items-center bg-white border border-emerald-100 rounded-lg px-4 py-2 hover:bg-emerald-50 transition"
                  >
                    <img
                      src={camp.image || "/assets/default-campaign.jpg"}
                      alt={camp.title}
                      className="w-12 h-12 object-cover rounded mr-3 border"
                    />
                    <div>
                      <div className="font-semibold text-emerald-700">{camp.title}</div>
                      <div className="text-xs text-gray-500">{camp.shortDescription}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        ₹{camp.amountRaised?.toLocaleString() || 0} raised
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
