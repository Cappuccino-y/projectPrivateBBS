import Blog from "./Blog";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

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
    } else {
        if (buttonColor !== 'white') {
            res = blogs.slice().sort((a, b) => {
                return b.likes - a.likes
            })
        } else {
            res = [...blogs]
        }
    }
    return <TableContainer component={Paper}>
        <Table>
            <TableBody>{res.map(blog =>
                <TableRow key={blog.id}>
                    <TableCell>
                        <Blog blog={blog} isPrivate={isPrivate}
                              deleteItem={deleteItem} updateLikes={updateLikes}/>
                    </TableCell>
                    <TableCell>
                        {blog.user.name}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
}
export default BlogShow