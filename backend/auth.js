import jwt from 'jsonwebtoken';
import { config } from './config.js';

export function createToken(payload) {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).send('Missing token');
  try {
    const token = auth.split(' ')[1];
    req.user = jwt.verify(token, config.JWT_SECRET);
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
}