import { useCallback, useEffect, useRef, useState } from "react";

// Hooks
import { useUsers } from "../../hooks/useUsers";

// Components
import { Input } from "../Input/Input";
import { InputTypePassword } from "../InputTypePassword/InputTypePassword";

// Assets (Imagens, ícones locais, SVGs)
import { IoMdClose } from "react-icons/io";
import { TbPasswordUser } from "react-icons/tb";

// Utils
import { maskCpf } from "../../utils/masks";

export const ForgotPasswordModal = ({ onClose }) => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const { users, editingPassword } = useUsers();

  const timeOutRef = useRef(null);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [message, setMessage] = useState("");
  const [userDataConfirmed, setUserDataConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
  });

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

  // =========================================================================
  // 3. ACTIONS
  // =========================================================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    const formattedValue = name === "cpf" ? maskCpf(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleResetPasswordSubmit = (event) => {
    event.preventDefault();

    const foundUser = users.find(
      (user) => user.email === formData.email && user.cpf === formData.cpf,
    );

    if (!foundUser) {
      showTemporaryMessage(
        "E-mail e/ou CPF não conferem ou não cadastrados.",
        3000,
      );
      setFormData({
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
      });
      return;
    }
    setMessage("");
    setUserIdToUpdate(foundUser.id);
    setUserDataConfirmed(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isSame = formData.password === formData.confirmPassword;

    if (!isSame) {
      showTemporaryMessage("As Senhas não são iguais.", 3000);
      return;
    }

    const userToUpdate = users.find((user) => user.id === userIdToUpdate);

    setMessage("");
    editingPassword(userToUpdate, formData);
    onClose();
  };

  // =================================================================
  // 4.EFFECTS (Cleaning)
  // =================================================================
  useEffect(() => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  }, []);

  // ==========================================================================
  // 5. RENDER
  // ==========================================================================
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="border-borders/30 relative flex max-h-[90vh] w-[90%] max-w-md flex-col items-center overflow-y-auto rounded-xl border bg-white p-7 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="hover:text-alert absolute top-4 right-4 cursor-pointer text-[24px] text-gray-500 transition-colors"
        >
          <IoMdClose />
        </button>
        <div className="flex items-center gap-2 text-[20px]">
          <TbPasswordUser />
          <h1>Redefinição de Senha</h1>
        </div>
        <form onSubmit={handleResetPasswordSubmit} className="flex flex-col">
          <Input
            label="E-mail:"
            type="email"
            placeholder="Confirme seu e-mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={userDataConfirmed}
          />
          <Input
            label="CPF:"
            type="text"
            placeholder="Confirme seu CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            disabled={userDataConfirmed}
          />
          {message && !userDataConfirmed && (
            <p className="text-alert text-center text-[12px]">{message}</p>
          )}
          {!userDataConfirmed && (
            <button
              type="submit"
              className="bg-button-primary hover:bg-button-hover mt-4 w-full cursor-pointer rounded-xl py-3 font-medium transition"
            >
              Confirmar
            </button>
          )}
        </form>
        {userDataConfirmed && (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div>
              <InputTypePassword
                label="Nova Senha:"
                type="password"
                placeholder="Digite a senha"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputTypePassword
                label="Confirme a senha"
                type="password"
                placeholder="Digite a senha"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {message && (
              <p className="text-alert mt-2 text-center text-[12px]">
                {message}
              </p>
            )}
            <button
              type="submit"
              className="bg-button-primary hover:bg-button-hover mt-4 w-full cursor-pointer rounded-xl py-3 font-medium transition"
            >
              Confirmar
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
