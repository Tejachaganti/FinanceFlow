import User from "../models/User.js";
import Budget from "../models/Budget.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../utils/email.js";

export const registerUser = async (req, res, next) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    if (!name || !email || !password) {
      const error = new Error("Name, email, and password are required.");
      error.statusCode = 400;
      throw error;
    }
    if (name.length > 100 || !/^\S+@\S+\.\S+$/.test(email) || password.length < 6 || password.length > 128) {
      const error = new Error("Please provide valid registration details.");
      error.statusCode = 400;
      throw error;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists.");
      error.statusCode = 409;
      throw error;
    }

    const user = await User.create({ name, email, password });
    await Budget.create({ user: user._id });

    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        currency: user.currency,
        theme: user.theme,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    if (!email || !password || password.length > 128) {
      const error = new Error("Invalid credentials.");
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      const error = new Error("Invalid credentials.");
      error.statusCode = 401;
      throw error;
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        currency: user.currency,
        theme: user.theme,
        avatar: user.avatar
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  res.json({ success: true, user: req.user });
};

export const forgotPassword = async (req, res, next) => {
  try {
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const response = { success: true, message: "If an account exists for that email, a reset link has been sent." };
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.json(response);
    const user = await User.findOne({ email }).select("+resetPasswordToken +resetPasswordExpires");
    if (!user) return res.json(response);
    const rawToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    const baseUrl = process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173";
    try {
      await sendPasswordResetEmail({ to: user.email, name: user.name, resetUrl: `${baseUrl.replace(/\/$/, "")}/reset-password/${rawToken}` });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw error;
    }
    return res.json(response);
  } catch (error) { next(error); }
};

export const resetPassword = async (req, res, next) => {
  try {
    const password = typeof req.body.password === "string" ? req.body.password : "";
    if (password.length < 6 || password.length > 128 || !req.params.token) {
      const error = new Error("This password reset link is invalid or has expired."); error.statusCode = 400; throw error;
    }
    const tokenHash = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: tokenHash, resetPasswordExpires: { $gt: new Date() } }).select("+resetPasswordToken +resetPasswordExpires");
    if (!user) { const error = new Error("This password reset link is invalid or has expired."); error.statusCode = 400; throw error; }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ success: true, message: "Password reset successfully. You can now sign in." });
  } catch (error) { next(error); }
};

export const changePassword = async (req, res, next) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      const error = new Error("All fields are required.");
      error.statusCode = 400;
      throw error;
    }

    if (newPassword !== confirmPassword) {
      const error = new Error("Passwords do not match.");
      error.statusCode = 400;
      throw error;
    }

    if (newPassword.length < 6) {
      const error = new Error(
        "Password must be at least 6 characters."
      );
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(req.user._id);

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      const error = new Error("Current password is incorrect.");
      error.statusCode = 401;
      throw error;
    }

    user.password = newPassword;

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    next(error);
  }
};