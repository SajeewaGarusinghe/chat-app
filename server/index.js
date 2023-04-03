const express = require('express');
const cors = require('cors');

const colors = require('colors');
const userRoutes = require('./routes/userRoutes');

const connectDB = require('./config/db');
const app = express();
// require('dotenv').config();
// console.log('port>>>', process.env.PORT);
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);

connectDB();



app.listen(port, () => console.log(`Server 💻 started on port ${port}`.red));
