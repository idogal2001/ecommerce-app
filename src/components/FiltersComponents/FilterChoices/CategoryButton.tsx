import React from "react";
import { ProductsCategory } from "../../../ProductsCategory";

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
          setCategories(categoriesList);
    }

return(
    <div className="buttonCategoriesPadding">
    {ProductsCategory.map((category) => (
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