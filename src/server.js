require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
// app.use('/api', protectedRoutes);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
