import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import CampaignCard from '../components/CampaignCard';
import { fetchCampaigns } from '../utils/api';

const CampaignsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    'all',
    'Technology',
    'Design',
    'Innovation',
    'Education',
    'Environment',
    'Health',
    'Art'
  ];

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

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
      return matchesSearch && matchesCategory && campaign.status === 'approved';
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'ending-soon':
          return a.daysLeft - b.daysLeft;
        case 'most-funded':
          return b.raised - a.raised;
        default:
          return b.featured ? 1 : -1;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="flex items-center gap-2 w-full md:w-1/2 bg-white/80 backdrop-blur rounded-xl shadow px-4 py-2 border border-emerald-100">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-transparent px-2 py-2 focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-emerald-100 rounded-lg bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2 border border-emerald-100 rounded-lg bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="ending-soon">Ending Soon</option>
              <option value="most-funded">Most Funded</option>
            </select>
            <SlidersHorizontal className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading campaigns...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-20">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map(campaign => (
                <CampaignCard key={campaign._id || campaign.id} campaign={campaign} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-20">
                No campaigns found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;