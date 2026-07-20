import { GiCheckMark } from "react-icons/gi";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";

export const PurchaseComplete = () => {
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 items-center justify-center">
        <section className="border-borders/30 bg-light flex h-[450px] w-[40%] flex-col items-center justify-center gap-2 rounded-2xl border">
          <div className="relative flex items-center justify-center gap-3">
            <GiCheckMark className="absolute -left-12 text-[40px]" />
            <div className="flex flex-col items-center gap-2">
              <p>Seu pagamento foi aprovado.</p>
              <p>Pedido realizado com sucesso!</p>
            </div>
          </div>
          <div className="border-borders flex h-20 w-full items-center justify-center">
            <NavigationLink
              rout="/"
              text="Retornar para a loja"
              variant="linkButton"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
