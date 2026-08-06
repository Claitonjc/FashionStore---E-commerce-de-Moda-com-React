import { useState } from "react";

// Hooks
import { useUsers } from "../../hooks/useUsers";

// Components
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { InputTypeFieldset } from "../../components/InputTypeFieldset/InputTypeFieldset";
import { DeleteAccountModal } from "../../components/DeleteAccountModal/DeleteAccountModal";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";

// Assets (Imagens, ícones locais, SVGs)
import { GiPadlock } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";

// Utils
import { maskPhone } from "../../utils/masks";

export const Profile = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [isModalActive, setIsModalActive] = useState(false);
  const { userLogged, editingUser, deleteAccount, logout } = useUsers();

  const [formData, setFormData] = useState(userLogged);

  // ==========================================================================
  // 2. ACTIONS
  // ==========================================================================
  const handleSubmit = (event) => {
    event.preventDefault();

    editingUser(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const formattedValue = name === "phone" ? maskPhone(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleDeleteAccount = () => {
    deleteAccount(userLogged);
    logout();
  };

  const openModal = () => {
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  // ==========================================================================
  // 3. RENDER
  // ==========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 flex-col items-center justify-center">
        <div className="border-borders/40 m-7 flex min-h-25 w-[60%] flex-col items-center gap-2 rounded-xl border bg-white p-15">
          <nav className="flex w-full items-center justify-between">
            <NavigationLink to={"/"} text="← Retornar para a loja" />
          </nav>
          <div className="flex items-center">
            <IoMdPerson className="text-[24px]" />
            <h1 className="text-dark w-full p-2 text-center text-[20px] font-semibold">
              Meus Dados
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-3 p-6"
          >
            <div className="border-borders/15 bg-light flex w-full items-center rounded-2xl border">
              <InputTypeFieldset
                label="E-mail"
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full gap-3">
              <div className="border-borders/15 bg-light flex w-full items-center rounded-2xl border">
                <InputTypeFieldset
                  label="CPF"
                  type="text"
                  name="cpf"
                  value={formData.cpf || ""}
                  disabled
                />
                <GiPadlock className="mr-3 ml-3 text-[20px]" />
              </div>
              <div className="border-borders/15 bg-light flex w-full items-center rounded-2xl border">
                <InputTypeFieldset
                  label="Data de Nascimento"
                  type="date"
                  name="date"
                  value={formData.date || ""}
                  disabled
                />
                <GiPadlock className="mr-3 ml-3 text-[20px]" />
              </div>
            </div>
            <div className="flex w-full gap-3">
              <InputTypeFieldset
                label="Nome Completo*"
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <InputTypeFieldset
                label="Telefone Celular*"
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="bg-button-primary text-dark hover:bg-button-hover mt-4 cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
            >
              Salvar Alterações
            </button>
          </form>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openModal();
            }}
            className="text-alert mr-6 cursor-pointer self-end hover:underline"
          >
            Excluir Conta
          </button>
        </div>
        {isModalActive && (
          <DeleteAccountModal
            onClose={closeModal}
            onConfirm={handleDeleteAccount}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
