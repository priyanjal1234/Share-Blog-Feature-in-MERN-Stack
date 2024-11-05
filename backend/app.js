const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

// Database Connection
const db = require('./config/db')
db()

// Routes
const blogRouter = require('./routes/blogRouter')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: 'https://share-blog-feature-in-mern-stack-frontend.onrender.com',
    credentials: true
}))

app.use("/api/blogs",blogRouter)


const PORT = process.env.PORT || 4000
app.listen(PORT,function() {
    console.log(`Server is running on port ${PORT}`)
})
