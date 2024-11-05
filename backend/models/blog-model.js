const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    blogContent: String
})

module.exports = mongoose.model("blog",blogSchema)