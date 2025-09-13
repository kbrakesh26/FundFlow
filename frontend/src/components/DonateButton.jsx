import React from 'react';

const DonateButton = ({ amount, campaignId }) => {
  const handleDonate = async () => {
    // 1. Create order on backend
    const res = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: 'INR', receipt: campaignId }),
    });
    const order = await res.json();

    // 2. Open Razorpay checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Or hardcode for test
      amount: order.amount,
      currency: order.currency,
      name: "Fundraiser",
      description: "Donation",
      order_id: order.id,
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // Optionally, verify payment on backend here
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        campaignId,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handleDonate} className="bg-blue-600 text-white px-4 py-2 rounded">
      Donate ₹{amount}
    </button>
  );
};

export default DonateButton;