import {useState} from 'react'

const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({title: newBlog.title, author: newBlog.author, url: newBlog.url})
        setNewBlog({title: '', author: '', url: ''})
    }
    const handleBlogTitleChange = (event) => {
        setNewBlog({...newBlog, title: event.target.value})
    }
    const handleBlogAuthorChange = (event) => {
        setNewBlog({...newBlog, author: event.target.value})
    }
    const handleBlogUrlChange = (event) => {
        setNewBlog({...newBlog, url: event.target.value})
    }

    return <div>
        <h3> create</h3>
        <form onSubmit={addBlog}>
            tilte:<input
            value={newBlog.title}
            onChange={handleBlogTitleChange}
        />
            <br/>
            author:<input
            value={newBlog.author}
            onChange={handleBlogAuthorChange}
        />
            <br/>
            url:<input
            value={newBlog.url}
            onChange={handleBlogUrlChange}
        />
            <br/>
            <button type="submit">save</button>
        </form>
    </div>
}
export default BlogForm