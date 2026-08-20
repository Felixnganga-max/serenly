import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import connectDB from '../config/db.js'
import AdminUser from '../models/AdminUser.js'

const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = process.env

async function run() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error(
      'ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment to seed an admin user.'
    )
    process.exit(1)
  }

  await connectDB()

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10)

  await AdminUser.findOneAndUpdate(
    { email: ADMIN_EMAIL.toLowerCase().trim() },
    {
      email: ADMIN_EMAIL.toLowerCase().trim(),
      passwordHash,
      name: ADMIN_NAME || 'Admin',
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )

  console.log(`Admin user seeded successfully for ${ADMIN_EMAIL}`)

  await mongoose.connection.close()
  process.exit(0)
}

run()
