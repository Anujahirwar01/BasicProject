import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  console.log("🔐 Incoming request:");
  console.log("➡️ Cookies:", req.cookies);

  const token = req.cookies.token;

  if (!token) {
    console.log("❌ No token found in cookies");
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token is valid. User:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Invalid token:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
