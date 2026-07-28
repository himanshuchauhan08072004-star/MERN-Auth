import crypto from "crypto";
import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import {
  generateAccessToken,
  generateRefreshTokenValue,
  hashToken,
  getRefreshTokenExpiryDate,
} from "../utils/token.js";

class AuthError extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new AuthError("Email is already registered", 409);

  const user = await User.create({ name, email, password });
  return user;
};

export const validateCredentials = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AuthError("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AuthError("Invalid email or password");

  return user;
};

// Issues a brand new access+refresh pair, starting a NEW token family.
// Used at login.
export const issueNewTokenFamily = async (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshTokenValue();
  const family = crypto.randomUUID();

  await RefreshToken.create({
    user: userId,
    tokenHash: hashToken(refreshToken),
    family,
    expiresAt: getRefreshTokenExpiryDate(),
  });

  return { accessToken, refreshToken };
};

// Rotation with reuse detection.
// Flow:
// 1. Hash the incoming raw refresh token, look it up.
// 2. Not found at all -> token is bogus/expired -> reject.
// 3. Found but already revoked -> this exact token was already rotated
//    once before. Someone is replaying an old token = theft signal.
//    Kill the entire family (every session descended from that login).
// 4. Found and valid -> revoke it, issue a new token in the SAME family,
//    so the chain continues but the old token can never be reused.
export const rotateRefreshToken = async (rawToken) => {
  const tokenHash = hashToken(rawToken);
  const existing = await RefreshToken.findOne({ tokenHash });

  if (!existing) {
    throw new AuthError("Invalid refresh token");
  }

  if (existing.revoked) {
    await RefreshToken.updateMany(
      { family: existing.family },
      { revoked: true }
    );
    throw new AuthError("Refresh token reuse detected — session revoked", 403);
  }

  if (existing.expiresAt < new Date()) {
    throw new AuthError("Refresh token expired");
  }

  existing.revoked = true;
  await existing.save();

  const newRawToken = generateRefreshTokenValue();
  await RefreshToken.create({
    user: existing.user,
    tokenHash: hashToken(newRawToken),
    family: existing.family,
    expiresAt: getRefreshTokenExpiryDate(),
  });

  const accessToken = generateAccessToken(existing.user.toString());

  return { accessToken, refreshToken: newRawToken, userId: existing.user };
};

export const revokeRefreshToken = async (rawToken) => {
  if (!rawToken) return;
  const tokenHash = hashToken(rawToken);
  await RefreshToken.updateOne({ tokenHash }, { revoked: true });
};

export { AuthError };
