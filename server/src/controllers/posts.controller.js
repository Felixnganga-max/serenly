import BlogPost from '../models/BlogPost.js'
import asyncHandler from '../middleware/asyncHandler.js'
import slugify from '../utils/slugify.js'

async function generateUniqueSlug(base, currentId) {
  let candidate = base
  let suffix = 2

  while (
    await BlogPost.exists({
      slug: candidate,
      _id: { $ne: currentId ?? null },
    })
  ) {
    candidate = `${base}-${suffix}`
    suffix += 1
  }

  return candidate
}

export const listPublished = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 12
  const { category, tag } = req.query

  const filter = { status: 'published' }
  if (category && String(category).trim()) {
    filter.category = String(category).trim()
  }
  if (tag && String(tag).trim()) {
    filter.tags = String(tag).trim()
  }

  const [data, total] = await Promise.all([
    BlogPost.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    BlogPost.countDocuments(filter),
  ])

  res.status(200).json({
    success: true,
    data,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  })
})

export const getPublishedBySlug = asyncHandler(async (req, res) => {
  const doc = await BlogPost.findOne({ slug: req.params.slug, status: 'published' })

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Post not found' })
  }

  res.status(200).json({ success: true, data: doc })
})

export const listAllAdmin = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 12
  const { status } = req.query

  const filter = {}
  if (status && String(status).trim()) {
    filter.status = String(status).trim()
  }

  const [data, total] = await Promise.all([
    BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    BlogPost.countDocuments(filter),
  ])

  res.status(200).json({
    success: true,
    data,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  })
})

export const getByIdAdmin = asyncHandler(async (req, res) => {
  const doc = await BlogPost.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Post not found' })
  }

  res.status(200).json({ success: true, data: doc })
})

export const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    excerpt,
    coverImage,
    content,
    category,
    tags,
    author,
    status,
    readTime,
    slug,
  } = req.body || {}

  if (!title || !String(title).trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: { title: 'This field is required' },
    })
  }

  const baseSlug = slugify(slug ? String(slug) : String(title))
  const uniqueSlug = await generateUniqueSlug(baseSlug)

  const doc = await BlogPost.create({
    title: String(title).trim(),
    slug: uniqueSlug,
    excerpt: excerpt ? String(excerpt).trim() : '',
    coverImage: coverImage ? String(coverImage).trim() : '',
    content: content ?? [],
    category: category ? String(category).trim() : 'General',
    tags: tags ?? [],
    author: author ? String(author).trim() : 'Serenly Team',
    status: status === 'published' ? 'published' : 'draft',
    readTime: readTime ?? 3,
    publishedAt: status === 'published' ? new Date() : undefined,
  })

  res.status(201).json({ success: true, data: doc })
})

export const updatePost = asyncHandler(async (req, res) => {
  const doc = await BlogPost.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Post not found' })
  }

  const {
    title,
    excerpt,
    coverImage,
    content,
    category,
    tags,
    author,
    status,
    readTime,
    slug,
  } = req.body || {}

  if (slug !== undefined || title !== undefined) {
    const desiredBase = slugify(slug !== undefined ? String(slug) : String(title))

    if (desiredBase && desiredBase !== doc.slug) {
      doc.slug = await generateUniqueSlug(desiredBase, doc._id)
    }
  }

  if (title !== undefined) doc.title = String(title).trim()
  if (excerpt !== undefined) doc.excerpt = String(excerpt).trim()
  if (coverImage !== undefined) doc.coverImage = String(coverImage).trim()
  if (content !== undefined) doc.content = content
  if (category !== undefined) doc.category = String(category).trim()
  if (tags !== undefined) doc.tags = tags
  if (author !== undefined) doc.author = String(author).trim()
  if (readTime !== undefined) doc.readTime = readTime

  if (status !== undefined) {
    if (status === 'published' && !doc.publishedAt) {
      doc.publishedAt = new Date()
    }
    doc.status = status
  }

  await doc.save()

  res.status(200).json({ success: true, data: doc })
})

export const deletePost = asyncHandler(async (req, res) => {
  const doc = await BlogPost.findById(req.params.id)

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Post not found' })
  }

  await doc.deleteOne()

  res.status(200).json({ success: true, message: 'Post deleted' })
})
