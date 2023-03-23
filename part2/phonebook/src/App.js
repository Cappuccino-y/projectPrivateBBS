import {useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsShow from './components/PersonsShow'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [personsShow, setPersonsShow] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [search, setSearch] = useState('')
    const subChange = (event) => {
        event.preventDefault()
        if (!persons.find(person => person.name === newName)) {
            const newValue = {name: newName, number: newNum}
            setPersons(persons.concat(newValue))
            setPersonsShow(persons.concat(newValue))
        } else alert(`${newName} is already added to phonebook`)
        setNewName('')
        setNewNum('')
    }
    const handleChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumChange = (event) => {
        setNewNum(event.target.value)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
        setPersonsShow(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} handleSearch={handleSearch}/>
            <h2>Add a new</h2>
            <PersonForm newName={newName} handleChange={handleChange} newNum={newNum}
                        handleNumChange={handleNumChange} subChange={subChange}/>
            <h2>Numbers</h2>
            <PersonsShow personsShow={personsShow}/>
        </div>
    )
}

export default App