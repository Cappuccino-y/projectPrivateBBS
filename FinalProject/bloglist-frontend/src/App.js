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
import {useState, useRef, useEffect} from 'react'
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


const HomePageBg = () => {
    useEffect(() => {
        document.body.style = `background: url(bg1.jpg) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;`;
        return () => {
            document.body.style = '';
        };
    }, []);

    return (
        <HomePage/>
    );
}

const LoginPageBg = ({setMessage, message, handleLogin}) => {
    useEffect(() => {
        document.body.style = `background: url(bg2.jpg) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;`;
        return () => {
            document.body.style = '';
        };
    }, []);

    return (
        <LoginPage handleLogin={handleLogin}
                   message={message} setMessage={setMessage}/>
    );
}

const BlogPageBg = ({user, message, setUser, blogFormRef, notice}) => {
    useEffect(() => {
        document.body.style = `background: url(bg3.jpg) left center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;`;
        return () => {
            document.body.style = '';
        };
    }, []);

    return (
        <BlogPage user={user} message={message} setUser={setUser}
                  blogFormRef={blogFormRef} notice={notice}/>
    );
}
const App = () => {
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({content: '', sign: ''})
    const blogFormRef = useRef()


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
                    <Route path="/home" element={<HomePageBg/>}/>
                    <Route path="/login" element={<LoginPageBg handleLogin={handleLogin}
                                                               message={message} setMessage={setMessage}/>}/>
                    <Route path="/blogs"
                           element={<BlogPageBg user={user} message={message} setUser={setUser}
                                                blogFormRef={blogFormRef} notice={notice}/>}/>
                </Routes>
            </Router>
            <FooterLink/>
        </Container>
        // </ThemeProvider>
    )
}

export default App




