import crypto from 'node:crypto'
import path from 'node:path'
import { put } from '@vercel/blob'
import asyncHandler from '../middleware/asyncHandler.js'

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided' })
  }

  const ext = path.extname(req.file.originalname) || '.jpg'
  const filename = `uploads/${crypto.randomUUID()}${ext}`

  const blob = await put(filename, req.file.buffer, {
    access: 'public',
    contentType: req.file.mimetype,
  })

  res.status(201).json({ success: true, data: { url: blob.url } })
})
