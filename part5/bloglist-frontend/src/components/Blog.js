import {useState} from "react";

const Blog = ({blog, deleteItem, isPrivate, updateLikes}) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 2,
        marginBottom: 5
    }

    const [visible, setVisible] = useState(false)
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return <div style={blogStyle}>
        {blog.title}
        <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
        <div style={showWhenVisible}>
            {blog.url}
            <br/>
            like:{blog.likes === undefined ? 0 : blog.likes}
            <button onClick={() => {
                updateLikes(blog)
            }}>like
            </button>
            <br/>
            {blog.author}
            <button onClick={toggleVisibility}>hide</button>
        </div>
        <button style={{display: isPrivate ? '' : "none"}} onClick={() => deleteItem(blog.id)}>Delete</button>
        <h3>Posted by {blog.user.name}</h3>
    </div>
}

export default Blog