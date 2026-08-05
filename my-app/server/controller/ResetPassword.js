const User = require("../model/User");
const mailSender = require("../utils/MailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


// Generate Reset Password Token

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please enter a registered email.",
      });
    }

    // Generate unique token
    const token = crypto.randomUUID();

    // Save token & expiry (5 minutes)
    await User.findByIdAndUpdate(
      user._id,
      {
        token,
        resetPasswordExpires: new Date(Date.now() + 5 * 60 * 1000),
      },
      { new: true }
    );

    // Reset URL
    const URL = `http://localhost:3000/reset-password/${token}`;

    // Send email
    await mailSender(
      email,
      "Password Reset Link",
      `Click the link below to reset your password:\n\n${URL}\n\nThis link is valid for 5 minutes and can only be used once.`
    );

    return res.status(200).json({
      success: true,
      message:
        "Password reset link sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


// Reset Password

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // Validation
    if (!password || !confirmPassword || !token) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    // Find user using token
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "This password reset link is invalid or has already been used Please generate a new one.",
      });
    }

    // Check token expiry
    if (Date.now() > user.resetPasswordExpires.getTime()) {
      return res.status(400).json({
        success: false,
        message: "Password reset link has expired. Please generate a new one.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and invalidate token
    await User.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: null,
        resetPasswordExpires: null,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};