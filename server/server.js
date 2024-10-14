import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors'
import './config/passport.js'; // Passport configuration import
import authRouter from './routes/user.js';

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())

// MongoDB connect
connectDB();


// setup express session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

// use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// route
app.use('/auth', authRouter);

// port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
