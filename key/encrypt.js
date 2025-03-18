const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const createID = () => {
    return `${crypto.randomUUID()}-${Date.now()}`;
};

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { hashPassword, comparePassword, createID, generateToken, verifyToken };