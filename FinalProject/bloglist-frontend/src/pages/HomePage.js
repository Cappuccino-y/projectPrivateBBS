import {useNavigate} from "react-router-dom";
import {Button, Container, Typography, Grid, Box, Paper} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

const HomePage = () => {
    const navigate = useNavigate()
    const switchPage = () => {
        navigate('/login')
    }
    return <div className='animation'>
        <Grid container style={{height: "92vh", background: "#f4f6f8"}}>
            <Grid item xs={12} md={6} style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(img_1.png)`
            }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                    padding={2}
                >
                    <Typography variant="h3" align="center" gutterBottom
                                sx={{color: '#008080', fontFamily: 'Pacifico', fontSize: '2.5em'}}>
                        Welcome to My Website!
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="textSecondary"
                                fontFamily='"Comic Sans MS", cursive, sans-serif'>
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
                <Grid container direction="row" justifyContent="space-between"
                      style={{height: '100%', paddingLeft: '6px'}}>
                    <Grid item style={{width: '49.7%', paddingRight: '0%'}}>
                        <Paper
                            sx={{
                                width: "100%",
                                height: "60%",
                                overflow: "hidden",
                                marginBottom: "0%",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundImage: `url(https://api.yimian.xyz/img?type=moe)`
                                }}
                            />
                        </Paper>
                        <Paper
                            sx={{
                                width: "100%",
                                height: "40%",
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundImage: `url(https://api.yimian.xyz/img?type=head)`
                                }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item style={{width: '49.7%', paddingLeft: '0%'}}>
                        <Paper
                            sx={{
                                width: "100%",
                                height: "40%",
                                overflow: "hidden",
                                marginBottom: "0%",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundImage: `url(https://api.yimian.xyz/img)`
                                }}
                            />
                        </Paper>
                        <Paper
                            sx={{
                                width: "100%",
                                height: "60%",
                                overflow: "hidden",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundImage: `url(https://api.yimian.xyz/img?type=wallpaper)`
                                }}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>

}

export default HomePage