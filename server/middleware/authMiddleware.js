import { verifyAccessToken } from "../utils/token.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No access token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.sub;
    next();
  } catch (err) {
    // Distinguish expired vs invalid so the frontend knows whether
    // to silently retry via /refresh-token or force a full re-login.
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Access token expired", code: "TOKEN_EXPIRED" });
    }
    return res.status(401).json({ success: false, message: "Invalid access token" });
  }
};
