import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String, unique: true, required: true },
  password: { type: String },
  googleId: { type: String },
  facebookId: { type: String },
  githubId: { type: String },
});

const User = mongoose.model('User', UserSchema);

export default User;
