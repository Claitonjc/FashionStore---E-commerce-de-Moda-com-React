import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

// Hooks
import { useCart } from "../../hooks/useCart";
import { useUsers } from "../../hooks/useUsers";

// Assets (Imagens, ícones locais, SVGs)
import logoFundoPreto from "../../assets/logoFundoPreto.png";

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
    <header className="bg-dark relative flex h-28 w-full items-center justify-center">
      <Link to="/">
        <img
          src={logoFundoPreto}
          alt="Página principal da Fashion Store"
          className="w-2xs"
        />
      </Link>
      <div className="absolute right-7 flex items-center gap-5">
        {userLogged ? (
          <nav className="text-light mr-10 flex gap-8 text-[12px]">
            <Link to="/profile">{userLogged.name}</Link>
            <button type="button" onClick={logout} className="cursor-pointer">
              Sair
            </button>
          </nav>
        ) : (
          <nav className="text-light mr-10 flex gap-8 text-[12px]">
            <Link to="/login">Entrar</Link>
            <Link to="/register">Cadastrar</Link>
          </nav>
        )}
        <Link
          aria-label="Open Cart"
          className="text-dark hover:text-button-hover relative mt-1.5 mr-8 flex cursor-pointer items-center"
          to="/cart"
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
