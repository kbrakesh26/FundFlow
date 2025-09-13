import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/donations/leaderboard")
      .then(res => res.json())
      .then(setDonors);
  }, []);

  return (
    <div className="bg-white/80 rounded-xl shadow p-6 mb-8">
      <h2 className="text-xl font-bold text-emerald-700 mb-4">Top Donors</h2>
      <ol className="space-y-2">
        {donors.map((donor, idx) => (
          <li key={donor._id._id} className="flex items-center gap-3">
            <span className="font-bold text-lg text-emerald-700">{idx + 1}.</span>
            <img src={donor._id.avatar} alt={donor._id.name} className="h-8 w-8 rounded-full object-cover border" />
            <span className="font-medium">{donor._id.name}</span>
            <span className="ml-auto text-emerald-600 font-semibold">₹{donor.totalDonated}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;