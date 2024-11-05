import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPaperPlane } from "react-icons/fa6";

const Content = () => {
    const [blogContent, setBlogContent] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [isVisible, setIsVisible] = useState([]);

    async function fetchBlogs() {
        try {
            let fetchBlogsRes = await axios.get("https://share-blog-feature-in-mern-stack-backend.onrender.com/api/blogs/read", { withCredentials: true });
            setBlogs(fetchBlogsRes.data);
            // Set isVisible to an array of false with the same length as blogs
            setIsVisible(new Array(fetchBlogsRes.data.length).fill(false));
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    async function handleCreateBlog(e) {
        e.preventDefault();
        try {
            let createBlogRes = await axios.post("https://share-blog-feature-in-mern-stack-backend.onrender.com/api/blogs/create", { blogContent });
            if (createBlogRes.status === 201) {
                alert("Blog Created Successfully");
                fetchBlogs(); // Refresh the blog list after creation
            }
        } catch (error) {
            console.log(error.message);
        }
        setBlogContent('');
    }

    function handleVisibility(index) {
        let newIsVisible = [...isVisible];
        newIsVisible[index] = !newIsVisible[index];
        setIsVisible(newIsVisible);
    }

    function handleShareOnWhatsapp(blog) {
        const shareUrl = `https://share-blog-feature-in-mern-stack-frontend.onrender.com/blog/${blog._id}`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`, '_blank');
    }

    function handleShareOnFacebook(blog) {
        const shareUrl = `https://share-blog-feature-in-mern-stack-frontend.onrender.com/blog/${blog._id}`;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    }

    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            <h1 className='text-3xl font-semibold mb-5'>Create Blog</h1>
            <form onSubmit={handleCreateBlog}>
                <input
                    value={blogContent}
                    onChange={e => setBlogContent(e.target.value)}
                    name='blogContent'
                    className='w-[400px] bg-zinc-700 outline-none mr-4 px-3 py-2'
                    type="text"
                    placeholder='Write your blog'
                />
                <button type='submit' className='px-3 py-2 bg-blue-600 rounded-lg'>
                    Create
                </button>
            </form>

            <div className='mt-5 flex gap-4 flex-wrap'>
                {
                    blogs && blogs.map((blog, index) => (
                        <div key={blog._id} className='px-3 py-2 bg-zinc-700 w-fit'>
                            <h2>{blog.blogContent}</h2>
                            <button onClick={() => handleVisibility(index)} className='mt-3'>
                                <FaPaperPlane />
                            </button>
                            {
                                isVisible[index] && (
                                    <div className={`flex gap-5`}>
                                        <h2 onClick={() => handleShareOnWhatsapp(blog)} className='text-lg cursor-pointer font-semibold'>Share on WhatsApp</h2>
                                        <h2 onClick={() => handleShareOnFacebook(blog)} className='text-lg font-semibold cursor-pointer'>Share on Facebook</h2>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Content;
