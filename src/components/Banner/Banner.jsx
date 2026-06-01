import heroSection from "../../assets/heroSection.png";

export const Banner = () => {
  return (
    <section className="relative min-h-[60vh]">
      <img
        src={heroSection}
        alt="Fashion Store"
        className="h-[60vh] w-screen object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="text-light absolute inset-0 mt-42 flex flex-col items-center justify-center">
        <h1 className="mb-6 text-5xl">Compre já</h1>

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
