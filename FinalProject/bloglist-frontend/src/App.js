import {useState, useRef} from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginPage from './pages/LoginPage'
import BlogPage from './pages/BlogPage'
import HomePage from './pages/HomePage'
import FooterLink from "./components/FootLink";
import {Container} from '@mui/material'
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/material";
import {
    BrowserRouter as Router,
    Routes, Route, Link, Navigate, useNavigate
} from "react-router-dom"


const App = () => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({content: '', sign: ''})
    const blogFormRef = useRef()
    // const theme = createTheme({
    //     components: {
    //         MuiButton: {
    //             styleOverrides: {
    //                 root: {
    //                     cursor: 'url("/mouse-pointer.png"), auto',
    //                 },
    //             },
    //         },
    //         MuiSelect: {
    //             styleOverrides: {
    //                 select: {
    //                     cursor: 'url("/mouse-pointer.png"), auto',
    //                 },
    //             },
    //         },
    //         MuiInput: {
    //             styleOverrides: {
    //                 input: {
    //                     cursor: 'url("/mouse-pointer.png"), auto',
    //                 },
    //             },
    //         },
    //         MuiOutlinedInput: {
    //             styleOverrides: {
    //                 input: {
    //                     cursor: 'url("/mouse-pointer.png"), auto',
    //                 },
    //             },
    //         },
    //         MuiIconButton: {
    //             styleOverrides: {
    //                 root: {
    //                     cursor: 'url("/mouse-pointer.png"), auto',
    //                 },
    //             },
    //         },
    //     },
    // });

    const notice = (content, sign) => {
        setMessage(
            {content: content, sign: sign}
        )
        setTimeout(() => {
            setMessage({content: '', sign: ''})
        }, 3000)
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
            setUser(user)
            setTimeout(() => {
                setMessage({content: '', sign: ''})
                navigate('/blogs')
            }, 500)
        } catch (exception) {
            notice('Wrong username or password', 'error')
        }
    }


    return (
        // <ThemeProvider theme={theme}>
        <Container>
            <Router>
                <Routes>
                    <Route path="" element={<Navigate to={'/home'}/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage handleLogin={handleLogin}
                                                             message={message} setMessage={setMessage}/>}/>
                    <Route path="/blogs"
                           element={<BlogPage user={user} message={message} setUser={setUser}
                                              blogFormRef={blogFormRef} notice={notice}/>}/>
                </Routes>
            </Router>
            <FooterLink/>
        </Container>
        // </ThemeProvider>
    )
}

export default App




