import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import ProductCard from "./ProductCard"


export default function Home() {

    const { user_uid } = useParams()
    const [userInfo, setUserInfo] = React.useState({})
    const [allProducts, setAllProducts] = React.useState([])
    const navigate = useNavigate()
    
    React.useEffect(() => {
        (async() => {
            try {
                const response = await axios.get(`http://localhost:5000/perncommerce/registeredUsers/${user_uid}`)
                setUserInfo(response.data.rows[0])
            } catch (error) {
                console.error(error.message)
            }
        })()
        
    }, [])

    React.useEffect(() => {
        (async() => {
            try {
                const response = await axios.get(`http://localhost:5000/perncommerce/products`)
                setAllProducts(response.data.data.rows)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    // function handleLogout() {
    //     navigate("/login")
    // }

    // function handleSell() {

    // }
    
    console.log(userInfo)
    return (
        <>
            {Object.keys(userInfo).length !== 0 &&
            <>
                <p>Username: {userInfo.username}</p>
                <p>Password: {userInfo.password}</p>
                <p>Email: {userInfo.email}</p>
                <p>UUID: {userInfo.uid}</p>
                <button onClick={() => navigate("/login")}>Logout</button>
                <button onClick={() => navigate(`/home/${user_uid}/myProducts`)}>My Products</button>
                <button onClick={() => navigate(`/home/${user_uid}/myCart`)}>My Cart</button>
                <button onClick={() => navigate(`/home/${user_uid}/myOrders`)}>My Orders</button>
                {allProducts.map(product => <ProductCard
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                availableQty={product.available_qty}
                uid={product.uid} />)}
            </>}
        </>
    )
}