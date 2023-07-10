import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggable";

const FooterLink = () => {
    const footerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '20px',
        position: 'fixed', // Add this line
        width: '100%', // Add this line
        bottom: '0', // Add this line
    };
    const [linkColorICP, setLinkColorICP] = useState('#133');
    const [linkColorPolice, setLinkColorPolice] = useState('#133');

    const hoverColor = '#007bff';
    const linkStyle = {
        textDecoration: 'none',
        fontSize: '12px',
        margin: '0 10px'
    };

    return (
        <div style={footerStyle}>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602013040" target="_blank"
               style={{...linkStyle, color: linkColorPolice}} onMouseOver={() => {
                setLinkColorPolice(hoverColor)
            }} onMouseOut={() => setLinkColorPolice('#333')}>浙公网安备 33010602013040号</a>
            <a href="https://beian.miit.gov.cn/" target="_blank" style={{...linkStyle, color: linkColorICP}}
               onMouseOver={() => {
                   setLinkColorICP(hoverColor)
               }} onMouseOut={() => setLinkColorICP('#333')}>浙ICP备2023009285号</a>
        </div>)
}
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
    const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errormessage, setErrorMessage] = useState(null)
    const [isPrivate, setisPrivate] = useState(false)
    let privateBlogs = null

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
        blogService.create(newValue).then(response => {
            response.user = {username: user.username}
            setBlogs(blogs.concat(response))
        }).catch(error => {
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
        const initial = async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON)
                setUser(user)
                blogService.setToken(user.token)
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
            setBlogs(await blogService.getAll())

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
        setisPrivate(true)
    }
    const setToPublic = () => {
        setisPrivate(false)
    }
    const editItem = () => {

    }
    const deleteItem = (id) => {
        const target = blogs.find(blog => blog.id === id)
        if (window.confirm(`Delete this blog?`)) {
            const delItem = async () => {
                try {
                    await blogService.del(id)
                    setBlogs(blogs.filter(blog => blog.id !== id))
                } catch (error) {
                    setErrorMessage(
                        `Imformation has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                    setBlogs(blogs.filter(blog => blog.id !== id))
                }

            }
            delItem()
        }
    }
    if (user) privateBlogs = blogs.filter(blog => blog.user.username === user.username)

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
                    <Notification message={errormessage}/>
                    <button onClick={setToPublic}>Public</button>
                    <button onClick={setToPrivate}>Private</button>

                    <br/>
                    <br/>
                    {isPrivate === true ? privateBlogs.map(blog =>
                        <Blog key={blog.id} blog={blog} isPrivate={isPrivate} editItem={editItem}
                              deleteItem={deleteItem}/>) : blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} isPrivate={isPrivate} editItem={editItem}
                              deleteItem={deleteItem}/>)}
                </div>
            }
            <FooterLink/>
        </div>
    )
}

export default App




