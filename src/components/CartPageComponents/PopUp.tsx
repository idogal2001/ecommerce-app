import React from "react"
import '../../styles/CartPage/PopUp.scss'

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

interface PopUpProps {
    items: Item[];
    popUp: boolean;
    setPopUp: React.Dispatch<React.SetStateAction<boolean>>
}

const PopUp = ({ items, popUp, setPopUp }: PopUpProps) => {

    const checkOut =() => {
        setPopUp(!popUp);
    }

    return(
        <div className="popUpBackground">
        <div className="popUp">
        <p className="checkUutBox">
        {items.map((item: Item) => (
            <span className="checkOutBoxItem" key={item.id}><p><img className="img" alt = {`product${item.id}`} src = {item.image}></img></p><p>{item.name}</p><p>{item.amount}</p><p>{item.priceTotalOfItem}₪</p></span>
        ))}
        </p>
        <div className="checkOutButtonPadding"><button className="checkOutButton" onClick={checkOut}>Close!</button></div>
        </div>
    </div>
    )
}

export default PopUp;