import {useNavigate} from "react-router-dom";
import {Button, Container, Typography, Grid, Box, Paper} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const HomePage = () => {
    const navigate = useNavigate()
    const switchPage = () => {
        navigate('/login')
    }
    return <div className='animation'>
        <Grid container style={{height: "92vh", background: "#f4f6f8"}}>
            <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    padding={2}
                >
                    <Typography variant="h3" align="center" gutterBottom>
                        Welcome to My Website!
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary">
                        Please feel free to browse around.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={switchPage}
                        endIcon={<SendIcon/>}
                        sx={{marginTop: 2}}
                    >
                        Enter
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                    padding={1}
                    boxSizing="border-box"
                >
                    {Array(2).fill().map((_, i) => (
                        <Box
                            key={i}
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                            height="49%"
                        >
                            {Array(2).fill().map((_, j) => (
                                <Paper
                                    key={j}
                                    sx={{
                                        width: "49%",
                                        height: "100%",
                                        overflow: "hidden",
                                        position: "relative"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundImage: `url(https://source.unsplash.com/random?wallpaper&timestamp=${new Date().getTime() + i * 2 + j})`
                                        }}
                                    />
                                </Paper>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Grid>
        </Grid>
    </div>

}

export default HomePage