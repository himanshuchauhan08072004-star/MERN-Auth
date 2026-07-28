import jwt from "jsonwebtoken";
import crypto from "crypto";

// Access token: JWT, stateless, short-lived (15m). Carries only userId.
export const generateAccessToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

// Refresh token: NOT a JWT. It's an opaque random string.
// Why: it carries no payload to decode, its only job is to be an
// unguessable lookup key we can hash and compare against the DB.
// This avoids "JWT refresh token can't truly be revoked" problems.
export const generateRefreshTokenValue = () => {
  return crypto.randomBytes(40).toString("hex");
};

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const getRefreshTokenExpiryDate = () => {
  const days = parseInt(process.env.REFRESH_TOKEN_EXPIRY) || 7;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};
