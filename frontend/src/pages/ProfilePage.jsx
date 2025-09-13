import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchCampaigns, updateProfile } from '../utils/api';
import CampaignCard from '../components/CampaignCard';

const ProfilePage = () => {
  const { user, setUser } = useAuth ? useAuth() : { user: null, setUser: () => {} };
  const [activeTab, setActiveTab] = useState('campaigns');
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const allCampaigns = await fetchCampaigns();
        setUserCampaigns(allCampaigns.filter(c => c.creator && (c.creator.id === user?._id || c.creator.id === user?.id)));
      } catch {
        setUserCampaigns([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) load();
  }, [user]);

  const tabs = [
    { id: 'campaigns', label: 'My Campaigns', icon: BarChart3 },
    { id: 'backed', label: 'Backed Projects', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Profile update state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    password: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [profileMsg, setProfileMsg] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg('');
    let avatarUrl = profileForm.avatar;
    try {
      // If a new avatar file is selected, upload to Cloudinary
      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);
        formData.append('upload_preset', 'ml_default'); // Change to your Cloudinary unsigned preset
        const res = await fetch('https://api.cloudinary.com/v1_1/dospmau7p/image/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (data.secure_url) {
          avatarUrl = data.secure_url;
        } else {
          throw new Error('Cloudinary upload failed');
        }
      }
      const updated = await updateProfile(
        {
          name: profileForm.name,
          email: profileForm.email,
          avatar: avatarUrl,
          ...(profileForm.password ? { password: profileForm.password } : {}),
        },
        user.token
      );
      setProfileMsg('Profile updated!');
      setProfileForm(f => ({ ...f, password: '', avatar: avatarUrl }));
      setAvatarFile(null);
      if (setUser) setUser({ ...user, ...updated });
      localStorage.setItem('user', JSON.stringify({ ...user, ...updated, token: user.token }));
    } catch (err) {
      setProfileMsg('Update failed.');
      console.error('Profile update error:', err);
      if (window && window.toast) window.toast.error('Profile update failed!');
    } finally {
      setProfileLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Profile Header */}
      <div className="max-w-3xl mx-auto flex flex-col items-center py-10">
        <div className="relative">
          <img
            src={profileForm.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=10b981&color=fff&size=128`}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover border-4 border-emerald-200 shadow-lg"
          />
          <label className="absolute bottom-0 right-0 bg-emerald-600 text-white rounded-full p-2 cursor-pointer shadow hover:bg-emerald-700 transition">
            <Plus className="h-4 w-4" />
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-emerald-700">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Badges */}
      {user.badges && user.badges.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2 justify-center">
      {user.badges.map(badge => (
      <span
        key={badge}
        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold shadow"
        >
        {badge}
      </span>
      ))}
      </div>
    )}

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 relative
              ${
                activeTab === tab.id
                  ? "bg-white/80 text-emerald-700 shadow after:absolute after:left-0 after:-bottom-1 after:w-full after:h-1 after:bg-gradient-to-r after:from-emerald-600 after:to-blue-600 after:rounded-full after:content-['']"
                  : "bg-white text-gray-700 hover:text-emerald-700"
              }
            `}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="mr-2" size={20} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto p-4">
        {activeTab === 'campaigns' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-700">My Campaigns</h2>
            {loading ? (
              <div className="text-center text-gray-500 py-10">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userCampaigns.map(c => (
                  <CampaignCard key={c._id} campaign={c} />
                ))}
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <Link
                to="/create-campaign"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-semibold shadow hover:from-emerald-700 hover:to-blue-700 transition-all duration-200"
              >
                <Plus className="mr-2" /> Start New Campaign
              </Link>
            </div>
          </div>
        )}
        {activeTab === 'backed' && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-700">Backed Projects</h2>
            <div className="text-center text-gray-500 py-10">Coming soon...</div>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 p-8">
            <h2 className="text-xl font-bold mb-4 text-emerald-700">Update Profile</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-emerald-700">Name</label>
                <input type="text" name="name" value={profileForm.name} onChange={handleProfileChange} className="w-full border border-emerald-100 px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200 outline-none" required />
              </div>
              <div>
                <label className="block mb-1 font-medium text-emerald-700">Email</label>
                <input type="email" name="email" value={profileForm.email} onChange={handleProfileChange} className="w-full border border-emerald-100 px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200 outline-none" required />
              </div>
              <div>
                <label className="block mb-1 font-medium text-emerald-700">New Password</label>
                <input type="password" name="password" value={profileForm.password} onChange={handleProfileChange} className="w-full border border-emerald-100 px-3 py-2 rounded focus:ring-2 focus:ring-emerald-200 outline-none" placeholder="Leave blank to keep current" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg" disabled={profileLoading}>
                {profileLoading ? 'Saving...' : 'Update Profile'}
              </button>
              {profileMsg && <div className="text-center text-sm mt-2">{profileMsg}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;