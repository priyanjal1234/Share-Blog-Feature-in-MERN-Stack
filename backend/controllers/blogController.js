const blogModel = require("../models/blog-model");

module.exports.createBlogController = async function (req, res) {
  let { blogContent } = req.body;
  try {
    let blog = await blogModel.create({
      blogContent,
    });
  
      res.status(201).json({ message: "Blog created successfully" });
    
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.getAllBlogsController = async function (req, res) {
  try {
    let blogs = await blogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

module.exports.readOneBlogController = async function (req, res) {
  try {
    let blog = await blogModel.findOne({ _id: req.params.id });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found for this id" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
