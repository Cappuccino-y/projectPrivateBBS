import Blog from "./Blog";
import {useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper, Typography, Pagination
} from '@mui/material'

const BlogShow = ({isPrivate, user, deleteItem, updateBlog, blogs, buttonColor, stateListen}) => {
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
    const [postsPerPage, setPostsPerPage] = useState(6);
    const handlePageChange = (event, value) => setPage(value);

    return <div><TableContainer className='slide' component={Paper} sx={{height: '80vh', overflowY: 'auto'}}>
        <Table>
            <TableBody>
                {res.slice((page - 1) * postsPerPage, page * postsPerPage).map(blog =>
                    <TableRow key={blog.id}>
                        <TableCell>
                            <Blog blog={blog} isPrivate={isPrivate} blogs={stateListen}
                                  pagination={{page: page, setPage: setPage, postsPerPage: postsPerPage}}
                                  deleteItem={deleteItem} updateBlog={updateBlog}/>
                        </TableCell>
                        <TableCell style={{verticalAlign: 'top'}}>
                            <br/>
                            <Typography variant="h5" fontFamily="Comic Sans MS, cursive, sans-serif">
                                {blog.user.name}
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
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