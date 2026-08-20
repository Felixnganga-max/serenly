import express from 'express'
import {
  listPublished,
  getPublishedBySlug,
  listAllAdmin,
  getByIdAdmin,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/posts.controller.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/admin', protect, listAllAdmin)
router.get('/admin/:id', protect, getByIdAdmin)
router.post('/', protect, createPost)
router.put('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)
router.get('/', listPublished)
router.get('/:slug', getPublishedBySlug)

export default router
