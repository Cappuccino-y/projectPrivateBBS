import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField, Typography, Box} from '@mui/material';

const LoginForm = ({handleLogin, setMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    const userLogin = (event) => {
        event.preventDefault()
        handleLogin(username, password, navigate).then(() => {
            setUsername('')
            setPassword('')
        })
    }


    return <Box component="form" onSubmit={userLogin} sx={{width: '100%'}}>
        <Grid container spacing={2} direction="column">
            <Grid item>
                <Typography variant="h4" align="left" gutterBottom>
                    Hi~
                </Typography>
            </Grid>
            <Grid item>
                <TextField
                    sx={{color: 'white'}}
                    label="username"
                    value={username}
                    onChange={({target}) => setUsername(target.value)}
                />
            </Grid>
            <Grid item>
                <TextField
                    label="password"
                    type='password'
                    value={password}
                    onChange={({target}) => setPassword(target.value)}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" type="submit">
                    login
                </Button>
            </Grid>
        </Grid>
    </Box>
}
export default LoginForm