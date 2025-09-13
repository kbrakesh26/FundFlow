import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCampaign } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const CreateCampaignPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    goal: '',
    category: '',
    duration: '30',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const categories = [
    'Technology',
    'Design',
    'Innovation',
    'Education',
    'Environment',
    'Health',
    'Art',
    'Community'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("shortDescription", formData.shortDescription);
      fd.append("description", formData.description);
      fd.append("goal", formData.goal);
      fd.append("category", formData.category);
      fd.append("daysLeft", Number(formData.duration));
      if (formData.image) fd.append("image", formData.image);

      // Add creator fields
    fd.append(
      "creator",
      JSON.stringify({
        id: user._id || user.id,
        name: user.name,
        avatar: user.avatar,
      })
    );

      await createCampaign(fd, user?.token);

      toast.success("Campaign created successfully!", { duration: 3000 });
      setTimeout(() => {
        navigate("/campaigns");
      }, 2500);
    } catch (err) {
      toast.error("Failed to create campaign.", { duration: 3000 });
      console.error(
        err?.stack || JSON.stringify(err, null, 2) || err?.message || err
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-emerald-700">Create a New Campaign</h2>

        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition"
            />
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            >
              <option value="" disabled>Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Goal Amount ($)</label>
            <input
              type="number"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Duration (days)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
              min="1"
              max="365"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Campaign'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaignPage;