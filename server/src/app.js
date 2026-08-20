import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import contactRoutes from './routes/contact.routes.js'
import authRoutes from './routes/auth.routes.js'
import postsRoutes from './routes/posts.routes.js'
import uploadsRoutes from './routes/uploads.routes.js'
import projectRoutes from './routes/project.routes.js'
import statsRoutes from './routes/stats.routes.js'
import errorHandler, { notFound } from './middleware/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(
  cors({
    origin: (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim()),
    credentials: true,
  })
)
app.use(express.json())

app.get('/api/health', (req, res) =>
  res.json({ success: true, status: 'ok', time: new Date().toISOString() })
)

app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/uploads', uploadsRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/stats', statsRoutes)

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use(notFound)
app.use(errorHandler)

export default app
