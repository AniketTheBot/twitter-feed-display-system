import mongoose, { Schema } from 'mongoose';

const tweetSchema = new Schema(
  {
    tweetId: {
      type: String,
      required: true,
      unique: true, // Ensures that each tweet has a unique ID.
      index: true, // Makes looking up tweets by their ID much faster.
    },
    text: {
      type: String,
      required: true,
    },

    mediaUrl: {
      type: String, // We will store the URL of the image or video preview
    },
    tweetedAt: {
      type: Date,
      required: true,
    },
    isDisplayed: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Tweet = mongoose.model('Tweet', tweetSchema);
