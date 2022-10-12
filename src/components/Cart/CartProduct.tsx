import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../../context/StateContext";
import { urlFor } from "../../lib/sanity/client";
import { ProductI } from "../../types/sanity";

interface CartProductI {
    item: ProductI;
}

const CartProduct: React.FC<CartProductI> = ({ item }) => {
    const { toggleCartItemQuantity, onRemove } = useStateContext();
    return (
        <div className="product">
            <img
                className="cart-product-image"
                src={urlFor(item.image[0])}
                alt={`${item.name} image`}
            />
            <div className="item-desc">
                <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                    <div>
                        <p className="quantity-desc">
                            <span
                                className="minus"
                                onClick={() => {
                                    if (toggleCartItemQuantity)
                                        toggleCartItemQuantity(item._id, "dec");
                                }}
                            >
                                <AiOutlineMinus />
                            </span>
                            <span className="num">{item.quantity}</span>
                            <span
                                className="plus"
                                onClick={() => {
                                    if (toggleCartItemQuantity)
                                        toggleCartItemQuantity(item._id, "inc");
                                }}
                            >
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <button
                        className="remove-item"
                        type="button"
                        onClick={() => {
                            if (onRemove) onRemove(item._id);
                        }}
                    >
                        <TiDeleteOutline />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
