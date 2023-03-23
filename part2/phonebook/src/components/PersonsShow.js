const PersonsShow = ({personsShow}) => <>{personsShow.map(person => <p
    key={person.number}>{person.name} {person.number}</p>)}</>

export default PersonsShow