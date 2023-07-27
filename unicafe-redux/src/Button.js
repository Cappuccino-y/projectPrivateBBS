import React, {useContext} from "react";
import ExampleContext from "./ExampleContext";


const Button = () => {
    const val = useContext(ExampleContext)
    return <button onClick={val.good}>good</button>
}
export default Button