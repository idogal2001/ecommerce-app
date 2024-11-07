import { useState, createContext } from "react";
import React from "react";
import ProductList from "../components/ProductListComponents/ProductList";
import Navbar from "../components/Navbar";
import LayOut from "../components/ProductListComponents/LayOut";
import Filters from "../components/FiltersComponents/FilterChoices/Filters";
import { ProductsDataBackUp } from "../ProductsDataBackUp";
import '../styles/HomePage/HomePage.scss';

interface ProductListProps {
  category: string;
  name: string;
  date: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

 interface Counter {
  number: number;
}

export const amountContext = createContext<[Counter, React.Dispatch<React.SetStateAction<Counter>>] | undefined>(undefined);

const HomePage = () => {
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [search, setSearch] = useState<string>();
  const [amount, setAmount] = useState<Counter>({ number: 0 });
  const [layout, setLayout] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [productList, setProductList] = useState<ProductListProps[]>(ProductsDataBackUp);

  return (
    <div className="webContainer">
      <Navbar amountList={amount}/>
      <div className="pageUnderNavBar">
        <Filters 
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
        setSearch={setSearch}
        categories={categories}
        setCategories={setCategories}
        setProductList={setProductList}
        productList={productList}
        />
        <div className="rightSideOfPage">
          <LayOut setLayout={setLayout} />
          <div className="productListPadding">
            <amountContext.Provider value={[amount, setAmount]}>
              <ProductList
                productList={productList}
                categoryFilter={categories}
                maxPriceRange={maxPrice}
                minPriceRange={minPrice}
                search={search}
                layout={layout}
              />
            </amountContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );

};


export default HomePage;
