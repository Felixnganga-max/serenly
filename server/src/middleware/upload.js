import multer from 'multer'

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    const err = new Error('Only image uploads are allowed')
    err.statusCode = 400
    cb(err)
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 },
})

export default upload
