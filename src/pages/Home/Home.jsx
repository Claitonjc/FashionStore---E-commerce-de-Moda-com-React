import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

// Components
import { Header } from "../../components/Header/Header";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { ProductList } from "../../components/ProductList/ProductList";
import { Footer } from "../../components/Footer/Footer";

// ========================================================================
// CONSTANTS
// ========================================================================

const CATEGORIES = [
  { value: "all", label: "Todas" },
  { value: "men's clothing", label: "Roupas masculinas" },
  { value: "women's clothing", label: "Roupas femininas" },
  { value: "jewelery", label: "Joias" },
  { value: "electronics", label: "Eletrônicos" },
];

/**
 * Home Page
 * Orchestrates the home page, managing the category filter and the product list.
 */
export const Home = () => {
  // ========================================================================
  // 1.STATES & HOOKS
  // ========================================================================
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ========================================================================
  // 2.ACTIONS
  // ========================================================================
  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ========================================================================
  // 3.RENDER
  // ========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <HeroSection />
      <main className="bg-general-background flex flex-1 flex-col items-center">
        {/* Navigation bar with filter */}
        <nav
          id="produtos"
          className="border-borders/70 bg-general-background/80 sticky top-0 z-50 flex w-full items-center justify-between border-b p-1 backdrop-blur-sm"
        >
          <div className="text-dark ml-5 line-clamp-2 flex items-center gap-2 px-2 text-center text-[15px] font-medium">
            <label htmlFor="category-select">Categoria:</label>
            <div className="relative w-fit">
              <select
                id="category-select"
                value={selectedCategory}
                onChange={handleChangeCategory}
                className="border-borders text-dark cursor-pointer appearance-none rounded-xl border px-4 py-2 pr-10 text-sm font-medium"
              >
                {CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="text-dark pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs" />
            </div>
          </div>
        </nav>
        {/* Passing the state to the product list */}
        <ProductList filter={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};
