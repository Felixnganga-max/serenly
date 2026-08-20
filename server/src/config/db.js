import mongoose from 'mongoose'

// Reuses the existing connection when the module is still warm (serverless
// containers keep this module cached between invocations), instead of
// opening a fresh connection on every request.
export default async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection

  const conn = await mongoose.connect(process.env.MONGO_URI)
  console.log(`MongoDB connected: ${conn.connection.host}`)
  return conn.connection
}
