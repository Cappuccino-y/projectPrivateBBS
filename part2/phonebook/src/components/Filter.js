const Filter = ({search, handleSearch}) => {
    return <p>
        first shown with
        <input value={search} onChange={handleSearch}/>
    </p>

}
export default Filter