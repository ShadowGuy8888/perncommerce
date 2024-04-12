import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export default function Login() {

    const navigate = useNavigate()
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.get(`http://localhost:5000/perncommerce/loginReq/${username}/${password}`)
            navigate(`/home/${response.data.data.uid}`)
            document.querySelector("p").textContent = ""
        } catch (error) {
            document.querySelector("p").textContent = error.response.data.msg
        }
        
    }

    return (
        <>
            <form>
                <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Login</button>
                <p></p>
                <span>Don't have an account yet? <a onClick={() => navigate("/register")}>Register</a></span>
            </form>
        </>
    )
}