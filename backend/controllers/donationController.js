import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';
import User from '../models/User.js';

export const donate = async (req, res) => {
  try {
    // Support both /:campaignId and body.campaignId
    const campaignId = req.params.campaignId || req.body.campaignId;
    const { amount, message } = req.body;
    const userId = req.user._id;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    // Create donation
    const donation = await Donation.create({
      campaign: campaignId,
      user: userId,
      amount,
      message,
    });

    const user = await User.findById(userId);
    if (amount >= 10000 && !user.badges.includes("Top Donor")) {
    user.badges.push("Top Donor");
    }
    if (user.donationsCount === 0 && !user.badges.includes("First Donation")) {
    user.badges.push("First Donation");
    }
    await user.save();

    // Update campaign stats
    campaign.raised += Number(amount);
    campaign.backers += 1;
    await campaign.save();

    res.status(201).json({ donation, campaign });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDonationsByCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const donations = await Donation.find({ campaign: campaignId }).populate('user', 'name avatar');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopDonors = async (req, res) => {
  try {
    // Aggregate top donors by total amount
    const topDonors = await Donation.aggregate([
      { $group: { _id: "$user", totalDonated: { $sum: "$amount" } } },
      { $sort: { totalDonated: -1 } },
      { $limit: 10 }
    ]);
    // Populate user info
    const populated = await User.populate(topDonors, { path: "_id", select: "name avatar" });
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};