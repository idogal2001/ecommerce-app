import React from "react";
import { ProductsDataBackUp } from "../../../ProductsDataBackUp";

interface CategoryButtonProps {
    categories: string[];
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryButton = ({ categories, setCategories}: CategoryButtonProps) => {

    const addCategory = (category: string) => {
        let categoriesList = [...categories];
        if(categories.includes(category)){
            categoriesList = categories.filter((element) => element !== category);
        }
          else{
            categoriesList = [...categoriesList, category];
          }
          console.log(categoriesList);
          setCategories(categoriesList);
    }

return(
    <div>
    {[...new Set(ProductsDataBackUp.map(({ category }) => category))].map((category) => (
    <p className="buttonPadding" key={category}>
    <input
    type="checkbox"
    className="button"
    onClick={() => addCategory(category)}
    />
<span className="filterNames">{category}</span>
</p>
    ))}
</div>
    )
}

export default CategoryButton;