import React from "react";
import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";

const CampaignCard = ({ campaign }) => {
  const progressPercentage = (campaign.raised / campaign.goal) * 100;

  return (
    <Link
      to={`/campaigns/${campaign._id || campaign.id}`}
      className="group block bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
       <img
         src={campaign.image}
         alt={campaign.title}
         className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
         onError={e => { e.target.src = '/placeholder.jpg'; }}
        />
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm shadow">
            {campaign.category}
          </span>
        </div>
        {campaign.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500 text-white shadow">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-2">
          {campaign.title}
        </h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {campaign.shortDescription}
        </p>

        {/* Creator */}
        <div className="flex items-center space-x-2 mb-4">
          {campaign.creator?.avatar ? (
            <img
              src={campaign.creator.avatar}
              alt={campaign.creator.name}
              className="h-8 w-8 rounded-full object-cover border-2 border-emerald-200"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white">
              {campaign.creator?.name?.charAt(0) || "?"}
            </div>
          )}
          <span className="text-sm text-gray-700 font-medium">
            by {campaign.creator?.name || "Unknown"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm font-medium text-gray-900">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-emerald-700">
              ₹{(campaign.raised / 1000).toFixed(1)}K
            </div>
            <div className="text-xs text-gray-500">raised</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-lg font-bold text-gray-900">
                {campaign.backers}
              </span>
            </div>
            <div className="text-xs text-gray-500">backers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-lg font-bold text-gray-900">
                {campaign.daysLeft}
              </span>
            </div>
            <div className="text-xs text-gray-500">days left</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;