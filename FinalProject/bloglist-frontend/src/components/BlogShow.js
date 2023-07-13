import Blog from "./Blog";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper, Typography,
} from '@mui/material'

const BlogShow = ({isPrivate, privateBlogs, deleteItem, updateLikes, blogs, buttonColor}) => {
    let res = [];
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
    return <TableContainer className='slide' component={Paper} sx={{height: '80vh', overflowY: 'auto'}}>
        <Table>
            <TableBody>{res.map(blog =>
                <TableRow key={blog.id}>
                    <TableCell>
                        <Blog blog={blog} isPrivate={isPrivate}
                              deleteItem={deleteItem} updateLikes={updateLikes}/>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" fontFamily="Comic Sans MS, cursive, sans-serif">
                            {blog.user.name}
                        </Typography>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
}
export default BlogShow