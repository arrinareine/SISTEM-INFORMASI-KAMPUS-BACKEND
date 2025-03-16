const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/fakultas', (req, res) => {
    res.json({ message: 'Fakultas route works!' });
});

module.exports = router;