const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 1,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      max: 16,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, //to create updated and created at field automatically
  }
);

module.exports = mongoose.model('User', userSchema);
