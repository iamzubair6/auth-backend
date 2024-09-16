const jwt = require('jsonwebtoken');

// Access environment variables
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_ACCESS_SECRET);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
