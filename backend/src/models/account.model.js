import mongoose, { Schema } from 'mongoose';

const accountSchema = new Schema(
  {
    twitterUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Account = mongoose.model('Account', accountSchema);
