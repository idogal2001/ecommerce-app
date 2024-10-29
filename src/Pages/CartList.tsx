import { ProductsDataBackUp } from '../components/ProductsDataBackUp';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import React from 'react';
import { amountContext } from './HomePage';

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

const CartList = () => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }

    const [amount, setAmount] = amountData;
    const  [items, setItems] = useState<Item[]>([]);
    const [priceOfList, setPriceOfList] = useState<number>(0);
    const [popUp, setPopUp] = useState<boolean>(false)

    useEffect(() => {
        const loadItems: Item[] = [];
        for(let i = 0; i <= ProductsDataBackUp.length; i++){
            const storeItemInfo: string | null = localStorage.getItem(i.toString());
            if(storeItemInfo !== null){
                loadItems.push(JSON.parse(storeItemInfo));
            }
        }
            if(loadItems.length > 0){
                const count: number = loadItems.reduce((acc, item) => acc = acc + item.priceTotalOfItem, 0); 
                setPriceOfList(count);
                }
        setItems(loadItems);
    }, [])

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
                    const savePrice: string | null  = localStorage.getItem("priceOfList");
                    localStorage.setItem("priceOfList", (priceOfItem  + Number(savePrice)).toString());
                    setPriceOfList(priceOfItem + priceOfList);
                    localStorage.setItem(id.toString(), JSON.stringify(updatedProduct)); 
                    return updatedProduct;
                }
                return item;
            });
            
            setItems(updatedItems);  
        }
    }
    
    const removingItem = (number: number,priceOfItem: number, priceTotalOfItem: number, id: number) => {
        if(number === 0){
            alert("You can't buy negative amount of items XD")
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
                    const savePrice: string | null = localStorage.getItem("priceOfList");
                    localStorage.setItem("priceOfList", (Number(savePrice) - priceOfItem).toString());
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
        const savePrice: string | null = localStorage.getItem("priceOfList");
        localStorage.setItem("priceOfList", (Number(savePrice) - TotalOfItem).toString());
        setPriceOfList(priceOfList - TotalOfItem);
        const updatedItems = items.filter((item: Item) => (
            item.id !== id
        ))
        setItems(updatedItems);
    }

    const checkOut =() => {
        setPopUp(!popUp);
    }

    return (
        <>
        <Navbar />
        <div className="webContainerCart">
            <Link to="/"><span className="linkToHomePage">Continue shopping :)</span></Link>
            <div className="cartListContainer">
            {items.map((item: Item) => (
                <span className="itemRow" key={item.id}><span className="itemInCart">{item.name} ,Amount: {item.amount}, Price: {item.priceTotalOfItem}₪</span><span className="cartPageButton"><button className="itemButton" onClick={() => addingItem(item.amount, item.priceOfItem, item.priceTotalOfItem, item.id)}>+</button><button className="itemButton" onClick={() => removingItem(item.amount, item.priceOfItem, item.priceTotalOfItem, item.id)}>-</button><button className="itemButton" onClick={() => removeItem(item.id, item.priceTotalOfItem)}>X</button></span></span>
            ))}
            </div>
            <span>Total Price: {priceOfList}₪</span>   
            <button className="checkOutButton" onClick={checkOut}>Check Out</button>
        </div>
        {popUp && (// check how to do it differently if condition
    <div className="popUpBackground">
        <div className="popUp">
        <p>
        Congrats!
        {items.map((item: Item) => (
            <span className="itemRow" key={item.id}><span className="itemInCart">{item.name} ,Amount: {item.amount}, Price: {item.priceTotalOfItem}₪</span><span className="cartPageButton"></span></span>
        ))}
        </p>
        <button className="checkOutButton" onClick={checkOut}>Close!</button>
        </div>
    </div>
        )}
        </>
    )
}

export default CartList;