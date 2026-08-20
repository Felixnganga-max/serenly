import ContactSubmission from '../models/ContactSubmission.js'
import asyncHandler from '../middleware/asyncHandler.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STATUS_VALUES = ['new', 'read', 'replied', 'archived']

export const createSubmission = asyncHandler(async (req, res) => {
  const { name, email, phone, company, service, budget, message } = req.body || {}

  const errors = {}

  if (!name || !String(name).trim()) {
    errors.name = 'This field is required'
  }

  if (!email || !String(email).trim()) {
    errors.email = 'This field is required'
  } else if (!EMAIL_REGEX.test(String(email).trim())) {
    errors.email = 'The e-mail address entered is invalid'
  }

  if (!phone || !String(phone).trim()) {
    errors.phone = 'This field is required'
  }

  if (!message || !String(message).trim()) {
    errors.message = 'This field is required'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors })
  }

  const doc = await ContactSubmission.create({
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone).trim(),
    company: company ? String(company).trim() : '',
    service: service ? String(service).trim() : '',
    budget: budget ? String(budget).trim() : '',
    message: String(message).trim(),
  })

  res.status(201).json({ success: true, data: { id: doc._id } })
})

export const getSubmissions = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const { status } = req.query

  const filter = {}
  if (status && String(status).trim()) {
    filter.status = String(status).trim()
  }

  const [data, total] = await Promise.all([
    ContactSubmission.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    ContactSubmission.countDocuments(filter),
  ])

  res.status(200).json({
    success: true,
    data,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  })
})

export const getSubmission = asyncHandler(async (req, res) => {
  const doc = await ContactSubmission.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Submission not found' })
  }

  if (doc.status === 'new') {
    doc.status = 'read'
    await doc.save()
  }

  res.status(200).json({ success: true, data: doc })
})

export const updateSubmissionStatus = asyncHandler(async (req, res) => {
  const { status } = req.body || {}

  if (!STATUS_VALUES.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' })
  }

  const doc = await ContactSubmission.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Submission not found' })
  }

  doc.status = status
  await doc.save()

  res.status(200).json({ success: true, data: doc })
})

export const deleteSubmission = asyncHandler(async (req, res) => {
  const doc = await ContactSubmission.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Submission not found' })
  }

  await doc.deleteOne()

  res.status(200).json({ success: true, message: 'Submission deleted' })
})
