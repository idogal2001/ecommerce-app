import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { amountContext } from "../../Pages/HomePage";
import AddProduct from "./AddProduct";
import 'C:/code/trainning/reactEcommerce/ecommerce-app//src/styles/ProductList/ProductList.scss';

interface ProductProps {
  category: string;
  name: string;
  date: string;
  price: number;
  description: string;
  image: string;
  id: number;
}

interface ProductListProps {
  categoryFilter: string[];
  maxPriceRange: number | undefined;
  minPriceRange: number | undefined;
  productList: ProductProps[];
  search: string | undefined;
  layout: boolean;
}

const ProductList = ({
  categoryFilter,
  maxPriceRange,
  minPriceRange,
  productList,
  search,
  layout
}: ProductListProps) => {
    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }

    const [amount, setAmount] = amountData;

    productList = productList.filter(({ name: itemName }) => {
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

  if (productList.length === 0) {
    return <h1>Not in stock</h1>;
  }

  if (minPriceRange != undefined) {
    productList = productList.filter(
      ({ price: itemPrice }) => itemPrice >= minPriceRange
    );
  }
  if (maxPriceRange != undefined) {
    productList = productList.filter(
      ({ price: itemPrice }) => itemPrice <= maxPriceRange
    );
  }

  if (categoryFilter.length > 0) {
    productList = productList.filter(({ category: itemCategory }) =>
      categoryFilter.includes(itemCategory)
    );
  }

  return (
    <div className={layout ? "productList5" : "productList3"}>
      {productList.map((product) => (
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
          <p>Name: {product.name}</p>
          <p>Date: {product.date}</p>
          <p>Price: {product.price}₪</p>
          <p className="description">description: {product.description}</p>
          <amountContext.Provider value={[amount, setAmount]}>
          <AddProduct 
          id={product.id} 
          image={product.image} 
          description={product.description}
          name={product.name}
          price={product.price}
          />
          </amountContext.Provider>
        </div>
      ))}
    </div>
  );
};

export default ProductList;