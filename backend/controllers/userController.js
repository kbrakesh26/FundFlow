import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // update fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.body.avatar) {
      user.avatar = req.body.avatar;
    }

    await user.save();

    // 🔹 generate new token after update
    const token = generateToken(user);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token, // ✅ new token sent back
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
