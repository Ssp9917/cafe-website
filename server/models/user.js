import { model, Schema } from 'mongoose';

const UserSchema = new Schema({

  name: { type: String},
  email: { type: String, unique: true, required: true },
  password: { type: String },
  profileImage:{type:String},
  role:{type:String},
  googleId: { type: String },
  facebookId: { type: String },
  githubId: { type: String },
});

const User = model('User', UserSchema);

export default User;
