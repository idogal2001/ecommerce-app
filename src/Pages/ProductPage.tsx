import { Link, useParams  } from 'react-router-dom';
import { ProductsDataBackUp } from '../components/ProductsDataBackUp';
import React, { useState, useContext } from 'react';
import NotFoundPage from './NotFoundPage';
import Navbar from '../components/Navbar';
import { amountContext } from './HomePage';

interface product {
    category: string;
    name: string;
    date: string;
    price: number;
    description: string;
    image: string;
    id: number;
}

// const Product = ({setAmount, categoryFilter ,maxPriceRange ,minPriceRange, priceSortLow, priceSortHigh, dateSortOld, dateSortNew, search}: ProductFilter) => {
const ProductPage = () => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }
    
    const [amount, setAmount] = amountData;

    const { id } = useParams<string>();
    const productInfo = ProductsDataBackUp.filter((product: product) => product.id === Number(id))
    const [priceTotal, setPriceTotal] = useState<number>(0);
    const [amountItem, setItemAmount] = useState<number>(0);
    const [negativeAmount, setNegativeAmount] = useState<boolean>(false);
    const [tooMuchItems, setTooMuchItems] = useState<boolean>(false);
    const [notWholeNumber, setNotWholeNumber] = useState<boolean>(false);

    const changeAmount = (value: React.FormEvent<HTMLInputElement>) => {
                if(value.currentTarget.value === ""){
                    setNegativeAmount(false);
                    setTooMuchItems(false);
                    setNotWholeNumber(false);
                    setPriceTotal(0);
                }
                if(Number(value.currentTarget.value) > 20){
                    setTooMuchItems(true);
                    setNotWholeNumber(false);
                    setNegativeAmount(false);
                    setPriceTotal(0);
                }
                if(Number(value.currentTarget.value) <= 0 && value.currentTarget.value !== ""){
                    setNegativeAmount(true);
                    setTooMuchItems(false);
                    setNotWholeNumber(false);
                    setPriceTotal(0);
                }
                if((Number(value.currentTarget.value) % 1) !== 0){
                    setNotWholeNumber(true);
                    setNegativeAmount(false);
                    setTooMuchItems(false);
                    setPriceTotal(0);
                }
                if(Number(value.currentTarget.value) > 0 && Number(value.currentTarget.value) <= 20 && (Number(value.currentTarget.value) % 1) === 0){
                    setTooMuchItems(false);
                    setNegativeAmount(false);
                    setItemAmount(Number(value.currentTarget.value));
                setPriceTotal((Number(value.currentTarget.value) * productInfo[0].price))
        }
    }

    const addProduct = (id: number, image: string, name: string, price: number, amountItem: number, priceTotal: number) => {
        if(!negativeAmount && !tooMuchItems && !notWholeNumber){
            const itemInfo = {name: name, priceOfItem: price, priceTotalOfItem: priceTotal , amount: amountItem, id: id};
            const amount: string | null = localStorage.getItem("amountOfItems");
            if(amount){
                if(localStorage.getItem(id.toString()) === null){
                    const newAmount = Number(amount) + amountItem;
                    localStorage.setItem("amountOfItems", (amountItem + Number(amount)).toString());
                    setAmount({ number: newAmount });
                }
                else{
                    const amountOfSpeItem: string | null = localStorage.getItem(id.toString());
                    if(amountOfSpeItem){
                        const data = JSON.parse(amountOfSpeItem);
                        const newAmount = amountItem + Number(amount) - data.amount;
                        localStorage.setItem("amountOfItems", (amountItem + Number(amount) - data.amount).toString());
                        setAmount({ number: newAmount })
                    }
                }
            }
            else{
                localStorage.setItem("amountOfItems", amountItem.toString());
                setAmount({ number: amountItem});
            }
            localStorage.setItem(id.toString(), JSON.stringify(itemInfo));
        }
    }

    if(Number(id) <= ProductsDataBackUp.length && Number(id) >=0){
        return (
            <div className="productPage">
            <Navbar />
            <div className="webContainerProduct">
                <div className="productInfo">
                    <img src={productInfo[0].image} alt="Product" /> 
                    <p>{productInfo[0].name}</p>
                    <p>Category: {productInfo[0].category}</p>
                    <p>Price: {productInfo[0].price}₪</p>
                    <span className="descriptionPadding">Description: {productInfo[0].description}</span> 
                    <span className="productAmount">
                        <input className="itemInput" type="number" placeholder='Amount of Item' onChange={changeAmount}></input>
                    </span>
                    <span  className="priceOfItem">Price: {priceTotal}₪</span>
                    {negativeAmount && (<div className="errorChoice">Please choose a positive number!</div>)}
                    {tooMuchItems && (<div className="errorChoice">Please choose less then 20!</div>)}
                    {notWholeNumber && (<div className="errorChoice">Please choose a whole number!</div>)}
                    <span className = "addCartButtonPadding">
                        <button className="addCartButton" onClick={() => addProduct(productInfo[0].id, productInfo[0].image, productInfo[0].name, productInfo[0].price, amountItem, priceTotal)}>Add To Cart</button>
                        </span>
                    <Link to="/"><span className="linkToHomePage">Continue shopping :</span></Link>
                </div>
            </div>
        </div>
        );
    }
    else{
        return(
            <NotFoundPage />
            )
    }
}

export default ProductPage;