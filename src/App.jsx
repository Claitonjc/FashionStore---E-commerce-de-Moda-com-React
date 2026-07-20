import { AppRoutes } from "./routes/AppRoutes";
import { Home } from "./pages/Home/Home";
import { ProductList } from "./components/ProductList/ProductList";
import { CartProvider } from "./context/cartContext/CartProvider";
import { UsersProvider } from "./context/UsersContext/UsersProvider";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { CheckoutProvider } from "./context/checkoutContext/CheckoutProvider";
import { AddressProvider } from "./context/addressContext/AddressProvider";

function App() {
  return (
    <BrowserRouter>
      <UsersProvider>
        <CartProvider>
          <AddressProvider>
            <CheckoutProvider>
              <AppRoutes />
            </CheckoutProvider>
          </AddressProvider>
        </CartProvider>
      </UsersProvider>
    </BrowserRouter>
  );
}

export default App;
