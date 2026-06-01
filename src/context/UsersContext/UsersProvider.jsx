import { UsersContext } from "../UsersContext/UsersContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UsersProvider = ({ children }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useLocalStorage("users", []);
  const [userLogged, setUserLogged] = useLocalStorage("userLogged", "");

  const userRegister = (name, email, password) => {
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
    };

    setUsers((prev) => [...prev, user]);
  };

  const userValidation = (email, password) => {
    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      setMessage("Usuário ou senha incorretos");
      setTimeout(() => {
        setMessage(null);
      }, 5000);

      return;
    }
    setUserLogged(user);
    navigate("/");
  };

  return (
    <UsersContext.Provider
      value={{
        userRegister,
        users,
        userValidation,
        message,
        userLogged,
        setUserLogged,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
