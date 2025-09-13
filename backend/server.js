import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './utils/db.js';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors({ origin: true, credentials: true }));
import authRoutes from './routes/auth.js';
import campaignRoutes from './routes/campaigns.js';
import donationRoutes from './routes/donations.js';
import userRoutes from './routes/user.js';
import paymentRoutes from './routes/paymentRoutes.js';
// Connect Database
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('api is running');
});


app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// Auth routes
app.use('/api/auth', authRoutes);
// User profile routes
app.use('/api/user', userRoutes);
// Campaign routes
app.use('/api/campaigns', campaignRoutes);
// Donation routes
app.use('/api/donations', donationRoutes);
//payment routes
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
