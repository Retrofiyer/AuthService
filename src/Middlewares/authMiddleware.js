const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const { authenticateUser } = require('../Models/authModel');

dotenv.config();

async function authMiddleware(req, res, next) {
    try {
        const { idVolunteer, ci } = req.body;

        if (!idVolunteer || !ci) {
            return res.status(400).json({ error: 'Missing idVolunteer or C.I.' });
        }

        const user = await authenticateUser(idVolunteer, ci);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isBlacklisted = async (tokenId) => {
            const result = await db.query('SELECT token_id FROM blacklisted_tokens WHERE token_id = ?', [tokenId]);
            return result.length > 0;
        };

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