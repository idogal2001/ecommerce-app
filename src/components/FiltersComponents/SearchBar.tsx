import React from "react";
import { CiSearch } from "react-icons/ci";

interface SearchBar{
    setSearch:  React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SearchBar = ({ setSearch }: SearchBar) => {

    const searchBar = (value: React.FormEvent<HTMLInputElement>) => {
        setSearch(value.currentTarget.value);
      };
      
    return (
        <div className="searchBar">
        <input
          className="searchBarInput"
          type="text"
          placeholder="Search Product"
          name="search"
          onChange={searchBar}
        />
        <CiSearch />
      </div>
    )
}

export default SearchBar;