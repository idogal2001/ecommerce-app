import { Link, useParams  } from 'react-router-dom';
import { ProductsDataBackUp } from '../ProductsDataBackUp';
import React, { useState, useContext } from 'react';
import NotFoundPage from './NotFoundPage';
import Navbar from '../components/Navbar';
import { amountContext } from './HomePage';
import AddItemProductPage from '../components/AddItemProductPage';
import 'C:/code/trainning/reactEcommerce/ecommerce-app/src/styles/ProductPage/ProductPage.scss';

interface product {
    category: string;
    name: string;
    date: string;
    price: number;
    description: string;
    image: string;
    id: number;
}

const ProductPage = () => {

    const amountData = useContext(amountContext);

    if (!amountData) {
      throw new Error('amountContext is not provided');
    }
    
    const [amount, setAmount] = amountData;

    const { id } = useParams<string>();
    const productInfo = ProductsDataBackUp.filter((product: product) => product.id === Number(id))
    const [priceTotal, setPriceTotal] = useState<number>(0);
    const [itemAmount, setItemAmount] = useState<number>(0);
    const [checkAmount, setCheckAmount] = useState({
        NegativeAmount: false,
        TooMuchItems: false,
        NotWholeNumber: false,
        NoChange: true
    })

    const changeAmount = (value: React.FormEvent<HTMLInputElement>) => {
        const checkAmountData={
            NegativeAmount: false,
            TooMuchItems: false,
            NotWholeNumber: false,
            NoChange: true
        }
                if(Number(value.currentTarget.value) === 0){
                    checkAmountData.NoChange = true;
                    setPriceTotal(0);
                }              
                if(Number(value.currentTarget.value) > 20){
                    checkAmountData.TooMuchItems = true;
                    setPriceTotal(0);
                }
                if(Number(value.currentTarget.value) < 0){
                    checkAmountData.NegativeAmount = true;
                    setPriceTotal(0);
                }
                if((Number(value.currentTarget.value) % 1) !== 0){
                    checkAmountData.NotWholeNumber = true;
                    setPriceTotal(0);
                }
                if(Number(value.currentTarget.value) > 0 && Number(value.currentTarget.value) <= 20 && (Number(value.currentTarget.value) % 1) === 0){
                    checkAmountData.NoChange = false;
                    setItemAmount(Number(value.currentTarget.value));
                    setPriceTotal((Number(value.currentTarget.value) * productInfo[0].price))
        }
        setCheckAmount(checkAmountData);
    }              

    if(Number(id) <= ProductsDataBackUp.length && Number(id) >=0){
        return (
            <div className="productPage">
            <Navbar amountList={amount}/>
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
                    {checkAmount.NegativeAmount && (<div className="errorChoice">Please choose a positive number!</div>)}
                    {checkAmount.TooMuchItems && (<div className="errorChoice">Please choose less then 20!</div>)}
                    {checkAmount.NotWholeNumber && (<div className="errorChoice">Please choose a whole number!</div>)}
                    <amountContext.Provider value={[amount, setAmount]}>
                    <AddItemProductPage
                    id={productInfo[0].id}
                    image={productInfo[0].image}
                    description={productInfo[0].description}
                    name={productInfo[0].name}
                    price={productInfo[0].price}
                    priceTotal={priceTotal}
                    itemAmount={itemAmount}
                    noChange={checkAmount.NoChange} 
                    tooMuch={checkAmount.TooMuchItems} 
                    negativeAmount={checkAmount.NegativeAmount} 
                    notWhole={checkAmount.NotWholeNumber}
                    />
                    </amountContext.Provider>
                    <Link to="/"><span className="linkToHomePage">Continue shopping :)</span></Link>
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