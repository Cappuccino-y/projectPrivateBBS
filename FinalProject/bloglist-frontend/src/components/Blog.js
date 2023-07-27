import {useState, useEffect} from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Grid,
    IconButton,
    Badge,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SellIcon from '@mui/icons-material/Sell';
import CancelIcon from '@mui/icons-material/Cancel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import sha256 from 'crypto-js/sha256';
import MDEditor from '@uiw/react-md-editor';
import 'font-awesome/css/font-awesome.min.css'
import customImageCommand from "../customImageCommand";
import DialogForBlog from "./DialogForBlog";
import {useContext} from "react";
import ExampleContext from "./ExampleContext";
import formatDate from "../formatDate";


const stringToColor = (str) => {
    const hash = sha256(str);
    const hashStr = hash.toString();

    const r = parseInt(hashStr.slice(0, 2), 16);
    const g = parseInt(hashStr.slice(2, 4), 16);
    const b = parseInt(hashStr.slice(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
}


const Blog = ({blog, deleteItem, isPrivate, updateBlog, pagination, blogs}) => {
    const [visible, setVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [updateValue, setUpdateValue] = useState({...blog})
    const [open, setOpen] = useState(false);
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}
    const val = useContext(ExampleContext)

    const toggleVisibility = () => {
        setVisible(!visible)
    }
    useEffect(() => {
        if (editMode) {
            setEditMode(false);
        }
    }, [blogs]); // 这里的数组表示 useEffect 的依赖项，只有当数组中的值改变时，useEffect 才会运行

    const editBlog = async (id) => {
        if (editMode) {
            try {
                await updateBlog({...updateValue})
            } catch (error) {
                console.log(error)
            }
        } else {
            setEditMode(!editMode)
            setVisible(true)
        }
    }

    return <Card sx={{my: 1, backgroundColor: 'transparent'}}>
        <CardContent style={{paddingBottom: '8px'}}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item md={5}>
                    {editMode && isPrivate ?
                        <TextField label="Title" fullWidth margin="normal" value={updateValue.title} size='small'
                                   onChange={(event) => {
                                       setUpdateValue({...updateValue, title: event.target.value})
                                   }}/> :
                        <Typography variant="h5" component="div"
                                    style={{fontFamily: 'Comic Sans MS', cursor: 'url("/mouse-pointer.png"), auto'}}
                                    onClick={() => {
                                        val.setComments([blog.comment])
                                        toggleVisibility()
                                    }}>
                            {blog.title}
                        </Typography>}

                </Grid>
                <Grid item md={3} display='flex' justifyContent='center' alignItems='center'>
                    <Box display="flex" alignItems="center" justifyContent="flex-start" width="100%">
                        <SellIcon sx={{color: stringToColor(blog.tag)}}/>
                        {editMode && isPrivate ?
                            <TextField label="Tag" fullWidth margin="normal" value={updateValue.tag}
                                       sx={{
                                           '& .MuiInputBase-root': {
                                               fontSize: '6px',
                                           },
                                       }}
                                       onChange={(event) => {
                                           setUpdateValue({...updateValue, tag: event.target.value})
                                       }}/> :
                            <Typography gutterBottom style={{
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                color: '#004d7a'
                            }}>
                                {blog.tag}
                            </Typography>}
                    </Box>
                </Grid>
                <Grid item>
                    <IconButton onClick={toggleVisibility}>
                        {visible ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                    </IconButton>
                    <IconButton color="secondary" onClick={() => {
                        if (!blog.likes) blog.likes = 1
                        else blog.likes += 1
                        updateBlog(blog)
                    }}>
                        <Badge
                            badgeContent={blog.likes === undefined ? 0 : blog.likes} color="error">
                            <ThumbUpIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton color="black" onClick={() => {
                        if (blog.likes !== undefined & blog.likes > 0) {
                            blog.likes -= 1
                            updateBlog(blog)
                        }
                    }}>
                        <ThumbDownIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Box style={{...showWhenVisible}}>
                {editMode && isPrivate ?
                    <MDEditor
                        value={updateValue.content}
                        onChange={content => setUpdateValue({...updateValue, content})}
                        height='60vh'
                        commandsFilter={(command, isExtra) => {
                            if (command.name === 'image') {
                                // Replace the image command with your custom command
                                return customImageCommand;
                            }
                            // Return the command unchanged if it's not the image command
                            return command;
                        }}
                        // style={{backgroundColor: 'transparent'}}
                    />
                    :
                    <Typography gutterBottom style={{fontFamily: 'Arial'}}>
                        <MDEditor.Markdown className="markdown" source={blog.content}
                                           style={{whiteSpace: 'pre-wrap', backgroundColor: 'transparent'}}/>
                    </Typography>}
            </Box>
            <Box>
                <Typography gutterBottom style={{fontFamily: 'Roboto Mono', fontSize: '15px', color: '#004d7a'}}>
                    {formatDate(blog.date)}
                </Typography>
            </Box>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item sx={{marginTop: '8px'}}>
                    <Button variant="contained" color="primary"
                            style={{display: isPrivate ? '' : "none", marginRight: '10px'}}
                            onClick={() => editBlog(blog.id)} startIcon={<EditIcon/>} size='small'>
                        {editMode ? 'Enter' : 'Edit'}
                    </Button>

                    <Button variant="contained" color="secondary"
                            style={{display: isPrivate && editMode ? '' : "none", marginRight: '10px'}}
                            onClick={() => {
                                setEditMode(false)
                                setVisible(false)
                            }} startIcon={<CancelIcon/>} size='small'>
                        Cancel
                    </Button>
                    <Button variant="contained" color="inherit"
                            style={{display: isPrivate ? '' : "none"}}
                            onClick={() => setOpen(true)} startIcon={<DeleteIcon/>} size='small'>
                        Delete
                    </Button>
                    <DialogForBlog open={open} setOpen={setOpen}
                                   handleEvents={() => {
                                       deleteItem(blog.id, pagination)
                                   }}
                                   title='Caution: Irreversible Action - Delete this Item?'
                                   prompts='The following operation is irreversible. Please exercise caution before.'
                                   option1='Yes'
                                   option2='Cancel'/>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}

export default Blog