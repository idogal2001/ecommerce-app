import React from "react"

interface ProductListProps {
  category: string;
  name: string;
  date: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

interface PriceHighProps{
  productList: ProductListProps[];
  setProductList: React.Dispatch<React.SetStateAction<ProductListProps[]>>;
}


const PriceHigh = ({ productList, setProductList }: PriceHighProps) => {

    const priceSortingHigh = () => {
      setProductList([...productList].sort(
        ({ price: itemPriceFirst }, { price: itemPriceSecond }) =>
          itemPriceSecond - itemPriceFirst
      ));
      };
      
    return (
        <p className="buttonPadding">
          <input
            type="radio"
            name="radio"
            className="button"
            onClick={priceSortingHigh}
          />
          <span className="filterNames">High To Low</span>
        </p>
    )
}

export default PriceHigh;