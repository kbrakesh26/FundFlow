import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import upload from '../middleware/upload.js';
import { createCampaign, getCampaigns, getCampaignById, approveCampaign, rejectCampaign, getTrendingCampaigns } from '../controllers/campaignController.js';

const router = express.Router();

// Public
router.get('/trending', getTrendingCampaigns); // <-- Move this above /:id
router.get('/', getCampaigns);
router.get('/:id', getCampaignById);

// Protected
router.post('/', auth, upload.single('image'), createCampaign);

router.patch('/:id/approve', auth, admin, approveCampaign);
router.patch('/:id/reject', auth, admin, rejectCampaign);

export default router;