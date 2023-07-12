import {useNavigate} from "react-router-dom";
import {Button, Container} from "@mui/material";

const HomePage = () => {
    const navigate = useNavigate()
    const switchPage = () => {
        navigate('/login')
    }
    return <div style={{display: "flex", height: "90vh", justifyContent: "center", alignItems: "center"}}><Button
        variant="outlined"
        onClick={switchPage}>Welcome</Button>
    </div>
}

export default HomePage