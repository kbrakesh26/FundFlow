import Campaign from '../models/Campaign.js';

export const createCampaign = async (req, res) => {
  try {
    if (typeof req.body.creator === 'string') {
      req.body.creator = JSON.parse(req.body.creator);
    }

    const { title, shortDescription, description, category, goal, daysLeft, creator } = req.body;

    // Cloudinary returns the image URL in req.file.path or req.file.secure_url
    const imageUrl = req.file?.path || req.file?.secure_url || null;

const campaign = new Campaign({
  title,
  shortDescription,
  description,
  category,
  goal,
  daysLeft,
  status: 'approved',
  image: imageUrl,
  creator: creator || {
    id: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar
  }
});

    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    console.error("❌ Error creating campaign:", err);
    res.status(400).json({ message: err.message });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    console.error("❌ Error fetching campaigns:", err);
    res.status(500).json({ message: "Server error fetching campaigns" });
  }
};

// Approve campaign
export const approveCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json({ message: 'Campaign approved', campaign });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject campaign
export const rejectCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json({ message: 'Campaign rejected', campaign });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTrendingCampaigns = async (req, res) => {
  try {
    const trending = await Campaign.find({ status: "approved" })
      .sort({ amountRaised: -1 })
      .limit(3);
    res.json(trending);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};