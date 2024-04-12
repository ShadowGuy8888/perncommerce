import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


export default function AddProduct() {

    const navigate = useNavigate()
    const { user_uid } = useParams()
    
    const [productName, setProductName] = React.useState(null)
    const [productDescription, setProductDescription] = React.useState(null)
    const [productImage, setProductImage] = React.useState(null)
    const [productPrice, setProductPrice] = React.useState(null)
    const [availableQty, setAvailableQty] = React.useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:5000/perncommerce/soldProducts`, {
                productName,
                productDescription,
                productImage,
                productPrice,
                availableQty,
                user_uid
            })
            navigate(`/home/${user_uid}/myProducts`)
        } catch (error) {
            console.log(error)
            document.querySelector("p").textContent = error.response.data.msg
        }
    }

    return (
        <>
            <h1>New product</h1>
            <button onClick={() => navigate(`/home/${user_uid}/myProducts`)}>Back</button>
            <form>
                <input placeholder="product name" onChange={(e) => setProductName(e.target.value)} />
                <textarea placeholder="product description" onChange={(e) => setProductDescription(e.target.value)} />
                <input placeholder="product image" onChange={(e) => setProductImage(e.target.value)} />
                <input placeholder="price" type="number" min={1} onChange={(e) => setProductPrice(e.target.value)} />
                <input placeholder="available qty" type="number" min={0} onChange={(e) => setAvailableQty(e.target.value)} />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Add Product</button>
                <p></p>
            </form>
        </>
    )
}