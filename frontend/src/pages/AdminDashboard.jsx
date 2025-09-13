/*import React, { useState } from 'react';
import { BarChart3, Users, DollarSign, Clock } from 'lucide-react';
import { useEffect } from 'react';
import { fetchCampaigns } from '../utils/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const all = await fetchCampaigns();
        setCampaigns(all);
      } catch {
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const pendingCampaigns = campaigns.filter(c => c.status === 'pending');
  const activeCampaigns = campaigns.filter(c => c.status === 'active');
  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const totalBackers = campaigns.reduce((sum, campaign) => sum + campaign.backers, 0);

  const stats = [
    {
      title: 'Total Campaigns',
      value: campaigns.length.toString(),
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Raised',
      value: `$${(totalRaised / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Active Backers',
      value: totalBackers.toString(),
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Pending Review',
      value: pendingCampaigns.length.toString(),
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'campaigns', label: 'Campaign Management' },
    { id: 'users', label: 'User Management' },
  ];

  const handleApprove = (campaignId) => {
    alert(`Campaign ${campaignId} approved!`);
  };

  const handleReject = (campaignId) => {
    alert(`Campaign ${campaignId} rejected!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header }
      {/* ...existing code... /}
    </div>
  );
};

export default AdminDashboard;
*/

import React, { useState, useEffect } from "react";
import { BarChart3, Users, DollarSign, Clock } from "lucide-react";
import { fetchCampaigns, approveCampaign, rejectCampaign } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [campaignTab, setCampaignTab] = useState("pending");
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
    // eslint-disable-next-line
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const all = await fetchCampaigns();
      setCampaigns(all);
    } catch {
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const pendingCampaigns = campaigns.filter((c) => c.status === "pending");
  const approvedCampaigns = campaigns.filter((c) => c.status === "approved");
  const rejectedCampaigns = campaigns.filter((c) => c.status === "rejected");

  const totalRaised = campaigns.reduce(
    (sum, campaign) => sum + (campaign.raised || 0),
    0
  );
  const totalBackers = campaigns.reduce(
    (sum, campaign) => sum + (campaign.backers || 0),
    0
  );

  const stats = [
    {
      title: "Total Campaigns",
      value: campaigns.length.toString(),
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Raised",
      value: `$${(totalRaised / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Active Backers",
      value: totalBackers.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Pending Review",
      value: pendingCampaigns.length.toString(),
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "campaigns", label: "Campaign Management" },
    { id: "users", label: "User Management" },
  ];

  const campaignTabs = [
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  const { token } = useAuth();

  const handleApprove = async (campaignId) => {
    try {
      await approveCampaign(campaignId, token);
      loadCampaigns();
    } catch (err) {
      console.error("Failed to approve campaign:", err);
    }
  };

  const handleReject = async (campaignId) => {
    try {
      await rejectCampaign(campaignId, token);
      loadCampaigns();
    } catch (err) {
      console.error("Failed to reject campaign:", err);
    }
  };

  const renderCampaigns = (list, type) => {
    if (loading) {
      return <p className="text-gray-500 py-8">Loading campaigns...</p>;
    }
    if (list.length === 0) {
      return <p className="text-gray-500 py-8">No {type} campaigns</p>;
    }
    return (
      <div className="space-y-4">
        {list.map((c) => (
          <div
            key={c._id}
            className="p-5 bg-white/80 backdrop-blur rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center border border-emerald-100 transition hover:shadow-lg"
          >
            <div>
              <p className="font-semibold text-emerald-700">{c.title}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{c.description}</p>
            </div>
            {type === "pending" && (
              <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                  onClick={() => handleApprove(c._id)}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 shadow"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(c._id)}
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-6">
      {/* Tabs Navigation */}
      <div className="flex space-x-4 border-b mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-6 text-lg font-semibold transition-all duration-200 relative
              ${
                activeTab === tab.id
                  ? "text-emerald-700 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-gradient-to-r after:from-emerald-600 after:to-blue-600 after:rounded-full after:content-['']"
                  : "text-gray-500 hover:text-emerald-700"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="p-6 bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 flex items-center space-x-4"
            >
              <div className={`p-4 rounded-full ${stat.bgColor} ${stat.color} shadow`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-emerald-700">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Campaign Management Section */}
      {activeTab === "campaigns" && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-emerald-700">Campaign Management</h2>
          {/* Sub-Tabs */}
          <div className="flex space-x-4 border-b mb-6">
            {campaignTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCampaignTab(tab.id)}
                className={`py-2 px-4 text-base font-medium transition-all duration-200 relative
                  ${
                    campaignTab === tab.id
                      ? "text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-blue-600 after:rounded-full after:content-['']"
                      : "text-gray-500 hover:text-blue-600"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Sub-Tab Content */}
          {campaignTab === "pending" &&
            renderCampaigns(pendingCampaigns, "pending")}
          {campaignTab === "approved" &&
            renderCampaigns(approvedCampaigns, "approved")}
          {campaignTab === "rejected" &&
            renderCampaigns(rejectedCampaigns, "rejected")}
        </div>
      )}

      {/* User Management Placeholder */}
      {activeTab === "users" && (
        <div>
          <h2 className="text-2xl font-bold text-emerald-700">User Management</h2>
          <p className="text-gray-500 mt-2">Coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;


