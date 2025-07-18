require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/userRoutes');
const routerP = require('./routes/projectRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
connectDB();
const PORT = process.env.PORT|| 5000;
app.use(express.json());

//Routes
app.use('/api/users', router);
app.use('/api/projects', routerP)

//errorHandler
app.use(errorHandler);

app.listen(PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`);
});