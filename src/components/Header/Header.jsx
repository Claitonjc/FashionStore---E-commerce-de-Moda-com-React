import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { useUsers } from "../../hooks/useUsers";

import logoFundoPreto from "../../assets/logoFundoPreto.png";

export const Header = () => {
  // Hooks
  const { userLogged, setUserLogged } = useUsers();
  const { currentCart } = useCart();

  const cartQuantity = currentCart?.items.length ?? 0;

  // Handlers
  const handleLogout = () => {
    setUserLogged(null);
  };

  return (
    <header className="bg-dark relative flex h-28 w-full items-center justify-center">
      <Link to="/">
        <img
          src={logoFundoPreto}
          alt="Go to the fashion store homepage"
          className="w-2xs"
        />
      </Link>
      <div className="absolute right-7 flex items-center gap-5">
        {userLogged ? (
          <nav className="text-light mr-10 flex gap-8 text-[12px]">
            <Link to="/profile">{userLogged.name}</Link>
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer"
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav className="text-light mr-10 flex gap-8 text-[12px]">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </nav>
        )}
        <Link
          aria-label="Abrir carrinho"
          className="text-dark hover:text-button-hover relative mt-1.5 mr-8 flex cursor-pointer items-center"
          to="/carrinho"
        >
          <BsCart3 className="text-light text-3xl" />
          {cartQuantity > 0 && (
            <span className="bg-button-primary text-dark absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold">
              {cartQuantity}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
