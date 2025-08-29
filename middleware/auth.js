const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.protect = async (req, res, next) => {
let token = null;
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
token = req.headers.authorization.split(' ')[1];
}
if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select('-password');
next();
} catch (err) {
return res.status(401).json({ message: 'Token invalid' });
}
};


exports.admin = (req, res, next) => {
if (!req.user) return res.status(401).json({ message: 'Not authorized' });
if (req.user.role !== 'admin') return res.status(403).json({ message: 'Require admin role' });
next();
};