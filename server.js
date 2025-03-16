require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const authRoutes = require('./route/auth.js');
const informasiRoutes = require('./route/informasi.js');
app.use(cookieParser());

//Middleware
app.use('/auth', authRoutes);
app.use('/informasi', informasiRoutes);

app.use('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
