import express from 'express';
import auth from '../middleware/auth.js';
import { donate, getDonationsByCampaign } from '../controllers/donationController.js';
import { getTopDonors } from '../controllers/donationController.js';

const router = express.Router();

// Make a donation to a specific campaign
router.post('/:campaignId', auth, donate);
router.post('/', auth, donate);
// Get all donations for a campaign
router.get('/:campaignId', getDonationsByCampaign);

router.get('/leaderboard', getTopDonors);

export default router;