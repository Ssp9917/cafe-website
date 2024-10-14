// /controllers/authController.js
import User from '../models/user.js';

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
};
