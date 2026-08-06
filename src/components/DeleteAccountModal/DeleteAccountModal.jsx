// Assets (Imagens, ícones locais, SVGs)
import { IoMdClose } from "react-icons/io";

export const DeleteAccountModal = ({ onClose, onConfirm }) => {
  // ==========================================================================
  // 1. RENDER
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
        className="border-borders/30 relative flex max-h-[90vh] w-[90%] max-w-md flex-col items-center gap-4 overflow-y-auto rounded-xl border bg-white shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="hover:text-alert absolute top-4 right-4 cursor-pointer text-[24px] text-gray-500 transition-colors"
        >
          <IoMdClose />
        </button>

        <div className="flex flex-col items-center justify-center p-5">
          <p className="text-dark mt-5 flex items-center text-2xl font-semibold">
            Excluir conta?
          </p>
          <p className="mt-3 text-center text-sm text-gray-500">
            Tem certeza de que deseja excluir sua conta? Esta ação é permanente
            e todos os seus dados serão perdidos.
          </p>
          <div className="mt-4 mb-3 flex gap-7">
            <button
              type="button"
              onClick={onConfirm}
              className="border-borders/40 text-dark hover:text-alert flex-1 cursor-pointer rounded-xl border bg-transparent px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 hover:bg-gray-50 active:scale-95"
            >
              Sim, excluir
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-button-primary text-dark hover:bg-button-hover flex-1 cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
