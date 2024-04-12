import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ProductCard from "./ProductCard"
import axios from "axios"


export default function LocalProducts() {

    const { user_uid } = useParams()
    const navigate = useNavigate()
    const [localProducts, setLocalProducts] = React.useState([])

    React.useEffect(() => {
        (async() => {
            const response = await axios.get(`http://localhost:5000/perncommerce/${user_uid}/products`)
            setLocalProducts(response.data.data.rows)
        })()
    }, [])
    
    return (
        <>
        <h1>My products</h1>
            <button onClick={() => navigate(`/home/${user_uid}`)}>Back</button>
            <button onClick={() => navigate(`/home/${user_uid}/myProducts/addProduct`)}>Add New Product</button>
            
            {localProducts.map(product => <ProductCard
                uid={product.uid}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                availableQty={product.available_qty} />)}
            
        </>
    )
}