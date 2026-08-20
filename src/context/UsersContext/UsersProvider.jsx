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
      const emailExist = users.some((user) => user.email === email);

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

  const editingUser = useCallback(
    (formData) => {
      const updateUser = { ...userLogged, ...formData };

      setUserLogged(updateUser);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updateUser.id ? updateUser : user,
        ),
      );

      navigate("/");
    },
    [navigate, setUserLogged, setUsers, userLogged],
  );

  const editingPassword = useCallback(
    (user, formData) => {
      const updateUser = { ...user, ...formData };

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updateUser.id ? updateUser : user,
        ),
      );
    },
    [setUsers],
  );

  const deleteAccount = useCallback(
    (account) => {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== account.id),
      );
    },
    [setUsers],
  );

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
      editingUser,
      deleteAccount,
      editingPassword,
    }),
    [
      users,
      login,
      logout,
      message,
      userLogged,
      setUserLogged,
      register,
      editingUser,
      deleteAccount,
      editingPassword,
    ],
  );

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};
