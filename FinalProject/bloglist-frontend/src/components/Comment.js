import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import formatDate from "../formatDate";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import {useContext, useEffect, useRef, useState} from "react";
import ExampleContext from "./ExampleContext";
import DialogForBlog from "./DialogForBlog";

const CommentItem = ({comment, handleDelete}) => {
    const [updateValue, setUpdateValue] = useState(comment.content)
    const [editMode, setEditMode] = useState(false)
    const [open, setOpen] = useState(false)
    const val = useContext(ExampleContext)
    const updateBlogRef = useRef(null)

    useEffect(() => {
        if (editMode) {
            if (updateBlogRef.current && val.blog.comments.length === updateBlogRef.current.comments.length) val.setBlog(updateBlogRef.current);
        }
    }, [val.blogs]);

    useEffect(() => {
        setEditMode(false);
    }, [val.blog])

    const handleEdit = async (id) => {
        if (editMode) {
            try {
                const updateComment = {...comment, content: updateValue}
                const updateBlog = {
                    ...val.blog,
                    comments: val.blog.comments.map(comment => comment.id === id ? updateComment : comment)
                }
                updateBlogRef.current = updateBlog
                await val.updateBlog(updateBlog)

            } catch (error) {
                console.log(error)
            }
        } else {
            setEditMode(!editMode)
        }
    }

    return (
        <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={comment.name}
                    secondary={
                        <>
                            {editMode ?
                                <TextField label="Content" fullWidth
                                           multiline margin="normal" value={updateValue}
                                           size='small' sx={{width: '92%'}}
                                           onChange={(event) => {
                                               setUpdateValue(event.target.value)
                                           }}/> :
                                <Typography
                                    sx={{display: 'inline'}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {comment.content}
                                </Typography>}
                            <br/>
                            {formatDate(comment.date)}
                        </>
                    }
                />
                {val.user.name === comment.name ? <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(comment.id)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => setOpen(true)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction> : <></>}
            </ListItem>
            <Divider variant="inset" component="li"/>
            <DialogForBlog open={open} setOpen={setOpen}
                           handleEvents={
                               () => handleDelete(comment.id)
                           }
                           title='Caution: Irreversible Action - Delete this Item?'
                           prompts='The following operation is irreversible. Please exercise caution before.'
                           option1='Yes'
                           option2='Cancel'/>
        </React.Fragment>
    );
}

const Comment = ({comments, handleDelete, handleAddComment}) => {

    const handleInputChange = (event) => {
        setCommentText(event.target.value);
    }

    const handleSubmit = () => {
        handleAddComment(commentText);
        setCommentText('');
    }

    const [commentText, setCommentText] = React.useState('');
    return (<Card
            sx={{
                marginTop: '2vh',
                padding: '0vh',
            }}
        >
            <List
                className='slide'
                sx={{width: '100%', maxWidth: 450, bgcolor: 'background.paper', height: '50vh', overflowY: 'auto'}}
            >
                {comments.map(comment =>
                    <CommentItem comment={comment} handleDelete={handleDelete}/>
                )}
            </List>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 2,
                    p: 2,
                    bgcolor: 'background.paper'
                }}
            >
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    id="comment"
                    label="New Comment"
                    name="comment"
                    value={commentText}
                    onChange={handleInputChange}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Paper>
        </Card>
    );
}
export default Comment;
