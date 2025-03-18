const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createID, hashPassword, generateToken } = require('../key/encrypt.js');


router.get('/', (req, res) => {
  res.json({ message: 'Auth route works!' });
});

router.post('/signup', (req, res) => {
  
});

router.post('/login', async (req, res) => {
  const { authentication, password } = req.body;

  try {
    const user = await prisma.user_query.findFirst({
      where: {
        OR: [
          { email: authentication },
          { info_identitas_id: authentication },
          { nomor_telepon: authentication },
          { username: authentication }
        ]
      },
      select: { id: true, role: true, password: true }
    });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Password salah' });
    }

    const token = generateToken({ 
      id: user.id, 
      role: user.role 
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === 'production',
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: 'Lax'
    });

    res.json({
      message: 'Login successful',
      token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/pendaftaran', (req, res) => {
  const { nim, nama, jurusan, tahun_angkatan } = req.body;
});

router.post('/signup-staff', async (req, res) => {
  const { 
    info_NIK,
    info_NIDN,
    info_Nama_lengkap,
    info_Jenis_kelamin,
    info_Alamat, 
    info_Agama, 
    info_Status_perkawinan, 
    info_Kewarganegaraan,
    enrollment_email, 
    enrollment_nomor_telepon, 
    enrollment_username, 
    enrollment_password, 
    enrollment_role 
  } = req.body;

  if (!info_NIK || !info_NIDN || !info_Nama_lengkap || !info_Jenis_kelamin || !info_Alamat 
      || !info_Agama || !info_Status_perkawinan || !info_Kewarganegaraan || !enrollment_email 
      || !enrollment_nomor_telepon || !enrollment_username || !enrollment_password || !enrollment_role) {
    return res.status(400).json({ message: 'Harap mengisi semua data' });
  }

  const user_ID = createID();
  const user_password = await hashPassword(enrollment_password);

  const user = await prisma.user_query.create({
    data: {
      id: user_ID,
      info_identitas_id: info_NIDN,
      email: enrollment_email,
      nomor_telepon: enrollment_nomor_telepon,
      username: enrollment_username,
      password: user_password,
      role: enrollment_role,
    }
  });
  
  const info_identitas = await prisma.info_identitas.create({
    data: {
      id: user_ID,
      infoNIK: info_NIK,
      infoNama_lengkap: info_Nama_lengkap,
      infoJenis_kelamin: info_Jenis_kelamin,
      infoAlamat: info_Alamat,
      infoAgama: info_Agama,
      infoStatus_perkawinan: info_Status_perkawinan,
      infoKewarganegaraan: info_Kewarganegaraan,
    }
  });  

  res.json({ message: 'User created successfully', user, info_identitas });
});

module.exports = router;