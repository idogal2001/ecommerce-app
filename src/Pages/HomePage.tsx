import { useState, createContext } from "react";
import React from "react";
import ProductList from "../components/ProductList";
import Navbar from "../components/Navbar";
import LayOut from "../components/LayOut";
import Filters from "../components/FiltersComponents/FilterChoices/Filters";

 interface Counter {
  number: number;
}

export const amountContext = createContext<[Counter, React.Dispatch<React.SetStateAction<Counter>>] | undefined>(undefined);

const HomePage = () => {
  const [sortState, setSortState] = useState<string | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [search, setSearch] = useState<string>();
  const [amount, setAmount] = useState<Counter>({ number: 0 });
  const [layout, setLayout] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);

  return (
    <div className="webContainer">
      <Navbar />
      <div className="pageUnderNavBar">
        <Filters 
        setSortState={setSortState}
        setMaxPrice={setMaxPrice}
        setMinPrice={setMinPrice}
        setSearch={setSearch}
        setCategoryList={setCategoryList}
        categoryList={categoryList}
        />
        <div className="rightSideOfPage">
          <LayOut setLayout={setLayout} />
          <div className="productListPadding">
            <amountContext.Provider value={[amount, setAmount]}>
              <ProductList
                sortState={sortState}
                categoryFilter={categoryList}
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
