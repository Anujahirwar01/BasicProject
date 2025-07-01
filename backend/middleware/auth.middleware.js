// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    req.userId = user._id;
    req.user = user;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
