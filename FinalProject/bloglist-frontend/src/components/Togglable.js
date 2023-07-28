import {useState, forwardRef, useImperativeHandle, useEffect, useRef} from 'react'
import React from 'react';
import Button from '@mui/material/Button'
import Comment from './Comment'
import {v4 as uuidv4} from 'uuid';

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}


    const handleDelete = async (id) => {
        try {
            const comments = props.blog.comments.filter(comment => comment.id !== id)
            const newBlog = {...props.blog, comments: comments}
            await props.updateBlog(newBlog)
            props.setBlog(newBlog)
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddComment = async (commentText) => {
        try {
            const comments = [{
                name: props.user.name,
                content: commentText,
                id: uuidv4(),
                date: new Date()
            }, ...props.blog.comments]
            const newBlog = {...props.blog, comments: comments}
            await props.updateBlog(newBlog)
            props.setBlog(newBlog)

        } catch (error) {
            console.log(error)
        }
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant="contained" onClick={toggleVisibility} style={{marginTop: '8px'}}
                >{props.buttonLabel}</Button>
                <Comment comments={props.blog.comments} handleDelete={handleDelete}
                         handleAddComment={handleAddComment}/>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant='outlined' onClick={toggleVisibility}>cancel</Button>
            </div>

        </div>
    )
})

export default Togglable