import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsShow from './components/PersonsShow'
import service from './services/persons'

require('dotenv').config()
const FooterLink = () => {
    const footerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '20px',
        position: 'fixed', // Add this line
        width: '100%', // Add this line
        bottom: '0', // Add this line
    };
    const [linkColorICP, setLinkColorICP] = useState('#133');
    const [linkColorPolice, setLinkColorPolice] = useState('#133');

    const hoverColor = '#007bff';
    const linkStyle = {
        textDecoration: 'none',
        fontSize: '12px',
        margin: '0 10px'
    };

    return (
        <div style={footerStyle}>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602013040" target="_blank"
               style={{...linkStyle, color: linkColorPolice}} onMouseOver={() => {
                setLinkColorPolice(hoverColor)
            }} onMouseOut={() => setLinkColorPolice('#333')}>浙公网安备 33010602013040号</a>
            <a href="https://beian.miit.gov.cn/" target="_blank" style={{...linkStyle, color: linkColorICP}}
               onMouseOver={() => {
                   setLinkColorICP(hoverColor)
               }} onMouseOut={() => setLinkColorICP('#333')}>浙ICP备2023009285号</a>
        </div>)
}


const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}

const App = () => {

    const [persons, setPersons] = useState([])
    const [add, setAdd] = useState({name: '', num: ''})
    const [search, setSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {
        service.getAll().then(response => {
            setPersons(response)
        })
    }, [])
    const subChange = (event) => {
        event.preventDefault()
        const newValue = {name: add.name, number: add.num}
        if (!persons.find(person => person.name === add.name)) {
            service.create(newValue).then(response => setPersons(persons.concat(response)))
        } else {
            if (window.confirm(`${add.name} is already added to phonebook, replace the older number with a new one?`)) {
                const target = persons.find(person => person.name === add.name)
                service.update(target.id, newValue).then(response => setPersons(persons.map(person => person.id !== target.id ? person : response)))
            }
        }
        setAdd({name: '', num: ''})
    }
    const handleChange = (event) => {
        setAdd({...add, name: event.target.value})
    }
    const handleNumChange = (event) => {
        setAdd({...add, num: event.target.value})
    }
    const persondelete = (id) => {
        const target = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${target.name}?`)) {
            service.del(id).then().catch(error => {
                setErrorMessage(
                    `Imformation of '${target.name}' has already been removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setPersons(persons.filter(person => person.id !== id))
            })
            setPersons(persons.filter(person => person.id !== id))
        }
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const res = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>

            <Notification message={errorMessage}/>
            <h2>Phonebook</h2>
            <Filter search={search} handleSearch={handleSearch}/>
            <h2>Add a new</h2>
            <PersonForm newone={add} handleChange={handleChange}
                        handleNumChange={handleNumChange} subChange={subChange}/>
            <h2>Numbers</h2>
            <PersonsShow personsShow={res} persondelete={persondelete}/>
            <FooterLink/>
        </div>
    )
}

export default App