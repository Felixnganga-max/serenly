import mongoose from 'mongoose'

const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['paragraph', 'heading', 'image', 'quote'],
    required: true,
  },
  text: String,
  level: { type: Number, default: 2 },
  url: String,
  alt: String,
  caption: String,
})

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, trim: true, default: '' },
    coverImage: { type: String, trim: true, default: '' },
    content: [contentBlockSchema],
    category: { type: String, trim: true, default: 'General' },
    tags: [String],
    author: { type: String, trim: true, default: 'Serenly Team' },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    readTime: { type: Number, default: 3 },
    publishedAt: Date,
  },
  { timestamps: true }
)

export default mongoose.model('BlogPost', blogPostSchema)
