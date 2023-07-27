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

const CommentItem = ({comment, handleEdit, handleDelete}) => {
    return (
        <React.Fragment key={comment.id}>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={comment.name}
                    secondary={
                        <>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {comment.content}
                            </Typography>
                            <br/>
                            {formatDate(comment.date)}
                        </>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(comment.id)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(comment.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li"/>
        </React.Fragment>
    );
}

const Comment = ({comments, handleEdit, handleDelete, handleAddComment}) => {
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
                    <CommentItem comment={comment} handleEdit={handleEdit} handleDelete={handleDelete}/>
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
