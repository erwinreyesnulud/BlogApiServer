const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

// Add comment to a post
router.post("/:postId", authMiddleware, addComment);

// Get all comments for a post
router.get("/:postId", getComments);

// Delete a comment (owner or admin)
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;