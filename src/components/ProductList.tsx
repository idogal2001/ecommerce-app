import { ProductsDataBackUp } from "../ProductsDataBackUp";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { amountContext } from "../Pages/HomePage";

interface ProductProps {
  category: string;
  name: string;
  date: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

interface ProductFilter {
  categoryFilter: string[];
  maxPriceRange: number | undefined;
  minPriceRange: number | undefined;
  sortState: string | undefined;
  search: string | undefined;
  layout: boolean;
}

const ProductList = ({
  categoryFilter,
  maxPriceRange,
  minPriceRange,
  sortState,
  search,
  layout
}: ProductFilter) => {
    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }
    
    const [amount, setAmount] = amountData;

  let newProductList: ProductProps[];

  newProductList = ProductsDataBackUp.filter(({ name: itemName }) => {
    if (search === undefined) {
      return true;
    } else {
      let count = 0;
      for (let i = 0; i < search.length; i++) {
        if (itemName.length < search.length) {
          return false;
        }
        if (search[i].toLowerCase() === itemName[i].toLowerCase()) {
          count++;
        }
      }
      if (count === search.length) {
        return true;
      }
      return false;
    }
  });

  if (newProductList.length === 0) {
    return <h1>Not in stock</h1>;
  }

  if (minPriceRange != undefined) {
    newProductList = newProductList.filter(
      ({ price: itemPrice }) => itemPrice >= minPriceRange
    );
  }
  if (maxPriceRange != undefined) {
    newProductList = newProductList.filter(
      ({ price: itemPrice }) => itemPrice <= maxPriceRange
    );
  }

  if (categoryFilter.length > 0) {
    newProductList = newProductList.filter(({ category: itemmCategory }) =>
      categoryFilter.includes(itemmCategory)
    );
  }
  if (sortState == "PriceLow") {
    newProductList.sort(
      ({ price: itemPriceFirst }, { price: itemPriceSecond }) =>
        itemPriceFirst - itemPriceSecond
    );
  }
  if (sortState == "PriceHigh") {
    newProductList.sort(
      ({ price: itemPriceFirst }, { price: itemPriceSecond }) =>
        itemPriceSecond - itemPriceFirst
    );
  }
  if (sortState == "DateOld") {
    newProductList.sort(
      ({ date: itemDateFirst }, { date: itemDateSecond }) =>
        new Date(itemDateFirst).getTime() - new Date(itemDateSecond).getTime()
    );
  }
  if (sortState == "DateNew") {
    newProductList.sort(
      ({ date: itemDateFirst }, { date: itemDateSecond }) =>
        new Date(itemDateSecond).getTime() - new Date(itemDateFirst).getTime()
    );
  }

  const addProduct = (
    id: number,
    image: string,
    description: string,
    name: string,
    price: number
  ) => {    const amountOfItem: string | null = localStorage.getItem("amountOfItems");
    if (amountOfItem === null) {
      localStorage.setItem("amountOfItems", "1");
      setAmount({ number: 1 });
    }
    if (localStorage.getItem(id.toString()) === null) {
      const newAmount = Number(amountOfItem) + 1;
      localStorage.setItem("amountOfItems", newAmount.toString());
      setAmount({ number: newAmount });
      const itemInfo = {
        name: name,
        image: image,
        description: description,
        priceOfItem: price,
        priceTotalOfItem: price,
        amount: 1,
        id: id,
      };
      localStorage.setItem(id.toString(), JSON.stringify(itemInfo));
    } else {
      const amountItem: string | null = localStorage.getItem(id.toString());
      if (amountItem !== null) {
        const data = JSON.parse(amountItem);
        if (data.amount < 20) {
          const itemInfo = {
            name: name,
            image: image,
            description: description,
            priceOfItem: price,
            priceTotalOfItem: data.priceTotalOfItem,
            amount: data.amount,
            id: id,
          };
          const updatedProduct = {
            ...itemInfo,
            amount: data.amount + 1,
            priceTotalOfItem: data.priceTotalOfItem + data.priceOfItem,
          };
          localStorage.setItem(id.toString(), JSON.stringify(updatedProduct));
          const newAmount = Number(amountOfItem) + 1;
          localStorage.setItem("amountOfItems", newAmount.toString());
          setAmount({ number: newAmount });
        } else {
          alert("nope");
        }
      }
    }
  };

  return (
    <div className={layout ? "productList5" : "productList3"}>
      {newProductList.map((product) => (
        <div className="productBox" key={product.id}>
          <Link to={`/ProductPage/${product.id}`}>
            <p>
              <img
                className="image"
                alt={`product${product.id}`}
                src={product.image}
              ></img>
            </p>
          </Link>
          <p className="name">Name: {product.name}</p>
          <p className="date">Date: {product.date}</p>
          <p className="price">Price: {product.price}₪</p>
          <p className="discription">discription: {product.description}</p>
          <div className="addCartButtonFlex">
            <button
              className="addCartButtonProductPage"
              onClick={() =>
                addProduct(
                  product.id,
                  product.image,
                  product.description,
                  product.name,
                  product.price
                )
              }
            >
              add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;