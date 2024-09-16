const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenUtils');

const prismaClient = new PrismaClient();

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await prismaClient.user.findUnique({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await prismaClient.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find the user by username
        const user = await prismaClient.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate tokens
        const accessToken = generateAccessToken({ username: user.username });
        const refreshToken = generateRefreshToken({ username: user.username });

        res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    // Validate input
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token not provided' });
    }

    try {
        // Verify and decode the refresh token
        const decodedUser = verifyRefreshToken(refreshToken);
        if (!decodedUser) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }

        // Generate new tokens
        const newAccessToken = generateAccessToken({ username: decodedUser.username });
        const newRefreshToken = generateRefreshToken({ username: decodedUser.username }); // Optionally rotate refresh token

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken, // Optional: Rotate refresh token
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshToken,
};
