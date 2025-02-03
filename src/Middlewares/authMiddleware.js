const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const { authenticateUser } = require('../Models/authModel');

dotenv.config();

async function authMiddleware(req, res, next) {
    try {
        const { idVolunteer, ci } = req.body;

        if (!/^\d{10}$/.test(ci)) {
            return res.status(400).json({ error: "The ID must have 10 digits" });
          }

        if (!idVolunteer || !ci) {
            return res.status(400).json({ error: 'Missing idVolunteer or C.I.' });
        }

        const user = await authenticateUser(idVolunteer, ci);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { idVolunteer: user.idVolunteer, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        req.authData = { token, role: user.Role };
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        next(error);
    }
}

module.exports = { authMiddleware };