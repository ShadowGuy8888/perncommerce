import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"


export default function ProductCard(props) {

    const navigate = useNavigate()
    const { user_uid } = useParams()
    const location = useLocation()

    // React.useEffect(() => {

    //     if (location.pathname.split("/")[location.pathname.split("/").length - 1] !== "myProducts") {
    //         console.log("jjj")
    //         document.querySelector(".card").addEventListener("click", handleClick)
    //     }
    //     return () => {
    //         document.removeEventListener("click", handleClick)
    //     }
    // }, [])

    async function handleEdit() {

    }

    async function handleDelete(productUID) {
        try {
            const response = await axios.delete(`http://localhost:5000/perncommerce/products/${productUID}`)
            // navigate(`/home/${user_uid}`)
            // navigate(`/home/${user_uid}/myProducts`)
            navigate(0)
        } catch (error) {
            console.error(error)
        }
    }
console.log(props.uid)
    return (
        <>
            <div style={{
                backgroundColor: "gray",
                width: 250,
                height: 300,
                margin: 10,
                width: "fit-content",
                height: "auto",
                maxWidth: 250,
                minWidth: 250
            }} className="card" onClick={
                location.pathname.split("/")[location.pathname.split("/").length - 1] === user_uid || 
                    location.pathname.split("/")[location.pathname.split("/").length - 1] === "myCart" ? () => {
                        navigate(`/home/${user_uid}/${props.uid}`)
                    } : () => {}
            }>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                <h1>{props.name}</h1>
                <img src={`${props.image}`} style={{
                    width: 75,
                    height: 100
                }}></img>
                <p>{props.description}</p>
                <p>${props.price}</p>
                {location.pathname.split("/")[location.pathname.split("/").length - 1] !== "myOrders" ? 
                    <p>Remaining: {props.availableQty}</p> : <p>Order Qty: {props.orderQty}</p>}
                {location.pathname.split("/")[location.pathname.split("/").length - 1] === "myProducts" &&
                <>
                    <button onClick={() => handleDelete(props.uid)}>Delete</button>
                    <button onClick={() => {
                        navigate(`/home/${user_uid}/myProducts/${props.uid}/edit`)
                    }}>Edit</button>
                </>
                }
                {
                    location.pathname.split("/")[location.pathname.split("/").length - 1] === "myCart" &&
                        <>
                            <p>Cart Qty: {props.sum}</p>
                            <button>Place order</button>
                            <button onClick={() => {
                                (async() => {
                                    const response = await axios.delete(`http://localhost:5000/perncommerce/${user_uid}/cartProducts/${props.productUID}`)
                                    navigate(0)
                                })()
                            }}>Remove from cart</button>
                        </>
                }
            </div>
            </div>
        </>
    )
}