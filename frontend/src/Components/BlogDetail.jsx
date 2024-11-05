import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const BlogDetail = () => {
    let {id} = useParams()
    const [blog, setblog] = useState({})

    async function fetchSpecificBlog() {
        try {
            let fetchSpecificBlogRes = await axios.get(`http://localhost:3000/api/blogs/read/blog/${id}`)
            setblog(fetchSpecificBlogRes.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchSpecificBlog()
    },[])

    return (
        <div className='w-full h-screen bg-zinc-900 text-white flex flex-col gap-6 items-center justify-center'>
            <Link className='text-blue-600' to={'/'}>Go to home</Link>
            <h1 className='text-2xl font-semibold '>This is read only</h1>
            <div className='w-fit h-fit px-3 py-2 bg-zinc-700'>
                <h1>{blog && blog.blogContent}</h1>
            </div>
        </div>
    )
}

export default BlogDetail