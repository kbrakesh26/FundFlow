import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  creator: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    avatar: String
  },
  raised: { type: Number, default: 0 },
  goal: { type: Number, required: true },
  backers: { type: Number, default: 0 },
  daysLeft: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);
