import React from "react";

interface categoryProps {
  setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
  categoryList: string[];
}

const Categories = ( { setCategoryList, categoryList }: categoryProps) => {

  const categoryFilter = (category: string) => {
    let categoryListArray = [...categoryList];
    if (categoryListArray.includes(category)) {
      categoryListArray = categoryListArray.filter(
        (element) => element !== category
      );
    } else {
      categoryListArray = [...categoryListArray, category];
    }
    setCategoryList([...categoryListArray]);
  };

return (
    <div className="categories">
    <p>Categories:</p>
    <p className="buttonPadding">
      <input
        type="checkbox"
        className={
          categoryList.includes("Google")
            ? "button"
            : "buttonIsNotActive"
        }
        onClick={() => categoryFilter("Google")}
      />
      <span className="filterNames">Google</span>
    </p>
    <p className="buttonPadding">
      <input
        type="checkbox"
        className={
          categoryList.includes("OnePlus")
            ? "button"
            : "buttonIsNotActive"
        }
        onClick={() => categoryFilter("OnePlus")}
      />
      <span className="filterNames">OnePlus</span>
    </p>
    <p className="buttonPadding">
      <input
        type="checkbox"
        className={
          categoryList.includes("Huawei")
            ? "button"
            : "buttonIsNotActive"
        }
        onClick={() => categoryFilter("Huawei")}
      />
      <span className="filterNames">Huawei</span>
    </p>
    <p className="buttonPadding">
      <input
        type="checkbox"
        className={
          categoryList.includes("Apple")
            ? "button"
            : "buttonIsNotActive"
        }
        onClick={() => categoryFilter("Apple")}
      />
      <span className="filterNames">Apple</span>
    </p>
    <p className="buttonPadding">
      <input
        type="checkbox"
        className={
          categoryList.includes("Samsung")
            ? "button"
            : "buttonIsNotActive"
        }
        onClick={() => categoryFilter("Samsung")}
      />
      <span className="filterNames">Samsung</span>
    </p>
  </div>
    )
}


export default Categories;