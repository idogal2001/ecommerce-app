import { useContext } from "react";
import React from "react";
import { amountContext } from "../Pages/HomePage";

interface addItemProductPageProps {
    id: number;
    image: string;
    description: string;
    name: string;
    price: number;
    priceTotal: number;
    itemAmount: number;
    allowAdd: boolean;
}

const AddItemProductPage = ({ id, image, description, name, price, priceTotal, itemAmount, allowAdd }: addItemProductPageProps) => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }
    
    const [, setAmount] = amountData;

    const addProduct = (id: number, image: string, description: string, name: string, price: number, itemAmount: number, priceTotal: number) => {
        if(allowAdd){
            const itemInfo = {name: name, image: image, description: description, priceOfItem: price, priceTotalOfItem: priceTotal , amount: itemAmount, id: id};
            const amount: string | null = localStorage.getItem("amountOfItems");
            if(amount){
                if(localStorage.getItem(id.toString()) === null){
                    const newAmount = Number(amount) + itemAmount;
                    localStorage.setItem("amountOfItems", (itemAmount + Number(amount)).toString());
                    setAmount({ number: newAmount });
                }
                else{
                    const amountOfSpeItem: string | null = localStorage.getItem(id.toString());
                    if(amountOfSpeItem){
                        const data = JSON.parse(amountOfSpeItem);
                        const newAmount = itemAmount + Number(amount) - data.amount;
                        localStorage.setItem("amountOfItems", (itemAmount + Number(amount) - data.amount).toString());
                        setAmount({ number: newAmount })
                    }
                }
            }
            else{
                localStorage.setItem("amountOfItems", itemAmount.toString());
                setAmount({ number: itemAmount});
            }
            localStorage.setItem(id.toString(), JSON.stringify(itemInfo));
        }
    }

    return(
        <div className = "addCartButtonPadding">
        <button className="addCartButton" onClick={() => addProduct(id, image, description, name, price, itemAmount, priceTotal)}>Add To Cart</button>
        </div>
    )
}

export default AddItemProductPage;