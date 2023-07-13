import {useState} from 'react'
import {Box, Typography, TextField, Button} from "@mui/material";

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

    return <Box my={2}>
        <Typography variant="h5" component="h2" gutterBottom>
            Create
        </Typography>
        <form onSubmit={addBlog}>
            <TextField label="Title" fullWidth margin="normal" value={newBlog.title} onChange={handleBlogTitleChange}/>
            <TextField label="Author" fullWidth margin="normal" value={newBlog.author}
                       onChange={handleBlogAuthorChange}/>
            <TextField label="Url" fullWidth margin="normal" value={newBlog.url} onChange={handleBlogUrlChange}/>
            <Button variant="contained" type="submit">save</Button>
        </form>
    </Box>
}
export default BlogForm