export const AuthLayout = ({ title, buttonText, children, onSubmit }) => {
  // =========================================================================
  // 1. RENDER
  // =========================================================================
  return (
    <section className="border-borders/30 flex w-full max-w-md items-center justify-center rounded-2xl border bg-white p-10 shadow-md">
      <form
        onSubmit={onSubmit}
        className="text-dark flex flex-col items-center justify-center gap-5"
      >
        <h1 className="flex items-center gap-2 text-3xl">{title}</h1>
        {children}
        <button
          type="submit"
          className="bg-button-primary hover:bg-button-hover w-full cursor-pointer rounded-xl py-3 font-medium transition"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
};
