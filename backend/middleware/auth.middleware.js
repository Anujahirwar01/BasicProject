import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;             // full user object
    req.userId = user._id;       // ✅ this is what controller expects

    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
