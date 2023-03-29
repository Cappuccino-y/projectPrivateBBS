const PersonsShow = ({personsShow, persondelete}) => <>{personsShow.map(person =>
    <p key={person.number}>
        {person.name} {person.number}
        <button onClick={() => persondelete(person.id)}>delete</button>
    </p>
)}
</>

export default PersonsShow