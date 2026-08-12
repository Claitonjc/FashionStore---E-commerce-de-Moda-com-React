import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

// Hooks
import { useCart } from "../../hooks/useCart";
import { useUsers } from "../../hooks/useUsers";

// Assets (Imagens, ícones locais, SVGs)
import logofundopreto from "../../assets/logofundopreto.png";

export const Header = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const { userLogged, logout } = useUsers();
  const { currentCart } = useCart();

  // ==========================================================================
  // 2. DERIVED DATA & CALCULATIONS
  // ==========================================================================
  const cartQuantity = currentCart?.items.length ?? 0;

  // ==========================================================================
  // 3. RENDER
  // ==========================================================================
  return (
    <header className="bg-dark flex h-40 w-full flex-col items-center justify-center sm:relative sm:h-28">
      <Link to="/">
        <img
          src={logofundopreto}
          alt="Página principal da Fashion Store"
          className="w-62.5 p-2 sm:w-75"
        />
      </Link>
      <div className="bg-light sm:text-light flex w-full items-center justify-between gap-5 pb-6 pl-3 font-semibold sm:absolute sm:right-7 sm:justify-center sm:gap-3 sm:bg-transparent sm:pb-0 md:mr-7 md:gap-5">
        {userLogged ? (
          <nav className="text-dark sm:text-light flex w-full justify-end gap-8 text-[12px] sm:justify-end sm:gap-3 md:gap-6 lg:mr-6">
            <Link to="/profile">{userLogged.name}</Link>
            <button type="button" onClick={logout} className="cursor-pointer">
              Sair
            </button>
          </nav>
        ) : (
          <nav className="text-dark sm:text-light flex w-full justify-end gap-8 text-[12px] sm:justify-end sm:gap-3 md:gap-6 lg:mr-6">
            <Link to="/login">Entrar</Link>
            <Link to="/register">Cadastrar</Link>
          </nav>
        )}
        <Link
          aria-label="Open Cart"
          className="text-dark hover:text-button-hover relative mt-1.5 mr-5 flex cursor-pointer items-center sm:mr-0"
          to="/cart"
        >
          <BsCart3 className="text-dark sm:text-light text-3xl" />
          {cartQuantity > 0 && (
            <span className="bg-button-primary text-dark absolute -top-1.5 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold">
              {cartQuantity}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};
