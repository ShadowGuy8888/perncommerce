import React from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Register() {

    const [username, setUsername] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const [email, setEmail] = React.useState(null)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/perncommerce/registeredUsers", {
                username,
                password,
                email
            })
            document.querySelector("p").textContent = ""
            navigate(`/home/${response.data.newUser.rows[0].uid}`)
            
        } catch (error) {
            document.querySelector("p").textContent = error.response.data.msg
        }
    }

    return (
        <form>
            <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Register</button>
            <p></p>
            <span>Already have an account? <a onClick={() => navigate("/login")}>Sign in</a></span>
        </form>
    )
}