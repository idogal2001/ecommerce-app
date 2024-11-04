import React from "react";
import CategoryButton from "./FilterChoices/CategoryButton";

interface categoryProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const Categories = ( { categories, setCategories }: categoryProps) => {

return (
    <div className="categories">
    <p>Categories:</p>
    <CategoryButton categories={categories} setCategories={setCategories}/>
  </div>
    )
}


export default Categories;