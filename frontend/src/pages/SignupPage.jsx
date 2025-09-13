import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    let avatarUrl = '';
    if (avatarFile) {
      const formData = new FormData();
      formData.append('file', avatarFile);
      formData.append('upload_preset', 'unsigned_preset'); // replace with your unsigned preset
      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dospmau7p/image/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        avatarUrl = data.secure_url;
      } catch (err) {
        setError('Failed to upload avatar');
        return;
      }
    }
    const success = await signup(name, email, password, avatarUrl);
    if (success) {
      navigate('/');
    } else {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-emerald-700">Sign Up</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Avatar (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                setAvatarFile(e.target.files[0]);
                setAvatarPreview(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null);
              }}
              className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition"
            />
            {avatarPreview && (
              <img src={avatarPreview} alt="Avatar Preview" className="mt-2 w-20 h-20 rounded-full object-cover border-2 border-emerald-200 shadow" />
            )}
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                required
              />
              <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                required
              />
              <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                required
              />
              <Lock className="absolute right-10 top-3 h-5 w-5 text-gray-400" />
              <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-emerald-700 mb-2 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-emerald-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                required
              />
              <Lock className="absolute right-10 top-3 h-5 w-5 text-gray-400" />
              <button type="button" className="absolute right-3 top-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-emerald-600 hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;