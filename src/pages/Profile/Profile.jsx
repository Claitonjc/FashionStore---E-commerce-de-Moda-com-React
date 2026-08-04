import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

// Hooks
import { useUsers } from "../../hooks/useUsers";

// Components
import { InputTypeFieldset } from "../../components/InputTypeFieldset/InputTypeFieldset";
import { GiPadlock } from "react-icons/gi";

// Assets (Imagens, ícones locais, SVGs)
import { IoMdPerson } from "react-icons/io";

export const Profile = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const { userLogged, setName, setPhone, setEmail, setCpf, setDate } =
    useUsers();

  // ==========================================================================
  // 2. RENDER
  // ==========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 flex-col items-center justify-center">
        <div className="border-borders/40 m-7 flex min-h-25 w-[60%] flex-col items-center gap-2 rounded-xl border bg-white p-15">
          <div className="flex items-center">
            <IoMdPerson className="text-[24px]" />
            <h1 className="text-dark w-full p-2 text-center text-[20px] font-semibold">
              Meus Dados
            </h1>
          </div>
          <form className="flex w-full flex-col items-center gap-3 p-6">
            <div className="border-borders/15 bg-light flex w-full items-center rounded-2xl border">
              <InputTypeFieldset
                label="E-mail"
                type="email"
                name="email"
                value={userLogged.email || ""}
                onChange={(event) => setEmail(event.target.value)}
                disabled
              />
              <GiPadlock className="mr-3 ml-3 text-[20px]" />
            </div>
            <div className="flex w-full gap-3">
              <div className="border-borders/15 bg-light flex w-full items-center rounded-2xl border">
                <InputTypeFieldset
                  label="CPF"
                  type="text"
                  name="cpf"
                  value={userLogged.cpf || ""}
                  onChange={(event) => setCpf(event.target.value)}
                  disabled
                />
                <GiPadlock className="mr-3 ml-3 text-[20px]" />
              </div>
              <div className="border-borders/15 bg-light flex w-full items-center rounded-2xl border">
                <InputTypeFieldset
                  label="Data de Nascimento"
                  type="date"
                  name="date"
                  value={userLogged.date || ""}
                  onChange={(event) => setDate(event.target.value)}
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
                value={userLogged.name || ""}
                onChange={(event) => setName(event.target.value)}
              />
              <InputTypeFieldset
                label="Telefone Celular*"
                type="text"
                name="E-mail"
                value={userLogged.phone || ""}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-button-primary text-dark hover:bg-button-hover mt-4 cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
            >
              Salvar Alterações
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
