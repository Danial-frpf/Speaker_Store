import React from "react";

interface CartBottomI {
    totalPrice: number;
    handleCheckout: () => void;
}

const CartBottom: React.FC<CartBottomI> = ({ totalPrice, handleCheckout }) => {
    return (
        <div className="cart-bottom">
            <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
                <button className="btn" type="button" onClick={handleCheckout}>
                    Pay with Stripe
                </button>
            </div>
        </div>
    );
};

export default CartBottom;
