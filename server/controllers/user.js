// controllers/authController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';


// Signup Controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    console.log(req.body)

    console.log(name,email,password)

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, provider: 'local' });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Controller
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and return a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Google Callback Handler
export const googleAuthCallback = (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect('/dashboard');
};

// Facebook Callback Handler
export const facebookAuthCallback = (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect('/dashboard');
};

// GitHub Callback Handler
export const githubAuthCallback = (req, res) => {
    // Successful authentication, redirect to dashboard
    res.redirect('/dashboard');
};

// Logout Handler
export const logout = (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
}

// get all user
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}



// Update user details
export const updateUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        console.log(req.headers.authorization)

        // Get the token from the request headers
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication token required' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const loggedInUserId = decoded.id;
        const loggedInUserRole = decoded.role;

        // Fetch the user to be updated
        const userToUpdate = await User.findById(id);
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the logged-in user is an admin, they can update any user's role
        if (loggedInUserRole === 'admin') {
            if (role) {
                userToUpdate.role = role;
            }
            if (name) {
                userToUpdate.name = name;
            }
            if (email) {
                userToUpdate.email = email;
            }
        } else {
            // If the logged-in user is not an admin, they can only update their own details
            if (userToUpdate._id.toString() !== loggedInUserId) {
                return res.status(403).json({ message: 'Permission denied' });
            }

            // Update only name and email
            if (name) {
                userToUpdate.name = name;
            }
            if (email) {
                userToUpdate.email = email;
            }
            if (role) {
                return res.status(403).json({ message: 'You are not allowed to update the role' });
            }
        }

        // Handle image upload if a file is provided
        if (req.file) {
            const uploadPath = path.join(__dirname, '../uploads', req.file.filename); // Set the upload path
            const userImagePath = path.join(__dirname, '../uploads', userToUpdate.profileImage); // Existing image path

            // Move the uploaded file to the desired location
            fs.renameSync(req.file.path, uploadPath);

            // Update userToUpdate with the new image path
            userToUpdate.profileImage = req.file.filename;

            // Optionally delete the existing image file if it exists
            if (fs.existsSync(userImagePath)) {
                fs.unlinkSync(userImagePath); // Delete the old image file
            }
        }

        // Save the updated user details
        await userToUpdate.save();

        res.status(200).json({ message: 'User details updated successfully', user: userToUpdate });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

