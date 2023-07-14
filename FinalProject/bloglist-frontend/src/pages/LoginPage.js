import {useState} from "react";
import LoginForm from "../components/LoginForm";
import Notification from "../components/Notification";
import {Grid, Typography, Box} from '@mui/material';
import MoodIcon from '@mui/icons-material/Mood';
import ExploreIcon from '@mui/icons-material/Explore';
import {FaPenFancy} from "react-icons/fa";
import {MdPublic} from "react-icons/md";


const LoginPage = ({handleLogin, message, setMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    return <div className={"flexCenter animation"} style={{minHeight: '90vh', flexDirection: 'column'}}>
        <Box style={{minHeight: '9vh'}}>
            <Notification message={message}/>
        </Box>
        <Grid container spacing={3} style={{flexGrow: 0.2}}>
            <Grid item xs={12} md={6}>
                <Box sx={{my: 4, textAlign: 'center'}}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{
                        color: '#FF6347',
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        fontSize: '2em'
                    }}>
                        Your Blog, Your Narrative!
                    </Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
                        <FaPenFancy style={{fontSize: 60, color: '#c06515', marginRight: 10}}/>
                        <Typography variant="h5" sx={{fontFamily: 'Indie Flower', fontSize: '1.5em'}}>
                            Express Yourself
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2}}>
                        <MdPublic style={{fontSize: 60, color: '#c06515', marginRight: 10}}/>
                        <Typography variant="h5" sx={{fontFamily: 'Indie Flower', fontSize: '1.5em'}}>
                            Share and Inspire
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