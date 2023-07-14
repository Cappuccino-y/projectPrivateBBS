import {useState} from 'react'
import {Box, Typography, TextField, Button} from "@mui/material";

const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState({title: '', content: '', tag: ''})
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({title: newBlog.title, content: newBlog.content, tag: newBlog.tag})
        setNewBlog({title: '', content: '', tag: ''})
    }
    const handleBlogTitleChange = (event) => {
        setNewBlog({...newBlog, title: event.target.value})
    }
    const handleBlogContentChange = (event) => {
        setNewBlog({...newBlog, content: event.target.value})
    }
    const handleBlogTagChange = (event) => {
        setNewBlog({...newBlog, tag: event.target.value})
    }

    return <Box my={2}>
        <Typography variant="h5" component="h2" gutterBottom>
            Create
        </Typography>
        <form onSubmit={addBlog}>
            <TextField label="Title" fullWidth margin="normal" value={newBlog.title} onChange={handleBlogTitleChange}/>
            <TextField label="Content" fullWidth margin="normal" value={newBlog.content}
                       onChange={handleBlogContentChange}/>
            <TextField label="Tag" fullWidth margin="normal" value={newBlog.tag} onChange={handleBlogTagChange}/>
            <Button variant="contained" type="submit">save</Button>
        </form>
    </Box>
}
export default BlogForm