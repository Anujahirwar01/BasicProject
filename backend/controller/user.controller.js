import userModel from '../model/user.model.js';
import *as userService from '../service/user.service.js';
import { validationResult } from 'express-validator';

export const createUserController = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {name,email,password} = req.body;
        console.log('Creating user with email:', email); // Add this for debugging
        
        const user = await userService.createUser({name,email,password});
        const token = user.generateAuthToken();
        delete user._doc.password;
        
        res.status(201).json({
            user: user,
            token: token
        });
    } catch (error) {
        console.error('Detailed error:', error); // This will show the full error
        
        // Handle specific MongoDB errors
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        
        res.status(500).json({ error: error.message }); // Send actual error message
    }
}

export const loginUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    delete user._doc.password;

    // ✅ Set token as a cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true, // set true in production (HTTPS)
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        domain: '.onrender.com' 
      })
      .status(200)
      .json({ user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}, "name email _id createdAt");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getUserProfileController = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }   
        
        // Convert to plain object and remove password
        const userProfile = user.toObject ? user.toObject() : user;
        delete userProfile.password;
        
        res.status(200).json({
            user: userProfile,
            message: 'Profile retrieved successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export const getUserByIdController = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .select('name email description tags createdAt'); // ✅ Include description and tags

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// controller/user.controller.js
export const updateUserController = async (req, res) => {

  try {
    const { name, description, tags } = req.body;

    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = name ?? user.name;
    user.description = description ?? user.description;
    user.tags = tags ?? user.tags;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Server error while updating profile" });
  }
};



export const logoutUserController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // should be true in production
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


