import {useState, forwardRef, useImperativeHandle} from 'react'
import React from 'react';
import Button from '@mui/material/Button'
import Comment from './Comment'
import {v4 as uuidv4} from 'uuid';

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const handleEdit = () => {

    }
    const handleDelete = () => {

    }
    const handleAddComment = () => {

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
                <Comment comments={props.comments} handleDelete={handleDelete} handleEdit={handleEdit}
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