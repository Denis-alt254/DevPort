const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
connectDB();
PORT = 5000;
app.use(express.json());

app.listen(process.env.PORT|| PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`);
});