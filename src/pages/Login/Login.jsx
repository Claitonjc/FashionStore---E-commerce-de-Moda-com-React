import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

// Hooks
import { useUsers } from "../../hooks/useUsers";

// Components
import { Input } from "../../components/Input/Input";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { AuthLayout } from "../../components/AuthLayout/AuthLayout";
import { ForgotPasswordModal } from "../../components/ForgotPasswordModal/ForgotPasswordModal";
import { InputTypePassword } from "../../components/InputTypePassword/InputTypePassword";

export const Login = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const { login, message, userLogged } = useUsers();
  // =========================================================================
  // 2. ACTIONS
  // =========================================================================
  const loginUser = (event) => {
    event.preventDefault();

    login(email, password);
  };

  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  // =========================================================================
  // 3. GUARDS & REDIRECTS
  // =========================================================================
  if (userLogged) {
    return <Navigate to="/" replace />;
  }

  // =========================================================================
  // 4. RENDER
  // =========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 flex-col items-center justify-center">
        <AuthLayout
          title="Bem vindo de volta!"
          buttonText="Entrar"
          onSubmit={loginUser}
        >
          <div className="flex flex-col">
            <Input
              type="email"
              placeholder="E-mail"
              label="E-mail:"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputTypePassword
              type="password"
              placeholder="Senha"
              label="Senha:"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openModal();
              }}
              className="text-borders hover:text-dark mt-2 w-full cursor-pointer text-right text-xs transition"
            >
              Esqueci minha senha
            </button>
            <p className="text-alert mt-1 min-h-5 text-center text-[12px]">
              {message}
            </p>
          </div>
        </AuthLayout>
        {isModalActive && <ForgotPasswordModal onClose={closeModal} />}
      </main>
      <Footer />
    </div>
  );
};
