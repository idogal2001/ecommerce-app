import React from "react";
import { useContext } from "react";
import { amountContext } from "../../Pages/HomePage";

interface Item {
    category: string,
    name: string,
    date: string,
    price: number,
    description: string,
    image: string,
    id: number
    amount: number;
    priceOfItem: number;
    priceTotalOfItem: number;
};

interface DelteItemFromCart {
    priceOfList: number;
    setPriceOfList: React.Dispatch<React.SetStateAction<number>>;
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    priceTotalOfItem: number;
    id: number;
}

const DelteItemFromCart = ({ priceOfList, setPriceOfList, items, setItems, priceTotalOfItem, id}: DelteItemFromCart) => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }

    const [, setAmount] = amountData;

    const removeItem = (id: number, TotalOfItem: number) => {
        const amountOfItem: string | null = localStorage.getItem("amountOfItems");
        const amountOfItemInList: string | null = localStorage.getItem(id.toString())
        if (amountOfItem && amountOfItemInList) {
            const saveAmount = JSON.parse(amountOfItemInList);
            const newAmount = Number(amountOfItem) - saveAmount.amount;
            localStorage.setItem("amountOfItems", newAmount.toString());
            setAmount({ number: newAmount });  
        }
        localStorage.removeItem(id.toString())
        localStorage.setItem("priceOfList", (priceOfList - TotalOfItem).toString());
        setPriceOfList(priceOfList - TotalOfItem);
        const updatedItems = items.filter((item: Item) => (
            item.id !== id
        ))
        setItems(updatedItems);
    }

    return(
        <button className="itemButton" onClick={() => removeItem(id, priceTotalOfItem)}>X</button>
    )
}

export default DelteItemFromCart;