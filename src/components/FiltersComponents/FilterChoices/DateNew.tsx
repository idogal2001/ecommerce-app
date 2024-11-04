import React from "react";

interface ProductListProps {
  category: string;
  name: string;
  date: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

interface DateNewProps{
  productList: ProductListProps[];
  setProductList: React.Dispatch<React.SetStateAction<ProductListProps[]>>;
}

const DateNew = ({ productList, setProductList }: DateNewProps) => {

    const dateSortingNew = () => {
      setProductList([...productList].sort(
        ({ date: itemDateFirst }, { date: itemDateSecond }) =>
          new Date(itemDateSecond).getTime() - new Date(itemDateFirst).getTime()
      ));
      };

    return (
        <p className="buttonPadding">
          <input
            type="radio"
            name="radio"
            className="button"
            onClick={dateSortingNew}
          />
          <span className="filterNames">Newest To Oldest</span>
        </p>
    )
}

export default DateNew;