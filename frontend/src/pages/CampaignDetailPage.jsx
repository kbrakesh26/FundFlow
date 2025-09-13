import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Users,
  Clock,
  MapPin,
  Share2,
  Heart,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import DonationModal from "../components/DonationModal";
import { formatDistanceToNow } from "date-fns";

const CampaignDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveMsg, setSaveMsg] = useState("");
  const [shareMsg, setShareMsg] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/campaigns/${id}`);
        const data = await res.json();
        setCampaign(data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  // Save handler
  const handleSave = () => {
    if (!campaign?._id) return;
    const saved = JSON.parse(localStorage.getItem('savedCampaigns') || '[]');
    if (!saved.includes(campaign._id)) {
      saved.push(campaign._id);
      localStorage.setItem('savedCampaigns', JSON.stringify(saved));
      setSaveMsg("Campaign saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    } else {
      setSaveMsg("Already saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    }
  };

  // Share handler
  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: campaign.shortDescription,
          url: shareUrl,
        });
        setShareMsg("Shared!");
        setTimeout(() => setShareMsg(""), 2000);
      } catch {
        setShareMsg("Share cancelled");
        setTimeout(() => setShareMsg(""), 2000);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareMsg("Link copied to clipboard!");
        setTimeout(() => setShareMsg(""), 2000);
      } catch {
        setShareMsg("Failed to copy link");
        setTimeout(() => setShareMsg(""), 2000);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <p className="text-lg text-gray-600">Loading campaign...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald-700 mb-2">
            Campaign Not Found
          </h2>
          <p className="text-gray-600">
            The campaign you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-white/80 backdrop-blur rounded-b-3xl shadow-xl border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Image */}
            <div>
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg border border-emerald-100"
              />
            </div>

            {/* Right - Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 shadow">
                    {campaign.category}
                  </span>
                  {campaign.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 shadow">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-4">
                  {campaign.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {campaign.shortDescription}
                </p>
              </div>

              {/* Creator */}
              <div className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur rounded-xl border border-emerald-100 shadow">
                {campaign.creator?.avatar ? (
                  <img
                    src={campaign.creator.avatar}
                    alt={campaign.creator.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-emerald-200"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-lg text-white">
                    {campaign.creator?.name?.charAt(0) || "?"}
                  </div>
                )}
                <div>
                  <div className="font-medium text-emerald-700">
                    {campaign.creator?.name || "Unknown"}
                  </div>
                  <div className="text-sm text-gray-500">Campaign Creator</div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-emerald-700">
                    ₹{campaign.raised?.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500">
                    of ₹{campaign.goal?.toLocaleString()} goal
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {campaign.backers}
                    </div>
                    <div className="text-sm text-gray-500">backers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {campaign.daysLeft}
                    </div>
                    <div className="text-sm text-gray-500">days left</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-sm text-gray-500">funded</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsDonationModalOpen(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Back This Campaign
                </button>
                <div className="flex gap-3">
                  <button
                    className="flex-1 bg-white/80 text-emerald-700 py-3 rounded-xl font-medium hover:bg-emerald-50 transition-colors duration-200 flex items-center justify-center space-x-2 border border-emerald-100 shadow"
                    onClick={handleSave}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Save</span>
                  </button>
                  <button
                    className="flex-1 bg-white/80 text-emerald-700 py-3 rounded-xl font-medium hover:bg-emerald-50 transition-colors duration-200 flex items-center justify-center space-x-2 border border-emerald-100 shadow"
                    onClick={handleShare}
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                </div>
                {/* Feedback messages */}
                {(saveMsg || shareMsg) && (
                  <div className="text-center text-sm text-emerald-700 mt-2">{saveMsg || shareMsg}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* About & Updates */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 p-8">
              <h2 className="text-2xl font-bold text-emerald-700 mb-6">
                About This Campaign
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>{campaign.description}</p>
              </div>
            </div>

            {/* Updates (static example, can be dynamic later) */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 p-8">
              <h2 className="text-2xl font-bold text-emerald-700 mb-6">
                Recent Updates
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <div className="text-sm text-gray-500 mb-1">2 days ago</div>
                  <h3 className="font-semibold text-emerald-700 mb-2">
                    Exciting Progress Update!
                  </h3>
                  <p className="text-gray-700">
                    We've hit 65% of our funding goal! Thank you to all our
                    amazing backers. Development is ahead of schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Reward Tiers */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 p-6">
              <h3 className="text-xl font-bold text-emerald-700 mb-4">
                Reward Tiers
              </h3>
              <div className="space-y-4">
                <div className="border border-emerald-100 rounded-xl p-4 hover:border-emerald-300 hover:shadow-md cursor-pointer transition">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-bold text-emerald-600">
                      ₹25
                    </span>
                    <span className="text-sm text-gray-500">47 backers</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Early Bird Special
                  </h4>
                  <p className="text-sm text-gray-600">
                    Thank you message + project updates
                  </p>
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 p-6">
              <h3 className="text-xl font-bold text-emerald-700 mb-4">
                Campaign Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Created</div>
                    <div className="text-sm text-gray-600">
                      {campaign.createdAt
                        ? formatDistanceToNow(new Date(campaign.createdAt), {
                            addSuffix: true,
                          })
                        : "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-sm text-gray-600">
                      {campaign.location || "Not specified"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Flexible Funding
                    </div>
                    <div className="text-sm text-gray-600">
                      Keep funds raised even if goal isn't met
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        campaign={campaign}
        onDonation={(amount) => {
          // Update raised and backers locally
          setCampaign((prev) => ({
            ...prev,
            raised: (prev.raised || 0) + amount,
            backers: (prev.backers || 0) + 1,
          }));
        }}
      />
    </div>
  );
};

export default CampaignDetailPage;