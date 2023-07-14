import {useState} from "react";
import {Card, CardContent, Typography, Button, Box, Grid, IconButton, Badge} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Blog = ({blog, deleteItem, isPrivate, updateLikes}) => {


    const [visible, setVisible] = useState(false)
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return <Card sx={{my: 1}}>
        <CardContent sx={{padding: '12px'}}>
            <Grid container justifyContent="space-between" alignItems="center" paddingBottom='0px !important'>
                <Grid item>
                    <Typography variant="h5" component="div" style={{fontFamily: 'Comic Sans MS'}}>
                        {blog.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={toggleVisibility}>
                        {visible ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </IconButton>
                    <IconButton color="secondary" onClick={() => updateLikes(blog)}>
                        <Badge badgeContent={blog.likes === undefined ? 0 : blog.likes} color="error">
                            <ThumbUpIcon/>
                        </Badge>
                    </IconButton>
                </Grid>
            </Grid>
            <Box style={showWhenVisible}>
                <Typography gutterBottom style={{fontFamily: 'Courier New'}}>
                    {blog.content}
                </Typography>
                <Typography gutterBottom style={{fontFamily: 'Arial'}}>
                    {blog.tag}
                </Typography>
            </Box>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item sx={{marginTop: '8px'}}>
                    <Button variant="contained" color="secondary" style={{display: isPrivate ? '' : "none"}}
                            onClick={() => deleteItem(blog.id)} startIcon={<DeleteIcon/>} size='small'>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}

export default Blog