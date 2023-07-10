const Blog = ({blog, editItem, deleteItem, isPrivate}) => {
    return <div>
        {blog.title} {blog.author}
        <div style={{display: isPrivate ? '' : "none"}}>
            <button onClick={() => editItem}>Edit</button>
            <button onClick={() => deleteItem(blog.id)}>Delete</button>
        </div>
    </div>
}

export default Blog