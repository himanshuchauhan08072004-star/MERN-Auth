import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, refresh, logout, me } from "../controllers/authController.js";
import { validate } from "../validators/authValidators.js";
import { registerSchema, loginSchema } from "../validators/authValidators.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Tighter limiter on auth endpoints — brute-force protection.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: "Too many attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/refresh-token", refresh);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
