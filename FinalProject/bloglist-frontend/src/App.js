import {useState, useEffect, useRef} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginPage from './pages/LoginPage'
import BlogPage from './pages/BlogPage'
import HomePage from './pages/HomePage'
import FooterLink from "./components/FootLink";
import {Container} from '@mui/material'
import {
    BrowserRouter as Router,
    Routes, Route, Link, Navigate, useNavigate
} from "react-router-dom"


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({content: '', sign: ''})
    const blogFormRef = useRef()
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    let privateBlogs = null

    const notice = (content, sign) => {
        setMessage(
            {content: content, sign: sign}
        )
        setTimeout(() => {
            setMessage({content: '', sign: ''})
        }, 3000)
    }

    useEffect(() => {
        const initial = async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                blogService.setToken(user.token)
                setUser(user)
            }
            try {
                const res = await blogService.getAll()
                setBlogs(res)
            } catch {
                if (user) {
                    window.confirm('expired logging')
                    setUser(null)
                }
            }
        }
        initial()
        setIsLoadingUser(false)
    }, [])
    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const newValue = blogObject
        blogService.create(newValue).then(response => {
            setBlogs(blogs.concat(response))
        }).catch(error => {
            notice(`Blog add failed`, 'error')
        })
    }

    const handleLogin = async (username, password, navigate) => {
        try {
            const user = await loginService.login({
                username, password,
            })
            notice("Successful login in", 'success')
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setBlogs(await blogService.getAll())
            setUser(user)
            navigate('/blogs')
        } catch (exception) {
            notice('Wrong username or password', 'error')
        }
    }
    const logOut = (navigate) => {
        if (window.confirm("Ready to sign out?")) {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
            navigate("/home")
        }
    }

    const updateLikes = async (blog) => {
        if (!blog.likes) blog.likes = 1
        else blog.likes += 1
        try {
            const updatedBlog = await blogService.update(blog.id, blog)
            setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
        } catch (error) {
            notice('Update failed', 'error')
        }
    }
    const deleteItem = (id) => {
        const target = blogs.find(blog => blog.id === id)
        if (window.confirm(`Delete this blog?`)) {
            const delItem = async () => {
                try {
                    await blogService.del(id)
                    setBlogs(blogs.filter(blog => blog.id !== id))

                } catch (error) {
                    notice('Delete failed', error)
                }
            }
            delItem()
        }
    }

    if (user) privateBlogs = blogs.filter(blog => blog.user.username === user.username)

    if (isLoadingUser) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Container>
                <Router>
                    <Routes>
                        <Route path="" element={<Navigate to={'/home'}/>}/>
                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage handleLogin={handleLogin}
                                                                 message={message} setMessage={setMessage}/>}/>
                        <Route path="/blogs"
                               element={<BlogPage privateBlogs={privateBlogs} deleteItem={deleteItem} blogs={blogs}
                                                  updateLikes={updateLikes} user={user} message={message}
                                                  addBlog={addBlog} logOut={logOut} blogFormRef={blogFormRef}/>}/>
                    </Routes>
                </Router>
            </Container>
            <FooterLink/>
        </div>
    )
}

export default App




