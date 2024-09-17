require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
}));
app.use(bodyParser.json());

//allow orifgin

// Routes
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
}
);
// app.use('/api', protectedRoutes);

// Start server
app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
