const PersonForm = ({subChange, newone, handleChange, handleNumChange}) => {

    return <form onSubmit={subChange}>
        <div>
            name: <input value={newone.name} onChange={handleChange}/>
        </div>
        <div>
            number: <input value={newone.num} onChange={handleNumChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}
export default PersonForm
