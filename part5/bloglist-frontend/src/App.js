import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggable";

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [blogsShow, setblogsShow] = useState([])
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errormessage, setErrorMessage] = useState(null)

    const handleBlogTitleChange = (event) => {
        setNewBlog({...newBlog, title: event.target.value})
    }
    const handleBlogAuthorChange = (event) => {
        setNewBlog({...newBlog, author: event.target.value})
    }
    const handleBlogUrlChange = (event) => {
        setNewBlog({...newBlog, url: event.target.value})
    }
    const addBlog = (event) => {
        event.preventDefault()
        const newValue = {title: newBlog.title, author: newBlog.author, url: newBlog.url}
        blogService.create(newValue).then(response => setBlogs(blogs.concat(response))).catch(error => {
            setErrorMessage(
                `Blog add failed.`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        })
        setNewBlog({title: '', author: '', url: ''})
    }


    useEffect(() => {
        blogService.getAll().then(blogs => {
                setBlogs(blogs)
                const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
                if (loggedUserJSON) {
                    const user = JSON.parse(loggedUserJSON)
                    setUser(user)
                    setblogsShow(blogs.filter(blog => blog.user.username === user.username))
                    console.log('heeloo')
                    blogService.setToken(user.token)
                }
            }
        )

    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)

            setblogsShow(blogs.filter(blog => blog.user.username === user.username))

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    const handleCancelAccount = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)

            setblogsShow(blogs.filter(blog => blog.user.username === user.username))

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    const logOut = () => {
        if (window.confirm("Ready to sign out?")) {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
        }
    }
    const setToPrivate = () => {
        setblogsShow(blogs.filter(blog => blog.user.username === user.username))
    }
    const setToPublic = () => {
        setblogsShow([...blogs])
    }
    return (
        <div>
            {user === null ?
                <div>
                    <Togglable buttonLabel='Log in'>
                        <div>
                            <h3>Login Interface</h3>
                            <Notification message={errormessage}/>
                            <LoginForm
                                handleLogin={handleLogin}
                                username={username}
                                password={password}
                                setUsername={setUsername}
                                setPassword={setPassword}
                            />
                        </div>
                    </Togglable>
                    <Togglable buttonLabel='Sign up'>
                        <div>
                            <h3>Sign up interface</h3>
                            <Notification message={errormessage}/>
                            <LoginForm
                                handleLogin={handleLogin}
                                username={username}
                                password={password}
                                setUsername={setUsername}
                                setPassword={setPassword}
                            />
                        </div>
                    </Togglable>
                    <Togglable buttonLabel='Cancel account'>
                        <div>
                            <h3>Delete account</h3>
                            <Notification message={errormessage}/>
                            <LoginForm
                                handleLogin={handleCancelAccount}
                                username={username}
                                password={password}
                                setUsername={setUsername}
                                setPassword={setPassword}
                            />
                        </div>
                    </Togglable>
                </div>
                :
                <div>
                    <h3>Blog</h3>
                    <p>{user.name} logged-in <button onClick={logOut}>Sign out</button>
                    </p>
                    <h3>Create</h3>
                    <Togglable buttonLabel='new blog'>
                        <BlogForm
                            newBlog={newBlog}
                            handleBlogTitleChange={handleBlogTitleChange}
                            handleBlogAuthorChange={handleBlogAuthorChange}
                            handleBlogUrlChange={handleBlogUrlChange}
                            addBlog={addBlog}
                        />
                    </Togglable>
                    <br/>
                    <button onClick={setToPrivate}>Private</button>
                    <button onClick={setToPublic}>Public</button>

                    <br/>
                    <br/>
                    {blogsShow.map(blog =>
                        <Blog key={blog.id} blog={blog}/>)}
                </div>
            }

        </div>
    )
}

export default App