const express = require("express")
const cors = require("cors")
const db = require("./db")
const all = require("all")
const { upperCase } = require("lodash")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/perncommerce/registeredUsers/:uid", async (req, res) => {
    try {
        const userInfo = await db.query("SELECT * FROM users WHERE uid = $1", [req.params.uid])
        res.json(userInfo)
    } catch (error) {
        console.error(error)
    }
})

app.get("/perncommerce/loginReq/:username/:password", async (req, res) => {
    const userExists = await db.query("SELECT * FROM users WHERE username=$1 AND password=$2;", [
        req.params.username,
        req.params.password
    ])
    console.log(userExists)
    if (userExists.rows.length === 0) {
        res.status(400).json({
            success: "false",
            msg: "username/password is invalid"
        })
    } else {
        res.json({
            success: true,
            data: userExists.rows[0]
        })
    }
})

app.get("/perncommerce/products", async (req, res) => {
    try {
        const allProducts = await db.query("SELECT * FROM sold_products")
        res.json({
            success: true,
            data: allProducts
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/perncommerce/products/:uid", async (req, res) => {
    // get seller_uid based on specified product_uid
    try {
        const product = await db.query("SELECT * FROM sold_products WHERE uid = $1", [req.params.uid])
        res.json({
            success: true,
            data: product
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/perncommerce/:uid/products", async (req, res) => {
    
    try {
        const localProducts = await db.query("SELECT * FROM sold_products WHERE user_uid = $1", [req.params.uid])
        res.json({
            success: true,
            data: localProducts
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/perncommerce/:uid/cartProducts", async (req, res) => {
    try {
        const userCartProducts = await db.query("SELECT cart_products.uid, SUM(qty), cart_products.user_uid, name, description, image, price, available_qty, sold_products.user_uid AS seller_uid FROM cart_products JOIN sold_products ON cart_products.uid = sold_products.uid AND cart_products.user_uid = $1 GROUP BY cart_products.uid, cart_products.user_uid, name, description, image, price, available_qty, sold_products.user_uid;", [req.params.uid])
        res.json({
            success: true,
            data: userCartProducts
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/perncommerce/:customerUID/orderList", async (req, res) => {
    try {
        const customerOrders = await db.query("SELECT * FROM order_list WHERE customer_uid = $1", [req.params.customerUID])
        res.json({
            success: true,
            data: customerOrders
        })
    } catch (error) {
        console.error(error)
    }
})

app.get("/perncommerce/:uid/orderList")

app.post("/perncommerce/registeredUsers", async (req, res) => {
    for (key of Object.keys(req.body)) {
        if (req.body[key] === "") {
            req.body[key] = null
        }
    }
    try {
        // if (req.body.username !== "" && req.body.password !== "" && req.body.email !== "") {
            const newUser = await db.query("INSERT INTO users (uid, username, password, email) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *;", [
                req.body.username,
                req.body.password,
                req.body.email
            ])
            res.json({
                success: true,
                newUser
            })
        // } else {
            // res.status(400).json({
            //     success: false,
            //     msg: "username/password/email field is required"
            // })
        // }
    } catch (error) {
        console.log(error.message)
        if (error.message.split(" ")[0] === 'null') {
            res.status(400).json({
                success: false,
                msg: "username/password/email field is required"
            })
            return
        }
        res.status(400).json({
            success: false,
            msg: "username/email already in use"
        })
    }
})


app.post("/perncommerce/soldProducts", async (req, res) => {
    for (key of Object.keys(req.body)) {
        if (req.body[key] === "") {
            req.body[key] = null
        }
    }
    try {
        const newProduct = await db.query("INSERT INTO sold_products (uid, name, description, image, price, available_qty, user_uid) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6) RETURNING *;", [
            req.body.productName,
            req.body.productDescription,
            req.body.productImage,
            req.body.productPrice,
            req.body.availableQty,
            req.body.user_uid
        ])
        res.json({
            success: true,
            newProduct
        })
    } catch (error) {
        if (error.message.split(" ")[0] === 'null') {
                res.status(400).json({
                success: false,
                msg: "All fields are required"
            })
        }
    }
})

app.post("/perncommerce/cartProducts", async (req, res) => {
    try {
        const addedCartProduct = await db.query("INSERT INTO cart_products (uid, qty, user_uid) VALUES ($1, $2, $3) RETURNING *;", [
        req.body.productUID,
        req.body.qty,
        req.body.userUID
        ])
        res.json({
            success: true,
            data: addedCartProduct
        })
    } catch (error) {
        console.error(error)
    }
})

app.post("/perncommerce/orderList", async (req, res) => {
    try {
        const product = await db.query("INSERT INTO order_list (product_uid, name, description, image, price, qty, customer_uid, seller_uid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [
            req.body.product_uid,
            req.body.name,
            req.body.description,
            req.body.image,
            req.body.price,
            req.body.qty,
            req.body.customer_uid,
            req.body.seller_uid
        ])
        res.json({
            success: true,
            data: product
        })
    } catch (error) {
        console.error(error)
    }
})

app.put("/perncommerce/soldProducts/:uid/:remainingQty", async (req, res) => {
    try {
        const updatedQty = await db.query("UPDATE sold_products SET available_qty = $1 WHERE uid = $2 RETURNING *;", [
            req.params.remainingQty,
            req.params.uid
        ])
        res.json({
            success: true,
            data: updatedQty
        })
    } catch (error) {
        console.error(error)
    }
})

app.put("/perncommerce/soldProducts", async (req, res) => {
    try {
        const updatedProduct = await db.query("UPDATE sold_products SET name = $1, description = $2, image = $3, price = $4, available_qty = $5 WHERE uid = $6", [
            req.body.name,
            req.body.description,
            req.body.image,
            req.body.price,
            req.body.available_qty,
            req.body.uid
        ])
        res.json({
            success: true,
            data: updatedProduct
        })
    } catch (error) {
        console.error(error)
    }
})

app.put("/perncommerce/orderList", async (req, res) => {
    try {
        const updatedProduct = await db.query("UPDATE order_list SET name = $1, description = $2, image = $3, price = $4 WHERE product_uid = $5", [
            req.body.name,
            req.body.description,
            req.body.image,
            req.body.price,
            req.body.uid
        ])
        res.json({
            success: true,
            data: updatedProduct
        })
    } catch (error) {
        console.error(error)
    }
})

app.delete("/perncommerce/products/:uid", async (req, res) => {
    try {
        const deletedProduct = await db.query("DELETE FROM sold_products WHERE uid = $1", [req.params.uid])
        res.json({
            success: true,
            data: deletedProduct
        })
    } catch (error) {
        console.error(error)
    }
})

app.delete("/perncommerce/:userUID/cartProducts/:productUID", async (req, res) => {
    try {
        const deletedProductVague = await db.query("DELETE FROM cart_products WHERE uid = $1 AND user_uid = $2 RETURNING *;", [
            req.params.productUID,
            req.params.userUID
        ])
        res.json({
            success: true,
            data: deletedProductVague
        })
    } catch (error) {
        console.error(error)
    }
})


app.listen(5000, () => {
    console.log("Server is listening on port: 5000...")
})