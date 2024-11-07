import React from "react";
import Categories from "../Categories";
import SearchBar from "../SearchBar";
import PriceLow from "./PriceLow";
import PriceHigh from "./PriceHigh";
import DateOld from "./DateOld";
import DateNew from "./DateNew";
import InputMax from "./InputMax";
import InputMin from "./InputMin";
import 'C:/code/trainning/reactEcommerce/ecommerce-app/src/styles/Filters/Filters.scss'


interface ProductListProps {
  category: string;
  name: string;
  date: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

interface FiltersProps {
    setProductList: React.Dispatch<React.SetStateAction<ProductListProps[]>>;
    productList: ProductListProps[];
    setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
    setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
    setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
    categories: string[];
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filters = ({
    setProductList,
    productList,
    setMaxPrice, 
    setMinPrice,
    setSearch, 
    categories,
    setCategories
}: FiltersProps) => {

    return (
        <div className="filterImageAndNameContainer">
            <SearchBar setSearch={setSearch}/>
      <h3 className="sortBy">Sort by:</h3>
        <div className="priceSort">
        <p>Price Sort:</p>
        <PriceLow productList={productList} setProductList ={setProductList}/>
        <PriceHigh productList={productList} setProductList ={setProductList}/>
        <InputMax setMaxPrice={setMaxPrice}/>
        <InputMin setMinPrice={setMinPrice} />
      </div>
      <div className="dateSort">
        <p>Date Sort:</p>
        < DateNew productList={productList} setProductList ={setProductList}/>
        <DateOld productList={productList} setProductList ={setProductList} />
      </div>
        <Categories categories={categories} setCategories={setCategories}/>
        </div>
    )
}

export default Filters;