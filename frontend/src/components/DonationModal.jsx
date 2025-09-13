import React, { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { donate } from '../utils/api';

const DonationModal = ({ isOpen, onClose, campaign, onDonationSuccess }) => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = ['25', '50', '100', '250'];
  const selectedAmount = customAmount || amount;

  const handleDonate = async () => {
    if (!user) {
      alert('Please log in to donate');
      return;
    }
    if (!selectedAmount || Number(selectedAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    setIsProcessing(true);
    try {
      await donate(
        {
          campaignId: campaign._id || campaign.id,
          amount: Number(selectedAmount),
          message,
        },
        user.token
      );

      alert(`🎉 Thank you for your $${selectedAmount} donation!`);
      setIsProcessing(false);

      // Trigger parent refresh (Campaign Detail page)
      if (onDonationSuccess) {
        onDonationSuccess(Number(selectedAmount));
      }

      onClose();
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert('❌ Donation failed. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Back This Campaign</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Campaign Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              {campaign?.image ? (
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="h-16 w-16 object-cover rounded-lg"
                />
              ) : (
                <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  📷
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  {campaign?.title || 'Untitled Campaign'}
                </h3>
                <p className="text-sm text-gray-600">
                  by {campaign?.creator?.name || 'Anonymous'}
                </p>
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose your contribution amount
              </label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setAmount(preset);
                      setCustomAmount('');
                    }}
                    className={`p-3 rounded-xl border-2 font-medium transition-all duration-200 ${
                      amount === preset && !customAmount
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 text-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
              />
            </div>

            {/* Optional Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Optional message to creator
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share why you're supporting this campaign..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
              />
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Contribution</span>
                <span className="font-semibold">${selectedAmount || '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Platform fee (3%)</span>
                <span className="font-semibold">
                  ${((Number(selectedAmount) || 0) * 0.03).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-gray-300 pt-2 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-lg">
                  ${((Number(selectedAmount) || 0) * 1.03).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Lock className="h-4 w-4" />
              <span>Secure payment processed by Razorpay</span>
            </div>

            {/* Action Button */}
            <button
              onClick={handleDonate}
              disabled={
                !selectedAmount || Number(selectedAmount) <= 0 || isProcessing || !user
              }
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>Contribute ${selectedAmount || '0'}</span>
                </>
              )}
            </button>

            {!user && (
              <p className="text-center text-sm text-gray-500">
                Please log in to make a contribution
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
