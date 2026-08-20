import AdminUser from '../models/AdminUser.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from '../middleware/asyncHandler.js'

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  const admin = await AdminUser.findOne({ email: String(email).toLowerCase() })

  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }

  const isMatch = await admin.comparePassword(password)

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }

  res.status(200).json({
    success: true,
    token: generateToken(admin._id),
    admin: { id: admin._id, email: admin.email, name: admin.name },
  })
})

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    admin: { id: req.admin._id, email: req.admin.email, name: req.admin.name },
  })
})
