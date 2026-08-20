import asyncHandler from '../middleware/asyncHandler.js'

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided' })
  }

  res.status(201).json({ success: true, data: { url: '/uploads/' + req.file.filename } })
})
