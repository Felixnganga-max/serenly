import mongoose from 'mongoose'

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: '' },
    service: { type: String, trim: true, default: '' },
    budget: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
)

export default mongoose.model('ContactSubmission', contactSubmissionSchema)
