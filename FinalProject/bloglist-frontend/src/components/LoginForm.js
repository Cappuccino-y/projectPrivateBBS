import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {TextField, Button} from '@mui/material'

const LoginForm = ({handleLogin, setMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const userLogin = (event) => {
        event.preventDefault()
        handleLogin(username, password, navigate).then(() => {
            setUsername('')
            setPassword('')
            setMessage({content: ''})
        })
    }


    return <div>
        <form onSubmit={userLogin}>
            <h2>Hi~</h2>
            <div>
                <TextField label="username" value={username} onChange={({target}) => setUsername(target.value)}/>
            </div>
            <br/>
            <div>
                <TextField label="password" type='password' value={password}
                           onChange={({target}) => setPassword(target.value)}/>
            </div>
            <br/>
            <Button variant="contained" color="primary" type="submit">login</Button>
        </form>
    </div>
}
export default LoginForm