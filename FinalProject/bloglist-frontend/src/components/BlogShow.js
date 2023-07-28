import Blog from "./Blog";
import {useState, useEffect, useRef, useContext} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper, Typography, Pagination
} from '@mui/material'
// import CircularProgress from '@mui/material/CircularProgress';
import blogService from "../services/blogs";
import ExampleContext from "./ExampleContext";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const BlogShow = ({isPrivate, user, deleteItem, updateBlog, blogs, buttonColor, stateListen, commentShow}) => {
    let res = [];
    blogs = blogs.map(blog => !blog.likes ? {...blog, likes: 0} : blog)
    const privateBlogs = blogs.filter(blog => blog.user.username === user.username)
    if (isPrivate) {
        if (buttonColor !== 'grey') {
            res = privateBlogs.slice().sort((a, b) => {
                return b.likes - a.likes
            })
        } else {
            res = [...privateBlogs]
        }
    } else {
        if (buttonColor !== 'grey') {
            res = blogs.slice().sort((a, b) => {
                return b.likes - a.likes
            })
        } else {
            res = [...blogs]
        }
    }

    const [page, setPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(7);
    const [loading, setLoading] = useState(false)
    const tableContainerRef = useRef(null);
    const val = useContext(ExampleContext)
    const handlePageChange = (event, value) => setPage(value);

    const handleScroll = () => {
        if (tableContainerRef.current.scrollTop === 0 && page === 1) {
            setLoading(true)
            const fetchBlogs = async () => {
                try {
                    const res = await blogService.getAll()
                    val.setBlogs(res.reverse())
                } catch {
                    if (user) {
                        val.setOpenExpire(true)
                    }
                }
            }
            fetchBlogs()
        }
    };

    useEffect(() => {
        setLoading(false)
    }, [val.blogs])

    useEffect(() => {
        const container = tableContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [page]);

    useEffect(() => {
        if (page > Math.ceil(res.length / postsPerPage)) setPage(Math.ceil(res.length / postsPerPage))
        else if (page == 0) setPage(1)
    }, [blogs])

    return <div><TableContainer className='slide' component={Paper}
                                sx={{
                                    height: '80vh',
                                    // overflowY: commentShow ? 'auto' : 'hidden',
                                    overflowY: 'auto',
                                    backgroundColor: 'transparent',
                                }}
                                ref={tableContainerRef}>
        <Table>
            <TableBody>
                <TableRow style={{display: loading ? '' : 'none'}}>
                    <TableCell colSpan={2} style={{textAlign: 'center'}}>
                        <div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </TableCell>
                </TableRow>
                <TransitionGroup component={null}>
                    {res.slice((page - 1) * postsPerPage, page * postsPerPage).map(blog =>
                        <CSSTransition
                            key={blog.id}
                            timeout={300}
                            classNames="item"
                        >
                            <TableRow>
                                <TableCell style={{width: '95%'}}>
                                    <Blog blog={blog} isPrivate={isPrivate} blogs={stateListen}
                                          pagination={{page: page, setPage: setPage, postsPerPage: postsPerPage}}
                                          deleteItem={deleteItem} updateBlog={updateBlog}
                                    />
                                </TableCell>
                                <TableCell style={{width: '5%', verticalAlign: 'top'}}>
                                    <br/>
                                    <Typography variant="h5" fontFamily="Comic Sans MS, cursive, sans-serif">
                                        {blog.user.name}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </TableBody>
        </Table>
    </TableContainer>
        <Pagination
            count={Math.ceil(res.length / postsPerPage)}
            page={page}
            onChange={handlePageChange}
            style={{marginTop: '10px', display: "flex", justifyContent: 'center'}}
            sx={{
                '& .MuiPaginationItem-page.Mui-selected': {
                    backgroundColor: '#f50057',
                    color: '#ffffff',
                },
                '& .MuiPaginationItem-page.Mui-selected:hover': {
                    backgroundColor: '#aa0039',
                },
                '& .MuiPaginationItem-page:hover': {
                    backgroundColor: '#f6f6f6',
                }
            }}
        />
    </div>
}
export default BlogShow