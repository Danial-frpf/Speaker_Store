import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";

const EmptyCart = () => {
    const { setShowCart } = useStateContext();
    return (
        <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping Bag is empty</h3>
            <Link href="/">
                <button
                    className="btn"
                    type="button"
                    onClick={() => {
                        if (setShowCart) setShowCart(false);
                    }}
                >
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
};

export default EmptyCart;
