import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    service: {
      type: String,
      enum: ['web-dev', 'smm', 'branding', 'seo', 'other'],
      default: 'other',
    },
    status: {
      type: String,
      enum: ['planning', 'in-progress', 'review', 'completed', 'on-hold'],
      default: 'planning',
    },
    startDate: Date,
    dueDate: Date,
    budget: { type: String, trim: true, default: '' },
    notes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)
