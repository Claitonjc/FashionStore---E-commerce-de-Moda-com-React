import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { ProductDetails } from "../pages/ProductsDetails/ProductDetails";
import { Carrinho } from "../pages/Carrinho/Carrinho";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { UsersProvider } from "../context/UsersContext/UsersProvider";
import { Address } from "../pages/Address/Address";
import { Payment } from "../pages/Payment/Payment";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<ProductDetails />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/address" element={<Address />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
};
