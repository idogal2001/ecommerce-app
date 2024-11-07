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

interface RemoveItemCartPageProps {
    priceOfList: number;
    setPriceOfList: React.Dispatch<React.SetStateAction<number>>;
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    itemAmount: number;
    priceOfItem: number;
    priceTotalOfItem: number;
    id: number;
}

const RemoveItemFromCart = ({ priceOfList, setPriceOfList, items, setItems, itemAmount, priceOfItem, priceTotalOfItem, id}: RemoveItemCartPageProps) => {

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

    const removingItem = (number: number,priceOfItem: number, priceTotalOfItem: number, id: number) => {
        if(number === 1){
            removeItem(id, priceTotalOfItem)
        }
        else{
            const amountOfItem: string | null = localStorage.getItem("amountOfItems");
            if (amountOfItem) {
                const newAmount = Number(amountOfItem) + -1;
                localStorage.setItem("amountOfItems", newAmount.toString());
                setAmount({ number: newAmount });  
            }
            const updatedItems = items.map((item: Item) => {
                if(item.id === id){
                    const updateProduct = {...item , amount: number - 1, priceTotalOfItem: priceTotalOfItem - priceOfItem};
                    localStorage.setItem("priceOfList", (priceOfList - priceOfItem).toString());
                    setPriceOfList(priceOfList - priceOfItem);
                    localStorage.setItem(id.toString(), JSON.stringify(updateProduct))
                    return updateProduct;
                }
                else{
                    return item;
                }
            })
            setItems(updatedItems);
        }

    }
    
    return(
        <button className="itemButton" onClick={() => removingItem(itemAmount, priceOfItem, priceTotalOfItem, id)}>-</button>
    )
}

export default RemoveItemFromCart;