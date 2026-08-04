import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { UsersContext } from "../UsersContext/UsersContext";

// Hooks
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const UsersProvider = ({ children }) => {
  // ===================================================================
  // 1.STATES & HOOKS
  // ===================================================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const timeOutRef = useRef(null);

  const [users, setUsers] = useLocalStorage("users", []);
  const [userLogged, setUserLogged] = useLocalStorage("userLogged", "");

  // ===================================================================
  // 2.HELPERS (Internal auxiliary functions)
  // ===================================================================

  /**
   * Displays a temporary error message and clears previous timeouts.
   */
  const showTemporaryMessage = useCallback((text, duration) => {
    setMessage(text);
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => setMessage(null), duration);
  }, []);

  // ===================================================================
  // 3.ACTIONS (Business Rules and Authentication)
  // ===================================================================
  const register = useCallback(
    (name, email, cpf, date, phone, password) => {
      const emailExist = users?.some((user) => user.email === email);

      if (emailExist) {
        showTemporaryMessage("Este E-mail já está cadastrado", 3000);
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        name: name,
        email: email,
        cpf: cpf,
        date: date,
        phone: phone,
        password: password,
      };

      setUsers((prev) => [...prev, newUser]);
      navigate("/login");
    },
    [navigate, setUsers, users, showTemporaryMessage],
  );

  const login = useCallback(
    (email, password) => {
      const user = users.find(
        (user) => user.email === email && user.password === password,
      );

      if (!user) {
        showTemporaryMessage("Usuário ou senha incorretos", 5000);
        return;
      }
      setUserLogged(user);
      navigate("/");
    },
    [navigate, setUserLogged, users, showTemporaryMessage],
  );

  const logout = useCallback(() => {
    setUserLogged("");
    navigate("/");
  }, [navigate, setUserLogged]);

  // =================================================================
  // 4.EFFECTS (Cleaning)
  // =================================================================
  useEffect(() => {
    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, []);

  // =================================================================
  // 5.MEMOIZATION & RETURN
  // =================================================================
  const contextValue = useMemo(
    () => ({
      users,
      login,
      logout,
      message,
      userLogged,
      setUserLogged,
      register,
      email,
      setEmail,
      password,
      setPassword,
      name,
      setName,
      cpf,
      setCpf,
      date,
      setDate,
      phone,
      setPhone,
    }),
    [
      users,
      login,
      logout,
      message,
      userLogged,
      setUserLogged,
      register,
      email,
      setEmail,
      name,
      setName,
      cpf,
      setCpf,
      date,
      setDate,
      phone,
      setPhone,
      password,
      setPassword,
    ],
  );

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};
