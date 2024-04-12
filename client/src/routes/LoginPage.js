import React from "react"
import Login from "../components/Login"
import { useNavigate } from "react-router-dom"


export default function LoginPage() {

    const navigate = useNavigate()

    return (
        <>
            <h1>Please Login</h1>
            <Login />
        </>
    )
}