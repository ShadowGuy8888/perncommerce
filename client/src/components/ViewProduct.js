import React from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"


export default function ViewProduct() {

    const { user_uid, product_uid } = useParams()
    const [product, setProduct] = React.useState({})
    const [selectingCartQty, setSelectingCartQty] = React.useState(false)
    const [selectingOrderQty, setSelectingOrderQty] = React.useState(false)
    const [cartQty, setCartQty] = React.useState(0)
    const [orderQty, setOrderQty] = React.useState(0)
    const navigate = useNavigate()
    
    React.useEffect(() => {
        (async() => {
            const response = await axios.get(`http://localhost:5000/perncommerce/products/${product_uid}`)
            setProduct(response.data.data.rows[0])
        })()
    }, [])

    return (
        <>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <img src={`${product.image}`} style={{width: "20%", height: "auto"}}></img>
            <p>{product.price}</p>
            <p>Remaining: {product.available_qty}</p>
            <button onClick={() => setSelectingOrderQty(true)}>Place order</button>
            <button onClick={() => setSelectingCartQty(true)}>Add to cart</button>
            <button onClick={() => navigate(`/home/${user_uid}`)}>Back to home</button>
            {
                selectingCartQty &&
                <div style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    zIndex: 1}}>
                    <div style={{
                        backgroundColor: "white",
                        zIndex: 2,
                        width: 300,
                        height: 200,
                        position: "relative",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        <input type="number" placeholder="Input Cart Qty" min={1} onChange={(e) => setCartQty(e.target.value)} />
                        <button onClick={(Number(cartQty) > 0) ? () => {
                            (async() => {
                                const response = await axios.post("http://localhost:5000/perncommerce/cartProducts", {
                                    userUID: user_uid,
                                    productUID: product_uid,
                                    qty: cartQty
                                })
                            })()
                            setSelectingCartQty(false)
                        } : () => {}}>Add {`${cartQty} ${product.name}`} to cart</button>
                        {/* If cartQty = "", Number(cartQty) will evaluate to 0 and 0>0 is false */}
                        <button onClick={() => {
                            setSelectingCartQty(false)
                            setCartQty(0)
                        }}>Close</button>
                    </div>
                </div>
            }   {
                selectingOrderQty &&
                <div style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    zIndex: 1}}>
                    <div style={{
                        backgroundColor: "white",
                        zIndex: 2,
                        width: 300,
                        height: 200,
                        position: "relative",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        <input type="number" placeholder="Input Order Qty" min={1} onChange={(e) => setOrderQty(e.target.value)} />
                        <button onClick={(Number(orderQty) > 0) ? () => {
                            (async() => {
                                const product = (await axios.get(`http://localhost:5000/perncommerce/products/${product_uid}`)).data.data.rows[0]
                                
                                if (product.available_qty - orderQty >= 0) {
                                    const response = await axios.post(`http://localhost:5000/perncommerce/orderList`, {
                                        product_uid,
                                        name: product.name,
                                        description: product.description,
                                        image: product.image,
                                        price: product.price,
                                        qty: orderQty,
                                        customer_uid: user_uid,
                                        seller_uid: product.user_uid
                                    })
                                    await axios.put(`http://localhost:5000/perncommerce/soldProducts/${product_uid}/${product.available_qty - orderQty}`)
                                    setSelectingOrderQty(false)
                                    navigate(0)
                                }
                            })()
                        } : () => {}}>Add {`${orderQty} ${product.name}`} to order</button>
                        <button onClick={() => {
                            setSelectingOrderQty(false)
                            setOrderQty(0)
                        }}>Close</button>
                    </div>
                </div>
            }
        </>
    )
}