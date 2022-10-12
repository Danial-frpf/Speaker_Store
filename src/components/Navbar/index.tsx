import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import Cart from "../Cart";

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateContext();
    return (
        <div className="navbar-container">
            <p className="logo">
                <Link href="/">HS Sounds</Link>
            </p>
            <button
                className="cart-icon"
                type="button"
                onClick={() => {
                    if (setShowCart) setShowCart(true);
                }}
            >
                <AiOutlineShopping />
                <span className="cart-item-qty">{totalQuantities}</span>
            </button>
            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;
