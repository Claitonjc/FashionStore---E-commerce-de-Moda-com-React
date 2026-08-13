import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState } from "react";

// Hooks
import { useUsers } from "../../hooks/useUsers";

// Components
import { Header } from "../../components/Header/Header";
import { AuthLayout } from "../../components/AuthLayout/AuthLayout";
import { Input } from "../../components/Input/Input";
import { Footer } from "../../components/Footer/Footer";

// Utils
import { maskPhone, maskCpf } from "../../utils/masks";

export const Register = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");

  const { register, message, userLogged } = useUsers();

  // =========================================================================
  // 2. ACTIONS
  // =========================================================================
  const userRegister = (event) => {
    event.preventDefault();

    register(name, email, cpf, date, phone, password);
    setName("");
    setEmail("");
    setPassword("");
    setCpf("");
    setDate("");
    setPhone("");
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
          title="Criar conta!"
          buttonText="Cadastrar"
          onSubmit={userRegister}
        >
          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="Nome"
              label="Nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              type="email"
              placeholder="E-mail"
              label="E-mail:"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div className="flex flex-col gap-2 lg:flex-row">
              <Input
                type="text"
                placeholder="CPF"
                label="CPF:"
                value={cpf}
                onChange={(event) => setCpf(maskCpf(event.target.value))}
              />
              <Input
                type="date"
                placeholder="Data de Nascimento"
                label="Data de Nascimento:"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 lg:flex-row">
              <Input
                type="text"
                placeholder="Telefone Celular"
                label="Telefone/Celular:"
                value={phone}
                onChange={(event) => setPhone(maskPhone(event.target.value))}
              />
              <Input
                type="password"
                placeholder="Senha"
                label="Senha:"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <p className="text-alert mt-3 min-h-5 text-center text-[12px]">
              {message}
            </p>
          </div>
        </AuthLayout>
      </main>
      <Footer />
    </div>
  );
};
