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

interface DateOldProps{
    productList: ProductListProps[];
    setProductList: React.Dispatch<React.SetStateAction<ProductListProps[]>>;
}

const DateOld = ({ productList, setProductList }: DateOldProps) => {

    const dateSortingOld = () => {
      setProductList([...productList].sort(
        ({ date: itemDateFirst }, { date: itemDateSecond }) =>
          new Date(itemDateFirst).getTime() - new Date(itemDateSecond).getTime()
      ));
      };

    return (
        <p className="buttonPadding">
        <input
          type="radio"
          name="radio"
          className="button"
          onClick={dateSortingOld}
        />
        <span className="filterNames">Oldest To Newest</span>
      </p>
    )
}

export default DateOld;