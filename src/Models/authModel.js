const db = require('../DB/connection');

async function authenticateUser(idVolunteer, ci) {
    try {
        const query = 'SELECT idVolunteer, Role FROM user WHERE idVolunteer = ? AND C.I = ?';
        const rows = await db.query(query, [idVolunteer, ci]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error authenticating user:', error);
        throw new Error('Database query failed');
    }
}

module.exports = { authenticateUser };