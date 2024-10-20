import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import './config/passport.js'; // Passport configuration import
import authRouter from './routes/user.js';
import menuItemRoutes from './routes/menuItem.js';
import paymentRoutes from './routes/paymentRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

const app = express();

// MongoDB connect
connectDB();


app.use(cors({
  origin: '*', // Allow requests from any origin
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



// Middleware to parse JSON requests
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Setup express session
app.use(
  session({
    secret: '123456789', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day (adjust as needed)
    },
  })
);

// Use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// Basic response for the root route
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/auth', authRouter);
app.use('/api/menuItem', menuItemRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/order',orderRouter)

// Port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
