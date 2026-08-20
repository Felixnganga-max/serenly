import Project from '../models/Project.js'
import asyncHandler from '../middleware/asyncHandler.js'

const STATUS_VALUES = ['planning', 'in-progress', 'review', 'completed', 'on-hold']
const SERVICE_VALUES = ['web-dev', 'smm', 'branding', 'seo', 'other']

export const listProjects = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const { status } = req.query

  const filter = {}
  if (status && String(status).trim()) {
    filter.status = String(status).trim()
  }

  const [data, total] = await Promise.all([
    Project.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Project.countDocuments(filter),
  ])

  res.status(200).json({
    success: true,
    data,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  })
})

export const getProject = asyncHandler(async (req, res) => {
  const doc = await Project.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Project not found' })
  }

  res.status(200).json({ success: true, data: doc })
})

export const createProject = asyncHandler(async (req, res) => {
  const { name, client, service, status, startDate, dueDate, budget, notes } = req.body || {}

  const errors = {}
  if (!name || !String(name).trim()) errors.name = 'This field is required'
  if (!client || !String(client).trim()) errors.client = 'This field is required'

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors })
  }

  const doc = await Project.create({
    name: String(name).trim(),
    client: String(client).trim(),
    service: SERVICE_VALUES.includes(service) ? service : 'other',
    status: STATUS_VALUES.includes(status) ? status : 'planning',
    startDate: startDate || undefined,
    dueDate: dueDate || undefined,
    budget: budget ? String(budget).trim() : '',
    notes: notes ? String(notes).trim() : '',
  })

  res.status(201).json({ success: true, data: doc })
})

export const updateProject = asyncHandler(async (req, res) => {
  const doc = await Project.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Project not found' })
  }

  const { name, client, service, status, startDate, dueDate, budget, notes } = req.body || {}

  if (name !== undefined) doc.name = String(name).trim()
  if (client !== undefined) doc.client = String(client).trim()
  if (service !== undefined && SERVICE_VALUES.includes(service)) doc.service = service
  if (status !== undefined && STATUS_VALUES.includes(status)) doc.status = status
  if (startDate !== undefined) doc.startDate = startDate || undefined
  if (dueDate !== undefined) doc.dueDate = dueDate || undefined
  if (budget !== undefined) doc.budget = String(budget).trim()
  if (notes !== undefined) doc.notes = String(notes).trim()

  await doc.save()

  res.status(200).json({ success: true, data: doc })
})

export const deleteProject = asyncHandler(async (req, res) => {
  const doc = await Project.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Project not found' })
  }

  await doc.deleteOne()

  res.status(200).json({ success: true, message: 'Project deleted' })
})
