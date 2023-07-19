import {useEffect, useState} from "react";
import Togglable from "../components/Toggable";
import BlogForm from "../components/BlogForm";
import BlogShow from "../components/BlogShow";
import Notification from "../components/Notification";
import {useNavigate} from "react-router-dom";
import {Grid, Typography, Button, Box, Divider,} from '@mui/material';
import {Select, MenuItem, TextField, IconButton, FormControl, OutlinedInput} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import blogService from "../services/blogs";
import {useTheme} from '@mui/material/styles';
import {useMediaQuery} from '@mui/material'


const BlogPage = ({user, message, blogFormRef, setUser, notice}) => {

// In your component
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// Modify your Grid structure

    const [blogs, setBlogs] = useState([])

    const [isPrivate, setisPrivate] = useState(false)
    const [buttonColor, setButtonColor] = useState('grey')
    const [searchOption, setSearchOption] = useState('title');
    const [searchText, setSearchText] = useState('');
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const navigate = useNavigate()

    const sortedByLikes = () => {
        setButtonColor(buttonColor === 'grey' ? '#00a7d0' : 'grey');
    }
    const blogsShow = blogs.filter(blog => blog[searchOption].toLowerCase().includes(searchText.toLowerCase()))
    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const newValue = blogObject
        blogService.create(newValue).then(response => {
            setBlogs([response, ...blogs])
            notice("Blog add success", 'success')
        }).catch(error => {
            notice(`Blog add failed`, 'error')
            console.log(error)
        })
    }

    const logOut = (navigate) => {
        if (window.confirm("Ready to sign out?")) {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
            navigate("/home")
        }
    }

    const updateBlog = async (blog) => {
        try {
            const updatedBlog = await blogService.update(blog.id, blog)
            setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
        } catch (error) {
            notice('Update failed', 'error')
        }
    }
    const deleteItem = (id, pagination) => {
        const target = blogs.find(blog => blog.id === id)
        if (window.confirm(`Delete this blog?`)) {
            const delItem = async () => {
                try {

                    await blogService.del(id)
                    if ((blogs.length - 1) % pagination.postsPerPage === 0 && (blogs.length - 1) / pagination.postsPerPage === pagination.page - 1) {
                        pagination.setPage(pagination.page - 1)
                    }
                    setBlogs(blogs.filter(blog => blog.id !== id))
                    notice('Delete success', 'success')
                } catch (error) {
                    notice('Delete failed', 'error')
                }
            }
            delItem()
        }
    }

    useEffect(() => {
        const initial = async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                blogService.setToken(user.token)
                setUser(user)
            }
        }
        initial()
    }, [])
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await blogService.getAll()
                setBlogs(res.reverse())
            } catch {
                if (user) {
                    window.confirm('expired logging')
                    navigate("/login")
                    setUser(null)
                }
            }
        }

        fetchBlogs()
        setIsLoadingUser(false)
    }, [user])


    if (isLoadingUser) {
        return <div>Loading...</div>;
    }
    return <Grid container spacing={2} sx={{minHeight: '94vh'}}>
        <Grid item md={4.5} xs={12}>
            <Box display="flex" flexDirection="column" justifyContent="space-between" p={2}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Blog
                    </Typography>
                    <Typography variant="h5" fontFamily="Comic Sans MS, cursive, sans-serif">
                        {user.name} logged in
                    </Typography>
                </Box>
                <Box marginTop='20px'>
                    <Button variant="outlined" startIcon={<ExitToAppIcon/>} onClick={() => logOut(navigate)}>
                        Sign out
                    </Button>
                    <Divider sx={{my: 2}} style={{marginBottom: '0px'}}/>
                    <Togglable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm createBlog={addBlog}/>
                    </Togglable>
                </Box>
                <Notification message={message}/>
            </Box>
        </Grid>
        <Grid item md={7.5} xs={12}>
            <Box my={2} sx={{display: 'flex', alignItems: 'center'}}>
                <Button style={{
                    marginRight: 10,
                }}
                        variant="outlined"
                        onClick={() => setisPrivate(false)}>
                    Public
                </Button>
                <Button style={{marginRight: 10}} variant="outlined" onClick={() => setisPrivate(true)}>
                    Private
                </Button>
                <Button variant="contained" onClick={sortedByLikes}
                        style={{backgroundColor: buttonColor, marginRight: 10}}>
                    Sorted
                </Button>
                <Select
                    value={searchOption}
                    onChange={event => {
                        setSearchOption(event.target.value)
                    }}
                    sx={{minWidth: 80, marginLeft: 12, cursor: "url('/mouse-pointer.png'), auto"}}
                    size='small'
                >
                    <MenuItem value={'title'}>Title</MenuItem>
                    <MenuItem value={'tag'}>Tag</MenuItem>
                </Select>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    onChange={event => {
                        setSearchText(event.target.value)
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon/>
                            </IconButton>
                        ),
                    }}
                    sx={{marginLeft: 0, height: 1}} size='small'
                />
            </Box>
            <BlogShow isPrivate={isPrivate} buttonColor={buttonColor} stateListen={blogs}
                      deleteItem={deleteItem} blogs={blogsShow} updateBlog={updateBlog} user={user}/>
        </Grid>
    </Grid>
}
export default BlogPage