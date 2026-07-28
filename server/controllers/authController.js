import User from "../models/User.js";
import {
  registerUser,
  validateCredentials,
  issueNewTokenFamily,
  rotateRefreshToken,
  revokeRefreshToken,
  AuthError,
} from "../services/authService.js";
import { refreshCookieOptions, clearRefreshCookieOptions } from "../utils/cookies.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "Registration successful. Please log in.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await validateCredentials(email, password);
    const { accessToken, refreshToken } = await issueNewTokenFamily(user._id.toString());

    const previousLoginAt = user.lastLoginAt;
    user.lastLoginAt = new Date();
    await user.save();

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        lastLoginAt: previousLoginAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const rawToken = req.cookies?.refreshToken;
    if (!rawToken) {
      return res.status(401).json({ success: false, message: "No refresh token provided" });
    }

    const { accessToken, refreshToken, userId } = await rotateRefreshToken(rawToken);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    res.status(200).json({ success: true, accessToken, userId });
  } catch (err) {
    // Reuse detection trips this: force client to clear cookie & re-login
    if (err instanceof AuthError && err.statusCode === 403) {
      res.clearCookie("refreshToken", clearRefreshCookieOptions);
    }
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const rawToken = req.cookies?.refreshToken;
    await revokeRefreshToken(rawToken);
    res.clearCookie("refreshToken", clearRefreshCookieOptions);
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (err) {
    next(err);
  }
};
