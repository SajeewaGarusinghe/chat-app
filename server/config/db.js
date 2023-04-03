const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MONGO_URL ="mongodb+srv://sajeewa:sajeewa1234@sajeewacluster.aabhgdf.mongodb.net/chat_app?retryWrites=true&w=majority"
// const MONGO_URL =process.env.MONGO_URI
 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    
    console.log(`MongoDB Connected💥`.cyan.underline);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;


