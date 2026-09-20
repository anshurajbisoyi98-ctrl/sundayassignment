import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Validate role
  const validRoles = ["CITIZEN", "AGENT", "COLLECTOR"];
  const userRole = validRoles.includes(role) ? role : "CITIZEN";

  const newUser = new User({ 
    username, 
    email, 
    password: hashedPassword,
    role: userRole
  });

  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      generateToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      });
      return;
    }
  }
  
  res.status(401);
  throw new Error("Invalid email or password");
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

const getAgents = asyncHandler(async (req, res) => {
  const agents = await User.find({ 
    $or: [{ role: "AGENT" }, { role: "COLLECTOR" }] 
  }).select("-password");
  res.json(agents);
});

export { createUser, loginUser, logoutCurrentUser, getCurrentUserProfile, getAllUsers, getAgents };
