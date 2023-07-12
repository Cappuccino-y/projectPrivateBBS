import {useState} from "react";
import LoginForm from "../components/LoginForm";
import Notification from "../components/Notification";

const LoginPage = ({handleLogin, message, setMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    return <div className={"flexCenter animation"} style={{minHeight: '90vh'}}>
        <Notification message={message}/>
        <LoginForm
            handleLogin={handleLogin}
            setMessage={setMessage}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
        />
    </div>
}

export default LoginPage