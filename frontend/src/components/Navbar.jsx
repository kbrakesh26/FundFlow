import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Menu, X, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Helper for active link underline
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg shadow-lg border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group transform transition-transform duration-200 hover:scale-105"
          >
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg group-hover:from-emerald-600 group-hover:to-blue-700 transition-all duration-300 shadow">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              FundFlow
            </span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`relative text-gray-700 font-medium transition-colors duration-200 hover:text-emerald-600 px-2 py-1
                ${isActive('/') ? 'after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emerald-600 after:rounded-full after:content-[""]' : ''}
              `}
            >
              Home
            </Link>
            <Link
              to="/campaigns"
              className={`relative text-gray-700 font-medium transition-colors duration-200 hover:text-emerald-600 px-2 py-1
                ${isActive('/campaigns') ? 'after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emerald-600 after:rounded-full after:content-[""]' : ''}
              `}
            >
              Explore Campaigns
            </Link>
            {user && (
              <Link
                to="/create-campaign"
                className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Start Campaign</span>
              </Link>
            )}
            <Link
              to="/contact-support"
              className={`relative text-gray-700 font-medium transition-colors duration-200 hover:text-emerald-600 px-2 py-1
                ${isActive('/contact-support') ? 'after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-emerald-600 after:rounded-full after:content-[""]' : ''}
              `}
            >
              Contact Support
            </Link>
          </div>
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200">
                  <img
                    src={user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=10b981&color=fff&size=128'}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border-2 border-emerald-200"
                  />
                  <span className="font-medium">{user.name.split(' ')[0]}</span>
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-200 shadow">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition-colors duration-200" title="Log Out">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 font-medium">
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-emerald-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg rounded-b-xl shadow-lg animate-fade-in-down">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/campaigns" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Explore Campaigns</Link>
              {user && (
                <Link to="/create-campaign" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Start Campaign</Link>
              )}
              <Link to="/contact-support" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Contact Support</Link>
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Profile</Link>
                  {user.isAdmin && (
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-md transition-colors duration-200">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200">Log Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-emerald-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Log In</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-md hover:from-emerald-700 hover:to-blue-700 transition-all duration-200">Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
