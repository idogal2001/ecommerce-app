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

interface PriceLowProps{
  productList: ProductListProps[];
  setProductList: React.Dispatch<React.SetStateAction<ProductListProps[]>>;
}


const PriceLow = ({ productList, setProductList }: PriceLowProps) => {

    const priceSortingLow = () => {
      setProductList([...productList].sort(
        ({ price: itemPriceFirst }, { price: itemPriceSecond }) =>
          itemPriceFirst - itemPriceSecond
      ));

      };
      
    return (
        <p className="buttonPadding">
        <input
          type="radio"
          name="radio"
          className="button"
          onClick={priceSortingLow}
        />
        <span className="filterNames">Low To High</span>
      </p>
    )
}

export default PriceLow;