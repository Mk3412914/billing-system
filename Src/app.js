const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const usageRoutes = require('./Component/routes/usageRoutes.js');
const userRoutes = require('./Component/routes/userRoutes.js');

dotenv.config();

app.use(cors());

app.use(express.json());


app.use('/', usageRoutes);
app.use('/', userRoutes);

module.exports = app;