const BlogForm = ({newBlog, handleBlogTitleChange, handleBlogAuthorChange, handleBlogUrlChange, addBlog}) => (
    <form onSubmit={addBlog}>
        tilte:<input
        value={newBlog.title}
        onChange={handleBlogTitleChange}
    />
        author:<input
        value={newBlog.author}
        onChange={handleBlogAuthorChange}
    />
        url:<input
        value={newBlog.url}
        onChange={handleBlogUrlChange}
    />
        <button type="submit">save</button>
    </form>
)
export default BlogForm