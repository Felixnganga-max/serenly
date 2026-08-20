import express from 'express'
import {
  createSubmission,
  getSubmissions,
  getSubmission,
  updateSubmissionStatus,
  deleteSubmission,
} from '../controllers/contact.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/', createSubmission)
router.get('/', protect, getSubmissions)
router.get('/:id', protect, getSubmission)
router.patch('/:id', protect, updateSubmissionStatus)
router.delete('/:id', protect, deleteSubmission)

export default router
