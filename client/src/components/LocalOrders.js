import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import ProductCard from "./ProductCard"


export default function LocalOrders() {

    const { user_uid } = useParams()
    const navigate = useNavigate()
    const [localOrders, setLocalOrders] = React.useState([])

    React.useEffect(() => {
        (async() => {
            try {  
                const response = await axios.get(`http://localhost:5000/perncommerce/${user_uid}/orderList`)
                setLocalOrders(response.data.data.rows)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <>
            <button onClick={() => navigate(`/home/${user_uid}`)}>Back</button>
            {
                localOrders.map(order => <ProductCard
                    name={order.name}
                    description={order.description}
                    image={order.image}
                    price={order.price}
                    orderQty={order.qty} />)
            }
        </>
    )
}