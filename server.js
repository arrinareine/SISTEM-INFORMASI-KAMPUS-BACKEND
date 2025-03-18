require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http'); 
const socketIo = require('socket.io'); 
const { PrismaClient } = require('@prisma/client');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const prisma = new PrismaClient(); // Prisma cukup dibuat sekali di sini
const authRoutes = require('./route/auth.js');
const informasiRoutes = require('./route/informasi.js')(io);

app.use('/auth', authRoutes);
app.use('/informasi', informasiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});