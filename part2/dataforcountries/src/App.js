import {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {
    const [weather, setWeather] = useState(null)
    const icon = weather.weather[0].icon
    const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
    useEffect(() => {
        const API_KEY = process.env.REACT_APP_API_KEY
        const lat = country.capitalInfo.latlng[0]
        const lon = country.capitalInfo.latlng[1]
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        axios.get(url).then(response => {
            setWeather(response)
        })
    })
    return <div>
        <h1> {country.name.common}</h1>
        capital {country.capital.map(capital => <p key={capital}> {capital} </p>)}
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt=''/>
        <h2>Weather in {country.capital[0]}</h2>

        <p>temperature {weather.main.temp} Celsius</p>

        <img src={weatherIconUrl} alt=''/>

        <p>wind {weather.wind.speed} m/s</p>
    </div>
}

const CountryList = (
    {
        countries, showCountry
    }
) => {
    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    if (countries.length === 1) {
        return <Country country={countries[0]}/>
    }

    return (
        <div>
            {countries.map(c =>
                <p key={c.fifa}>
                    {c.name.common}
                    <button onClick={() => showCountry(c.name.common)}>
                        show
                    </button>
                </p>
            )}
        </div>
    )
}

function App() {
    const [country, setCountry] = useState('')
    // const [showcontent, setShowcontent] = useState([])
    // const [searched, setSearched] = useState([])
    const [db, setDB] = useState([])

    const handlechange = (event) => {
        setCountry(event.target.value)
    }
    useEffect(() => {
            axios.get('https://restcountries.com/v3.1/all').then(response => {
                console.log(response.data)
                setDB(response.data)
            })
        }, []
    )

    const search = db.filter(item => {
        return item.name.official.toLowerCase().includes(country.toLowerCase())
    })

    return (
        <div>
            <p>find countries<input value={country} onChange={handlechange}/></p>
            <CountryList countries={search} showCountry={setCountry}/>
        </div>
    );
}

export default App;
