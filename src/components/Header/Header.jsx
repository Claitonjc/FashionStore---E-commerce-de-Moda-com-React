import logoFundoPreto from "../../assets/logoFundoPreto.png";
import { BsCart3 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useUsers } from "../../hooks/useUsers";

export const Header = () => {
  const { userLogged, setUserLogged } = useUsers();
  const { carts } = useCart();
  const userCart = carts.find((cart) => cart.userId === userLogged.id);

  const navigation = useNavigate();

  const handleCartNavigationLink = () => {
    navigation("/carrinho");
  };

  return (
    <header className="bg-dark relative flex h-28 w-full items-center justify-center">
      <img src={logoFundoPreto} alt="Fashion Store" className="w-2xs" />
      <div className="absolute right-7 flex items-center gap-5">
        {userLogged ? (
          <div className="text-light mr-10 flex gap-8 text-[12px]">
            <button>{userLogged.name}</button>
            <button
              type="button"
              onClick={() => setUserLogged("")}
              className="cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-light mr-10 flex gap-8 text-[12px]">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}
        <button
          aria-label="Abrir carrinho"
          onClick={handleCartNavigationLink}
          className="text-dark hover:text-button-hover relative mt-1.5 mr-8 flex cursor-pointer items-center"
        >
          <BsCart3 className="text-light text-3xl" />
          {userCart && userCart.items.length > 0 && (
            <span className="bg-button-primary text-dark absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold">
              {userCart.items.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
