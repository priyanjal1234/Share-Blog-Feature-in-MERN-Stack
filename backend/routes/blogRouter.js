const express = require('express')
const { createBlogController, getAllBlogsController, readOneBlogController } = require('../controllers/blogController')
const router = express.Router()

router.post("/create",createBlogController)

router.get("/read",getAllBlogsController)

router.get("/read/blog/:id",readOneBlogController)

module.exports = router