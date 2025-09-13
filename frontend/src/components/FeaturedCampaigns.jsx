import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CampaignCard from './CampaignCard';
import { fetchCampaigns } from '../utils/api';

const FeaturedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Sort by newest and take top 3
  const featuredCampaigns = [...campaigns]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-4 animate-fade-in">
            Featured Campaigns
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover innovative projects from creators around the world who are making a difference
          </p>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading campaigns...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign._id || campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
        <div className="text-center">
          <Link
            to="/campaigns"
            className="group inline-flex items-center px-8 py-4 text-lg font-medium text-emerald-600 bg-white/80 border-2 border-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur"
          >
            Explore All Campaigns
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;