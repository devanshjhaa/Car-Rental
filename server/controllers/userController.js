import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";

//  Generate JWT  with user role
const generateToken = (userId, role) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error(" JWT_SECRET is undefined. Check your .env file.");
    return null;
  }

  const payload = { id: userId, role }; 

  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

//  Register 
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password || password.length < 8) {
      return res.json({
        success: false,
        message: "Fill all fields correctly. Password must be at least 8 characters.",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate token
    const token = generateToken(user._id.toString(), user.role); 

    if (!token) {
      return res.json({ success: false, message: "Token generation failed" });
    }

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//  Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id.toString(), user.role);

    if (!token) {
      return res.json({ success: false, message: "Token generation failed" });
    }

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    });
  } catch (error) {
    console.error(" Error during login:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

//  Get user data using JWT (Protected Route)
export const getUserData = async (req, res) => {
  try {
    const user = req.user;
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  Get all available cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    res.json({ success: true, cars });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
