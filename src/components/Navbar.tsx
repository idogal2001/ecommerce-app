import React ,{ useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = (amountList: any) => {
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        const saveAmount: string | null = localStorage.getItem("amountOfItems");
        if(saveAmount){
            setAmount(Number(saveAmount));
        }
        else{
            setAmount(Number(0));
        }
    }, [amountList])

    return (
        <nav className="navbar">
        <div className="leftNav"><Link to="/" className="navbarInfo">Home</Link></div>
        <div className="rightNav">
        <Link to="/CartList"><button className="cartButton">{amount}<span className="cartButtonPadding"> Cart</span><FaCartShopping /></button></Link>
        </div>
    </nav>
    )
}

export default Navbar;