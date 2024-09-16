const { verifyAccessToken } = require("../utils/tokenUtils");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    try {
        const user = verifyAccessToken(token);
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
};

module.exports = authenticateToken;
