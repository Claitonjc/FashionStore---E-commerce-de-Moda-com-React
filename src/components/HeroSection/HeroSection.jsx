// Assets (Imagens, ícones locais, SVGs)
import heroSection from "../../assets/heroSection.png";

export const HeroSection = () => {
  // ==========================================================================
  // 1. RENDER
  // ==========================================================================
  return (
    <section className="relative flex min-h-100 w-full font-[inter] md:min-h-[60vh]">
      <img
        src={heroSection}
        alt="Fashion Store"
        className="absolute inset-0 h-full w-full object-cover object-center"
        fetchPriority="high"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="text-light relative z-10 mt-30 flex w-full flex-col items-center justify-end px-4 pb-38 text-center">
        <h1 className="mb-4 text-4xl font-bold md:mb-6 md:text-5xl">
          Compre já
        </h1>

        <a
          href="#produtos"
          className="bg-button-primary rounded-full px-8 py-4 text-black duration-300 hover:scale-105"
        >
          Ver produtos
        </a>
      </div>
    </section>
  );
};
