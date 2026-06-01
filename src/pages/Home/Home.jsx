import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ProductList } from "../../components/ProductList/ProductList";
import { TiShoppingCart } from "react-icons/ti";
import { useState } from "react";
import { Banner } from "../../components/Banner/Banner";
import { FaChevronDown } from "react-icons/fa6";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All" },
    { value: "men's clothing", label: "Men's clothing" },
    { value: "jewelery", label: "Jewelery" },
    { value: "electronics", label: "Electronics" },
    { value: "women's clothing", label: "Women's clothing" },
  ];

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 flex-col items-center">
        <Banner />
        <nav
          id="produtos"
          className="border-borders/70 bg-general-background/80 sticky top-0 z-50 flex w-full items-center justify-between border-b p-1 backdrop-blur-sm"
        >
          <label className="text-dark ml-5 line-clamp-2 flex items-center gap-2 px-2 text-center text-[15px] font-medium">
            Category:
            <div className="relative w-fit">
              <select
                value={selectedCategory}
                onChange={handleChangeCategory}
                className="border-borders text-dark cursor-pointer appearance-none rounded-xl border px-4 py-2 pr-10 text-sm font-medium"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="text-dark pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs" />
            </div>
          </label>
        </nav>
        <ProductList filter={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};
