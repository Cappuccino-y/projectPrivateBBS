import {useState} from "react";
import LoginForm from "../components/LoginForm";
import Notification from "../components/Notification";
import {Grid, Typography, Box} from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import ExploreIcon from '@mui/icons-material/Explore';


const LoginPage = ({handleLogin, message, setMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    return <div className={"flexCenter animation"} style={{minHeight: '90vh', flexDirection: 'column'}}>
        <Box style={{minHeight: '8.5vh'}}>
            <Notification message={message}/>
        </Box>
        <Grid container spacing={3} style={{flexGrow: 0.3}}>
            <Grid item xs={12} md={6}>
                <Box sx={{my: 4, textAlign: 'center'}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Your Space, Your Rules!
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
                        <MoodIcon sx={{fontSize: 60, color: 'primary.main'}}/>
                        <Typography variant="h5">
                            Be Yourself
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
                        <ExploreIcon sx={{fontSize: 60, color: 'primary.main'}}/>
                        <Typography variant="h5">
                            Explore and Create
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <LoginForm
                    handleLogin={handleLogin}
                    setMessage={setMessage}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            </Grid>
        </Grid>
    </div>


}

export default LoginPage