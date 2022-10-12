import React, { useRef } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import { useStateContext } from "../../context/StateContext";
import getStripe from "../../lib/stipe/getStripe";
import CartBottom from "./CartBottom";
import CartProduct from "./CartProduct";
import EmptyCart from "./EmptyCart";

const Cart = () => {
    const cartRef = useRef(null);
    const { totalPrice, totalQuantities, cartItems, setShowCart } =
        useStateContext();

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItems),
        });

        if (response.status === 500) return;
        const data = await response.json();
        toast.loading("Redirecting...");
        stripe?.redirectToCheckout({ sessionId: data.id });
    };
    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    className="cart-heading"
                    type="button"
                    onClick={() => {
                        if (setShowCart) setShowCart(false);
                    }}
                >
                    <AiOutlineLeft />
                    <span className="heading">Your Cart</span>
                    <span className="cart-num-items">
                        {totalQuantities} items
                    </span>
                </button>
                {!cartItems && <EmptyCart />}
                {!cartItems ||
                    (cartItems && cartItems.length < 1 && <EmptyCart />)}
                <div className="product-container">
                    {cartItems &&
                        cartItems.map((item) => (
                            <CartProduct item={item} key={item._id} />
                        ))}
                </div>
                {cartItems && cartItems?.length >= 1 && (
                    <CartBottom
                        totalPrice={totalPrice}
                        handleCheckout={handleCheckout}
                    />
                )}
            </div>
        </div>
    );
};

export default Cart;
