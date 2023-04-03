const User = require('../models/userModal');

const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    //check if user Exists
    const userExists = await User.findOne({ userName });
    if (userExists) {
      res.json({ status: false, msg: 'user Name already exists' });
    }
    //check if email Exists
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      res.json({ status: false, msg: 'email already exists' });
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // console.log(user);
    if (user) {
      delete user.password;
      res.json({ status: true, user });
    } else {
      res.json({ status: false, msg: 'Invalid user data' });
    }
  } catch (ex) {
    next(ex);
  }
};
const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    //check if user Exists
    const user = await User.findOne({ userName });
    if (!user) {
      res.json({ status: false, msg: "user Name doesn't exists" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      delete user.password;
      res.json({ status: true, user });
    } else {
      res.json({ status: false, msg: 'Invalid User Credentials' });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
  register,
  login,
};
