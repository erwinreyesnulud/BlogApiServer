const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

// Get all posts
router.get('/', getPosts);

// Get a single post by ID
router.get('/:id', getPost);

// Create a new post (authenticated users only)
router.post('/', authMiddleware, createPost);

// Update a post (authenticated users only, typically only the author)
router.patch('/:id', authMiddleware, updatePost);

// Delete a post (authenticated users only, typically only the author or admin)
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;