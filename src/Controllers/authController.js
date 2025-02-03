// Auth Controller to validate login
function loginController(req, res) {
  const { token, role } = req.authData;
  res.status(200).json({ message: 'Login successful', token, role });
}

module.exports = { loginController };