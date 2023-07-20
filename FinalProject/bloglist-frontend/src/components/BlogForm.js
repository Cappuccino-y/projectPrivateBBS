import {useState} from 'react'
import {Box, Typography, TextField, Button} from "@mui/material";
import SimpleMDE from "react-simplemde-editor";
import {Grid} from "@mui/material";

const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState({title: '', content: '', tag: ''})
    const addBlog = (event) => {
        event.preventDefault()
        createBlog({...newBlog})
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

    return <Box my={2} style={{marginTop: '0px'}}>
        {/*<Typography variant="h5" component="h2" gutterBottom>*/}
        {/*    Create*/}
        {/*</Typography>*/}
        <form onSubmit={addBlog}>
            <TextField label="Title" fullWidth margin="normal" size='small' value={newBlog.title}
                       onChange={handleBlogTitleChange}/>
            <SimpleMDE
                value={newBlog.content}
                onChange={content => setNewBlog({...newBlog, content})}
                options={{autoDownloadFontAwesome: false}}
            />
            <TextField label="Tag" fullWidth margin="normal" value={newBlog.tag}
                       onChange={handleBlogTagChange} size='small'/>
            <Button variant="contained" type="submit">save</Button>

        </form>
    </Box>
}
export default BlogForm