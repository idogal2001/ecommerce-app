import { useState, createContext } from 'react';
import React from 'react';
import Product from '../components/Product';
import Navbar from '../components/Navbar';
import { CiSearch } from "react-icons/ci";

export interface Counter {
  number: number;
}

export interface LayOut {
  layout: boolean;
}

export const amountContext = createContext<[Counter, React.Dispatch<React.SetStateAction<Counter>>] | undefined>(undefined)
export const layoutContext = createContext<[LayOut, React.Dispatch<React.SetStateAction<LayOut>>] | undefined>(undefined);

const HomePage = () => {
  

  const [priceSortLow, setPriceSortLow] = useState<boolean>(false);
  const [priceSortHigh, setPriceSortHigh] = useState<boolean>(false);
  const [dateSortNew, setDateSortNew] = useState<boolean>(false);
  const [dateSortOld, setDateSortOld] = useState<boolean>(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(4950)
  const [minPrice, setMinPrice] = useState<number>(1690)
  const [search, setSearch] = useState<string>()
  const [amount, setAmount] = useState<Counter>({number : 0});
  const [layout, setLayout] = useState<LayOut>({layout: false})

  const saveInputMax = (maxRange: React.KeyboardEvent<HTMLInputElement>) => {
    if(maxRange.key === 'Enter'){
      if(Number(maxRange.currentTarget.value) > 4902){
        alert("The most expensive product is 4901 please choose a lower price!")
        setMaxPrice(4902);
      }
      if(Number(maxRange.currentTarget.value) <= 1709){
        alert("Cheapest product is 1709 please choose a higher price!")
      }
      if(Number(maxRange.currentTarget.value) <= 4902 && Number(maxRange.currentTarget.value) >= 1710){
        setMaxPrice(Number(maxRange.currentTarget.value));
      }
    }
  }

  const saveInputMin = (minRange: React.KeyboardEvent<HTMLInputElement>) => {
    if(minRange.key === 'Enter'){
      if(Number(minRange.currentTarget.value) < 1708){
        alert("cheapest product price is 1709")
        setMinPrice(1708);
      }
      if(Number(minRange.currentTarget.value) >= 4901){
        alert("The most expensive product is 4901 please choose a lower price!")
      }
      if(Number(minRange.currentTarget.value) < 4901 && Number(minRange.currentTarget.value) >= 1708){
        setMinPrice(Number(minRange.currentTarget.value));
      }
    }
  }

  const priceSortingLow = () => {
    setPriceSortLow(!priceSortLow);
    setPriceSortHigh(false);
    setDateSortOld(false);
    setDateSortNew(false);
  }

  const priceSortingHigh = () => {
    setPriceSortHigh(!priceSortHigh);
    setPriceSortLow(false);
    setDateSortOld(false);
    setDateSortNew(false);
  }

  const dateSortingNew = () => {
    setDateSortNew(!dateSortNew);
    setDateSortOld(false);
    setPriceSortHigh(false);
    setPriceSortLow(false);
  }

  const dateSortingOld = () => {
    setDateSortOld(!dateSortOld);
    setDateSortNew(false);
    setPriceSortHigh(false);
    setPriceSortLow(false);
  }

  const searchBar = (value: React.FormEvent<HTMLInputElement>) => {
      setSearch(value.currentTarget.value);
  }

  const categoryFilter = (category: string) => {
    let categoryListArray = [...categoryList];
    if(categoryListArray.includes(category)){
      categoryListArray = categoryListArray.filter((element) => element !== category)
    }
    else{
      categoryListArray = [...categoryListArray, category]
    }
     setCategoryList([...categoryListArray])
  }

  const layoutChange3 = () => {
    setLayout({layout: false});
  }

  const layoutChange5 = () => {
    setLayout({ layout: true});
  }

  return (
    <div className="webContainer">
      <Navbar />
      <div className="pageUnderNavBar">
        <div className="filterImageAndNameContainer">
        <div className="searchBar"><input  className="searchBarInput" type="text" placeholder="Search Product" name="search" onChange={searchBar}/><CiSearch /></div>
              <h3 className="sortBy">Sort by:</h3>
              <div className="priceSort">
              <p>Price Sort:</p>
              <p className="buttonPadding">
                <input type="radio" name="radio" className= "button" onClick={priceSortingLow} /><span className="filterNames">Low To High</span>
                </p>
              <p className="buttonPadding"><input type="radio" name="radio" className= "button" onClick={priceSortingHigh} /><span className="filterNames">High To Low</span></p>
              <span><input className="rangePriceInput" type="number" placeholder="Max Price" name="Max Price"  onKeyDown={saveInputMax}/></span>
              <span><input className="rangePriceInput" type="number" placeholder="Min Price" name="Min Price"  onKeyDown={saveInputMin}/></span>
              </div>
              <div className="dateSort">
              <p>Date Sort:</p>
              <p className="buttonPadding"><input type="radio" name="radio" className= "button" onClick={dateSortingNew} /><span className="filterNames">Newest To Oldest</span></p>
              <p className="buttonPadding"><input type="radio" name="radio" className= "button" onClick={dateSortingOld} /><span className="filterNames">Oldest To Newest</span></p>
              </div>
              <div className="categories">
              <p>Categories:</p>
              <p className="buttonPadding"><input type="checkbox" className={categoryList.includes("Google") ? "button" : "buttonIsNotActive"} onClick={() => categoryFilter("Google")} /><span className="filterNames">Google</span></p>
              <p className="buttonPadding"><input type="checkbox" className={categoryList.includes("OnePlus") ? "button" : "buttonIsNotActive"} onClick={() => categoryFilter("OnePlus")} /><span className="filterNames">OnePlus</span></p>
              <p className="buttonPadding"><input type="checkbox" className={categoryList.includes("Huawei") ? "button" : "buttonIsNotActive"} onClick={() => categoryFilter("Huawei")} /><span className="filterNames">Huawei</span></p>
              <p className="buttonPadding"><input type="checkbox" className={categoryList.includes("Apple") ? "button" : "buttonIsNotActive"} onClick={() => categoryFilter("Apple")} /><span className="filterNames">Apple</span></p>
              <p className="buttonPadding"><input type="checkbox" className={categoryList.includes("Samsung") ? "button" : "buttonIsNotActive"} onClick={() => categoryFilter("Samsung")} /><span className="filterNames">Samsung</span></p>
              </div>
          </div>
        <div className="rightSideOfPage"> 
          <div className="layOutChange">Change Layout: <button className="layOutButton" onClick={layoutChange3}>3</button><button className="layOutButton" onClick={layoutChange5}>5</button></div> 
      <div className="productListPadding">
        <amountContext.Provider value= {[amount, setAmount]}>
        <layoutContext.Provider value= {[layout, setLayout]}>
      <Product categoryFilter={categoryList} maxPriceRange={maxPrice} minPriceRange={minPrice} priceSortLow={priceSortLow} priceSortHigh={priceSortHigh} dateSortOld={dateSortOld} dateSortNew={dateSortNew} search={search}/>
      </layoutContext.Provider>
      </amountContext.Provider>
      </div>
      </div>
      </div>
    </div>
  );
}

export default HomePage;
