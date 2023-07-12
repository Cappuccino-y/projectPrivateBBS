import {useState} from "react";

const Blog = ({blog, deleteItem, isPrivate, updateLikes}) => {


    const [visible, setVisible] = useState(false)
    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return <div>
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
    </div>
}

export default Blog