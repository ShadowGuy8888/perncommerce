import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EcommerceContextProvider } from "./context/EcommerceContext"
import RegistrationPage from "./routes/RegistrationPage"
import HomePage from "./routes/HomePage";
import './App.css';
import LoginPage from "./routes/LoginPage";
import LocalProductsPage from "./routes/LocalProductsPage";
import AddProductPage from "./routes/AddProductPage";
import ViewProductPage from "./routes/ViewProductPage";
import CartProductsPage from "./routes/CartProductsPage";
import LocalOrdersPage from "./routes/LocalOrdersPage";
import LocalProductEditPage from "./routes/LocalProductEditPage";


function App() {
  
  return (
    <EcommerceContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/register" element={<RegistrationPage />}></Route>
            <Route exact path={`/home/:user_uid`} element={<HomePage />}></Route>
            <Route exact path="/login" element={<LoginPage />}></Route>
            <Route exact path="/home/:user_uid/myProducts" element={<LocalProductsPage />}></Route>
            <Route exact path="/home/:user_uid/myProducts/addProduct" element={<AddProductPage />}></Route>
            <Route exact path="/home/:user_uid/myProducts/:product_uid/edit" element={<LocalProductEditPage />}></Route>
            <Route exact path="/home/:user_uid/:product_uid" element={<ViewProductPage />}></Route>
            <Route exact path="/home/:user_uid/myCart" element={<CartProductsPage />}></Route>
            <Route exact path="/home/:user_uid/myOrders" element={<LocalOrdersPage />}></Route>
          </Routes>
        </Router>
      </div>
    </EcommerceContextProvider>
  );
}

export default App;
