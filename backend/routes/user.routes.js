import jwt from 'jsonwebtoken';
import userModel from '../model/user.model.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    // ✅ Decode token (must include _id in the payload)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    req.userId = user._id;
    req.user = user;

    next(); // 🚀 proceed to next middleware/route
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
