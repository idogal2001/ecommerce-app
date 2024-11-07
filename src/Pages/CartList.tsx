import { ProductsDataBackUp } from '../ProductsDataBackUp';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import React from 'react';
import { amountContext } from './HomePage';
import AddItemCartPage from '../components/CartPageComponents/AddItemCartPage';
import RemoveItemFromCart from '../components/CartPageComponents/RemoveItemFromCart';
import DeleteItemFromCart from '../components/CartPageComponents/DeleteItemCartPage';
import PopUp from '../components/CartPageComponents/PopUp';
import '../styles/CartPage/CartPage.scss'

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

    const change = (description: string) => {
        let newDes: string = "";
        for(let i = 0; i <= 5; i++){
            newDes += newDes + description[i];
        }
        return newDes;
    }

    const checkOut =() => {
        if(items.length !== 0){
            setPopUp(!popUp);
        }
    }

    return (
        <>
        <Navbar amountList={amount}/>
        <div className="webContainerCart">
            <Link to="/"><span className="linkToHomePage">Continue shopping :)</span></Link>
            <div className="cartListContainer">
            {items.map((item: Item) => (
                <span className="itemBox" key={item.id}>
                    <span className="leftSideCartContainer">
                        <div className="nameDescriptionFlex"><div className="imgPadding"><Link to={`/ProductPage/${item.id}`}><img className="img" alt = {`product${item.id}`} src = {item.image}></img></Link></div><div className="nameAndDesPadding"><div className="nameAndDes">{item.name} <div className="itemDes">{change(item.description)}...</div></div></div></div>
                    </span>
                        <span className="rightSideCartContainer">{item.priceTotalOfItem}₪ {item.amount}
                        <amountContext.Provider value={[amount, setAmount]}>
                            <AddItemCartPage 
                            priceOfList={priceOfList} 
                            setPriceOfList={setPriceOfList} 
                            items={items}
                            setItems={setItems}
                            itemAmount={item.amount}
                            priceOfItem={item.priceOfItem}
                            priceTotalOfItem={item.priceTotalOfItem}
                            id={item.id}
                            />
                            <RemoveItemFromCart 
                            priceOfList={priceOfList} 
                            setPriceOfList={setPriceOfList} 
                            items={items}
                            setItems={setItems}
                            itemAmount={item.amount}
                            priceOfItem={item.priceOfItem}
                            priceTotalOfItem={item.priceTotalOfItem}
                            id={item.id}
                            />
                            <DeleteItemFromCart 
                            priceOfList={priceOfList} 
                            setPriceOfList={setPriceOfList} 
                            items={items}
                            setItems={setItems}
                            priceTotalOfItem={item.priceTotalOfItem}
                            id={item.id}
                            />
                            </amountContext.Provider>
                        </span>
                </span>
            ))}
            </div>
            <span>Total Price: {priceOfList}₪</span>   
            <button className="checkOutButton" onClick={checkOut}>Check Out</button>
        </div>
        {popUp && (
        <PopUp items={items} popUp={popUp} setPopUp={setPopUp}/>
        )}
        </>
    )
}

export default CartList;