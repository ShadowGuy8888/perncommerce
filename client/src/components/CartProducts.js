import React from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import ProductCard from "./ProductCard"


export default function CartProducts() {

    const { user_uid } = useParams()
    const navigate = useNavigate()
    const [cartProducts, setCartProducts] = React.useState([])

    React.useEffect(() => {
        (async() => {
            try {
                const response = await axios.get(`http://localhost:5000/perncommerce/${user_uid}/cartProducts`)
                setCartProducts(response.data.data.rows)
                console.log(response.data.data.rows)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])
    console.log(cartProducts)
    return (
        <>
            {
                cartProducts.map(product => <ProductCard
                    uid={product.uid}
                    name={product.name}
                    description={product.description}
                    image={product.image}
                    price={product.price}
                    availableQty={product.available_qty}
                    productUID={product.uid}
                    sum={product.sum} />)
            }
            <button onClick={() => navigate(`/home/${user_uid}`)}>Back to home</button>
        </>
    )
}