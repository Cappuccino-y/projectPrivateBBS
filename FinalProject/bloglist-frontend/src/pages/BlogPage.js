import {useState} from "react";
import Togglable from "../components/Toggable";
import BlogForm from "../components/BlogForm";
import BlogShow from "../components/BlogShow";
import Notification from "../components/Notification";
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";

const BlogPage = ({user, logOut, addBlog, message, updateLikes, privateBlogs, blogs, deleteItem, blogFormRef}) => {
    const [isPrivate, setisPrivate] = useState(false)
    const [buttonColor, setButtonColor] = useState('white')
    const navigate = useNavigate()

    const sortedByLikes = () => {
        setButtonColor(buttonColor === 'white' ? '#00a7d0' : 'white');
    }


    return <div>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <div>
                    <h3>Blog</h3>
                    <span>{user.name} logged-in</span>
                    <button onClick={() => logOut(navigate)}>Sign out</button>
                    <Togglable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm
                            createBlog={addBlog}
                        />
                    </Togglable>
                    <br/>
                    <Notification message={message}/>

                </div>
            </Grid>
            <Grid item xs={8}>
                <div>
                    <button style={{marginRight: 10}} onClick={() => {
                        setisPrivate(false)
                    }}>
                        Public
                    </button>
                    <button style={{marginRight: 10}} onClick={() => {
                        setisPrivate(true)
                    }}>Private
                    </button>
                    <button onClick={sortedByLikes} style={{backgroundColor: buttonColor}}>Sorted</button>
                </div>

                <br/>
                <br/>
                <BlogShow isPrivate={isPrivate} buttonColor={buttonColor} privateBlogs={privateBlogs}
                          deleteItem={deleteItem} blogs={blogs} updateLikes={updateLikes}/>
            </Grid>
        </Grid>
    </div>
}
export default BlogPage