import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { ProductDetails } from "../pages/ProductsDetails/ProductDetails";
import { Cart } from "../pages/Cart/Cart";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { UsersProvider } from "../context/UsersContext/UsersProvider";
import { Address } from "../pages/Address/Address";
import { Payment } from "../pages/Payment/Payment";
import { Shipping } from "../pages/Shipping/Shipping";
import { Checkout } from "../pages/Checkout/Checkout";
import { PurchaseComplete } from "../pages/PurchaseComplete/PurchaseComplete";
import { Profile } from "../pages/Profile/Profile";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/details/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/address" element={<Address />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/complete" element={<PurchaseComplete />} />
    </Routes>
  );
};
