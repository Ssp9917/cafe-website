// controllers/authController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// Signup Controller
export const signup = async (req, res) => {
    const { name, email, password } = req.body;

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
