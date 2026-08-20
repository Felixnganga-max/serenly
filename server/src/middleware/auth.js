import jwt from 'jsonwebtoken'
import AdminUser from '../models/AdminUser.js'

export async function protect(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await AdminUser.findById(decoded.id).select('-passwordHash')

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Not authorized, admin not found' })
    }

    req.admin = admin
    next()
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' })
  }
}
