import {useState} from "react";
import Togglable from "../components/Toggable";
import BlogForm from "../components/BlogForm";
import BlogShow from "../components/BlogShow";
import Notification from "../components/Notification";
import {useNavigate} from "react-router-dom";
import {Grid, Typography, Button, Box, Divider} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const BlogPage = ({user, logOut, addBlog, message, updateLikes, privateBlogs, blogs, deleteItem, blogFormRef}) => {
    const [isPrivate, setisPrivate] = useState(false)
    const [buttonColor, setButtonColor] = useState('grey')
    const navigate = useNavigate()

    const sortedByLikes = () => {
        setButtonColor(buttonColor === 'grey' ? '#00a7d0' : 'grey');
    }


    return <Grid container spacing={2} sx={{minHeight: '96vh'}}>
        <Grid item xs={4}>
            <Box display="flex" flexDirection="column" justifyContent="space-between" height="22vh" p={2}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Blog
                    </Typography>
                    <Typography variant="h5" fontFamily="Comic Sans MS, cursive, sans-serif">
                        {user.name} logged in
                    </Typography>
                </Box>
                <Box height='80vh' marginTop='20px'>
                    <Button variant="outlined" startIcon={<ExitToAppIcon/>} onClick={() => logOut(navigate)}>
                        Sign out
                    </Button>
                    <Divider sx={{my: 2}}/>
                    <Togglable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm createBlog={addBlog}/>
                    </Togglable>
                </Box>
                <Notification message={message}/>
            </Box>
        </Grid>
        <Grid item xs={8}>
            <Box my={2}>
                <Button style={{marginRight: 10}} variant="outlined" onClick={() => setisPrivate(false)}>
                    Public
                </Button>
                <Button style={{marginRight: 10}} variant="outlined" onClick={() => setisPrivate(true)}>
                    Private
                </Button>
                <Button variant="contained" onClick={sortedByLikes} style={{backgroundColor: buttonColor}}>
                    Sorted
                </Button>
            </Box>
            <BlogShow isPrivate={isPrivate} buttonColor={buttonColor} privateBlogs={privateBlogs}
                      deleteItem={deleteItem} blogs={blogs} updateLikes={updateLikes}/>
        </Grid>
    </Grid>
}
export default BlogPage