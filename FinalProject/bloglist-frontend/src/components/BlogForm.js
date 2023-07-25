import {useState} from 'react'
import {Box, Typography, TextField, Button} from "@mui/material";
import {Grid} from "@mui/material";
import MDEditor from '@uiw/react-md-editor';
import customImageCommand from "../customImageCommand";


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
            <MDEditor
                value={newBlog.content}
                onChange={content => setNewBlog({...newBlog, content})}
                height='50vh'
                commandsFilter={(command, isExtra) => {
                    if (command.name === 'image') {
                        // Replace the image command with your custom command
                        return customImageCommand;
                    }
                    // Return the command unchanged if it's not the image command
                    return command;
                }}
                // style={{backgroundColor: 'transparent'}}
            />
            <TextField label="Tag" fullWidth margin="normal" value={newBlog.tag}
                       onChange={handleBlogTagChange} size='small'/>
            <Button variant="contained" type="submit">save</Button>

        </form>
    </Box>
}
export default BlogForm