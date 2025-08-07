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
//  It will automatically delete any document 7 days after it was created in our database.
tweetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export const Tweet = mongoose.model('Tweet', tweetSchema);
