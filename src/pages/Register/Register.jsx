import { Header } from "../../components/Header/Header";
import { AuthLayout } from "../../components/AuthLayout/AuthLayout";
import { Input } from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { useUsers } from "../../hooks/useUsers";
import { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const { userRegister } = useUsers();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const userSignUp = () => {
    userRegister(name, email, password);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 flex-col items-center justify-center">
        <AuthLayout
          title="Create Your Account"
          buttonText="Sign up"
          onSubmit={userSignUp}
        >
          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="Name"
              label="Name"
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
            <Input
              type="password"
              placeholder="Password"
              label="Password:"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </AuthLayout>
      </main>
      <Footer />
    </div>
  );
};
