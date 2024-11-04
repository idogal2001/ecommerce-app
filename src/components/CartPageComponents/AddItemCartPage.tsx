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

interface AddItemCartPageProps {
    priceOfList: number;
    setPriceOfList: React.Dispatch<React.SetStateAction<number>>;
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    itemAmount: number;
    priceOfItem: number;
    priceTotalOfItem: number;
    id: number;
}

const AddItemCartPage = ({ priceOfList, setPriceOfList, items, setItems, itemAmount, priceOfItem, priceTotalOfItem, id}: AddItemCartPageProps) => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }

    const [, setAmount] = amountData;

    const addingItem = (number: number,priceOfItem: number, priceTotalOfItem: number, id: number) => {
        if(number === 20){
            alert("If you need to buy more then 20 please come to the store in person! Sorry!")
        }
        else{
            const amountOfItem: string | null = localStorage.getItem("amountOfItems");
            if (amountOfItem) {
                const newAmount = Number(amountOfItem) + 1;
                localStorage.setItem("amountOfItems", newAmount.toString());
                setAmount({ number: newAmount });  
            }
            const updatedItems = items.map((item: Item) => {
                if (item.id === id) {
                    const updatedProduct = { ...item, amount: number + 1, priceTotalOfItem: priceTotalOfItem + priceOfItem};
                    localStorage.setItem("priceOfList", (priceOfItem  + priceOfList).toString());
                    setPriceOfList(priceOfItem + priceOfList);
                    localStorage.setItem(id.toString(), JSON.stringify(updatedProduct)); 
                    return updatedProduct;
                }
                return item;
            });
            
            setItems(updatedItems);  
        }
    }
    
    return(
        <button className="itemButton" onClick={() => addingItem(itemAmount, priceOfItem, priceTotalOfItem, id)}>+</button>
    )
}

export default AddItemCartPage;