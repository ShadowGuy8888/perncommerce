import React from "react"
import Register from "../components/Register"
import { useNavigate } from "react-router-dom"


export default function RegistrationPage() {

    const navigate = useNavigate()

    return (
        <>
            <h1>Please register</h1>
            <Register />
            
        </>
    )
}