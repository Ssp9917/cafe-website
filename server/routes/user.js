// /routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import {
    googleAuthCallback,
    facebookAuthCallback,
    githubAuthCallback,
    logout,
    signup,
    login,
} from '../controllers/user.js';

const authRouter = express.Router();


// Signup Route
authRouter.post('/signup', signup);

// Login Route
authRouter.post('/login', login);

// Google OAuth Routes
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleAuthCallback);

// Facebook OAuth Routes
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
authRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), facebookAuthCallback);

// GitHub OAuth Routes
authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), githubAuthCallback);

// Logout Route
authRouter.get('/logout', logout);

export default authRouter;
