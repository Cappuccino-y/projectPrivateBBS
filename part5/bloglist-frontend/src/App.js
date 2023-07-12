import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggable";

import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"

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

const BlogShow = ({isPrivate, privateBlogs, deleteItem, updateLikes, blogs, buttonColor}) => {
    let res = [];
    if (isPrivate) {
        if (buttonColor !== 'white') {
            res = privateBlogs.slice().sort((a, b) => {
                return b.likes - a.likes
            })
        } else {
            res = [...privateBlogs]
        }
        return res.map(blog =>
            <Blog key={blog.id} blog={blog} isPrivate={isPrivate}
                  deleteItem={deleteItem} updateLikes={updateLikes}/>)
    } else {
        if (buttonColor !== 'white') {
            res = blogs.slice().sort((a, b) => {
                return b.likes - a.likes
            })
        } else {
            res = [...blogs]
        }
        return res.map(blog =>
            <Blog key={blog.id} blog={blog} isPrivate={isPrivate}
                  deleteItem={deleteItem} updateLikes={updateLikes}/>)
    }

}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errormessage, setErrorMessage] = useState(null)
    const [isPrivate, setisPrivate] = useState(false)
    const blogFormRef = useRef()
    const [buttonColor, setButtonColor] = useState('white')
    let privateBlogs = null


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
    }, [])
    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        const newValue = blogObject
        blogService.create(newValue).then(response => {
            setBlogs(blogs.concat(response))
        }).catch(error => {
            setErrorMessage(
                `Blog add failed.`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)

        })
    }

    const handleLogin = async (username, password) => {
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
    const updateLikes = async (blog) => {
        if (!blog.likes) blog.likes = 1
        else blog.likes += 1
        try {
            const updatedBlog = await blogService.update(blog.id, blog)
            setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog))
        } catch (error) {
            setErrorMessage(
                `update failed`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
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
                    setErrorMessage(
                        `delete failed`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                }
            }
            delItem()
        }
    }
    const sortedByLikes = () => {
        setButtonColor(buttonColor === 'white' ? '#00a7d0' : 'white');
    }
    if (user) privateBlogs = blogs.filter(blog => blog.user.username === user.username)

    return (
        <div>
            {user === null ?
                <div>
                    <Togglable buttonLabel='Log in'>
                        <div>
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
                </div>
                :
                <div>
                    <h3>Blog</h3>
                    <p>{user.name} logged-in <button onClick={logOut}>Sign out</button>
                    </p>
                    <Togglable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm
                            createBlog={addBlog}
                        />
                    </Togglable>
                    <br/>
                    <Notification message={errormessage}/>
                    <button onClick={setToPublic}>Public</button>
                    <button onClick={setToPrivate}>Private</button>
                    <button onClick={sortedByLikes} style={{backgroundColor: buttonColor}}>Sorted</button>
                    <br/>
                    <br/>
                    <BlogShow isPrivate={isPrivate} buttonColor={buttonColor} privateBlogs={privateBlogs}
                              deleteItem={deleteItem} blogs={blogs} updateLikes={updateLikes}/>
                </div>
            }
            <FooterLink/>
        </div>
    )
}

export default App




