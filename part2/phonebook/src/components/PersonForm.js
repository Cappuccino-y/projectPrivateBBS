const PersonForm = ({subChange, newName, handleChange, newNum, handleNumChange}) => {

    return <form onSubmit={subChange}>
        <div>
            name: <input value={newName} onChange={handleChange}/>

        </div>
        <div>
            number: <input value={newNum} onChange={handleNumChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}
export default PersonForm
