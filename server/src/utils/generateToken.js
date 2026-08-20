import jwt from 'jsonwebtoken'

export default function generateToken(adminId) {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
