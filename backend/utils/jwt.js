import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, avatar: user.avatar, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
