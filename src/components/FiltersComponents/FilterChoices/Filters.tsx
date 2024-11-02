import React from "react";
import Categories from "../Categories";
import SearchBar from "../SearchBar";
import PriceLow from "./PriceLow";
import PriceHigh from "./PriceHigh";
import DateOld from "./DateOld";
import DateNew from "./DateNew";
import InputMax from "./InputMax";
import InputMin from "./InputMin";

enum SortType{
  PriceHigh = "PriceHigh",
  PriceLow = "PriceLow",
  DateNew = "DateNew",
  DateOld = "DateOld"
}

interface FiltersProps {
    setSortState: React.Dispatch<React.SetStateAction<string | undefined>>;
    setMaxPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
    setMinPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
    setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
    setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
    categoryList: string[];
}

const Filters = ({
    setSortState,
    setMaxPrice, 
    setMinPrice, 
    setSearch, 
    setCategoryList, 
    categoryList
}: FiltersProps) => {

    return (
        <div className="filterImageAndNameContainer">
            <SearchBar setSearch={setSearch}/>
      <h3 className="sortBy">Sort by:</h3>
        <div className="priceSort">
        <p>Price Sort:</p>
        <PriceLow setSortState={setSortState} SortType={SortType.PriceLow}/>
        <PriceHigh setSortState={setSortState} SortType={SortType.PriceHigh}/>
        <InputMax setMaxPrice={setMaxPrice}/>
        <InputMin setMinPrice={setMinPrice} />
      </div>
      <div className="dateSort">
        <p>Date Sort:</p>
        < DateNew setSortState={setSortState} SortType={SortType.DateNew}/>
        <DateOld setSortState={setSortState} SortType={SortType.DateOld}/>
      </div>
        <Categories setCategoryList={setCategoryList} categoryList={categoryList}/>
        </div>
    )
}

export default Filters;