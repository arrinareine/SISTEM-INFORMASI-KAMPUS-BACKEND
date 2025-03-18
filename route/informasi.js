const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (io) => {
  const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
      req.user = decoded;
      next();
    });
  };

  router.get('/fakultas', verifyToken, async (req, res) => {
    try {
      const fakultas = await prisma.informasi_fakultas.findMany();
      res.json({ notif: true, data: fakultas });
    } catch (error) {
      console.error('Error fetching fakultas:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.post('/fakultas', verifyToken, async (req, res) => {
    try {
      const { nama_fakultas, kode_dikti, kode_universitas, kode_fakultas, tanggal_pendirian, data_kelompok } = req.body;

      const fakultas = await prisma.informasi_fakultas.create({
        data: {
          nama_fakultas, 
          kode_dikti, 
          kode_universitas, 
          kode_fakultas, 
          tanggal_pendirian, 
          kelompok_fakultas: data_kelompok
        }
      });

      const updatedFakultas = await prisma.informasi_fakultas.findMany();
      io.emit('updateFakultas', updatedFakultas);

      res.json({ message: 'Fakultas berhasil ditambahkan!', fakultas });
    } catch (error) {
      console.error('Error creating fakultas:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.put('/fakultas/:id_fakultas', verifyToken, async (req, res) => {
    try {
        const { id_fakultas } = req.params;
        const { nama_fakultas, kode_dikti, kode_universitas, kode_fakultas, tanggal_pendirian, data_kelompok } = req.body;
        const existingFakultas = await prisma.informasi_fakultas.findUnique({
            where: { id_fakultas }
        });

        if (!existingFakultas) {
            return res.status(404).json({ message: 'Fakultas tidak ditemukan!' });
        }

        const updated = await prisma.informasi_fakultas.update({
            where: { id_fakultas },
            data: {
                nama_fakultas,
                kode_dikti,
                kode_universitas,
                kode_fakultas,
                tanggal_pendirian,
                kelompok_fakultas: data_kelompok
            }
        });

        if (!updated) {
            return res.status(400).json({ message: 'Gagal mengupdate fakultas!' });
        }

        res.json({ message: 'Fakultas berhasil diubah!', updated });

    } catch (error) {
        console.error('Error updating fakultas:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  return router;
};
