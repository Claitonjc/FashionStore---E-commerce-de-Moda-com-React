import { Link } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { AuthLayout } from "../../components/AuthLayout/AuthLayout";
import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";

export const Login = () => {
  const { userValidation, message } = useUsers();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (event) => {
    event.preventDefault();

    userValidation(email, password);
  };

  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 flex-col items-center justify-center">
        <AuthLayout
          title="Welcome Back"
          buttonText="Sign in"
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
            <Input
              type="password"
              placeholder="Password"
              label="Password:"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Link
              to="#"
              className="text-borders hover:text-dark mt-2 w-full self-end text-xs transition"
            >
              Forgot my password
            </Link>
            <p className="text-alert mt-1 min-h-5 text-center text-[12px]">
              {message}
            </p>
          </div>
        </AuthLayout>
      </main>
      <Footer />
    </div>
  );
};
