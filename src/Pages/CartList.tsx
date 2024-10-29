import { ProductsDataBackUp } from '../components/ProductsDataBackUp';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import React from 'react';

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
        
        // if(loadItems[0].priceTotalOfItem){
        // let count: number = 0;
        // for(let i = 0; i <= loadItems.length; i++){
        //         count +=  loadItems[i].priceTotalOfItem;
        //     }    
        // setPriceOfList(count);
        // }
        
        setItems(loadItems);
    }, [])

    const addingItem = (number: number,priceOfItem: number, priceTotalOfItem: number, id: number) => {
        if(number === 20){
            alert("If you need to buy more then 20 please come to the store in person! Sorry!")
        }
        else{
            const updatedItems = items.map((item: Item) => {
                if (item.id === id) {
                    const updatedProduct = { ...item, amount: number + 1, priceTotalOfItem: priceTotalOfItem + priceOfItem};
                    const savePrice: string | null  = localStorage.getItem("priceOfList");
                    localStorage.setItem("priceOfList", (priceOfItem  + Number(savePrice)).toString());
                    setPriceOfList(priceOfItem + Number(savePrice));
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
            const updatedItems = items.map((item: Item) => {
                if(item.id === id){
                    const updateProduct = {...item , amount: number - 1, priceTotalOfItem: priceTotalOfItem - priceOfItem};
                    const savePrice: string | null = localStorage.getItem("priceOfList");
                    localStorage.setItem("priceOfList", (Number(savePrice) - priceOfItem).toString());
                    setPriceOfList(Number(savePrice) - priceOfItem);
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
        localStorage.removeItem(id.toString())
        const savePrice: string | null = localStorage.getItem("priceOfList");
        localStorage.setItem("priceOfList", (Number(savePrice) - TotalOfItem).toString());
        setPriceOfList(Number(savePrice) - TotalOfItem);
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