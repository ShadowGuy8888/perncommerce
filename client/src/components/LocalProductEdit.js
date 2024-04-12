import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"


export default function LocalProductEdit() {

    const { user_uid, product_uid } = useParams()
    const navigate = useNavigate()
    const [editedProduct, setEditedProduct] = React.useState({})

    React.useEffect(() => {
        (async() => {
            try {
                const response = await axios.get(`http://localhost:5000/perncommerce/products/${product_uid}`)
                setEditedProduct(response.data.data.rows[0])
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <>
            <input placeholder="product name" value={editedProduct.name} onChange={(e) => setEditedProduct(prevEditedProduct => (
                {
                    ...prevEditedProduct,
                    name: e.target.value
                }
            ))} />
            <textarea placeholder="product description" value={editedProduct.description} onChange={(e) => setEditedProduct(prevEditedProduct => (
                {
                    ...prevEditedProduct,
                    description: e.target.value
                }
            ))} />
            <input placeholder="product image" value={editedProduct.image} onChange={(e) => setEditedProduct(prevEditedProduct => (
                {
                    ...prevEditedProduct,
                    image: e.target.value
                }
            ))} />
            <input placeholder="price" type="number" min={1} value={editedProduct.price} onChange={(e) => setEditedProduct(prevEditedProduct => (
                {
                    ...prevEditedProduct,
                    price: e.target.value
                }
            ))} />
            <input placeholder="available qty" type="number" min={0} value={editedProduct.available_qty} onChange={(e) => setEditedProduct(prevEditedProduct => (
                {
                    ...prevEditedProduct,
                    available_qty: e.target.value
                }
            ))} />
            <button onClick={() => {
                (async() => {
                    const response = await axios.put("http://localhost:5000/perncommerce/soldProducts", editedProduct)
                    await axios.put("http://localhost:5000/perncommerce/orderList", editedProduct)
                    navigate(`/home/${user_uid}/myProducts`)
                })()
            }}>Edit</button>
        </>
    )
}