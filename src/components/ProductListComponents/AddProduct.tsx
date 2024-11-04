import React from "react";
import { useContext } from "react";
import { amountContext } from "../../Pages/HomePage";
import 'C:/code/trainning/reactEcommerce/ecommerce-app/src/styles/ProductList/AddItem.scss'

interface AddProductProps {
    id: number
    image: string;
    description: string;
    name: string;
    price: number;
}

const AddProduct = ({ id, image, description, name, price }: AddProductProps) => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }

    const [, setAmount] = amountData;


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
              alert("please choose less then 20 products");
            }
          }
        }
      };

    return(
        <div className="addCartButtonFlex">
        <button
          className="addCartButtonProductPage"
          onClick={() =>
            addProduct(
              id,
              image,
              description,
              name,
              price
            )
          }
        >
          add to cart
        </button>
      </div>
    )
}

export default AddProduct;