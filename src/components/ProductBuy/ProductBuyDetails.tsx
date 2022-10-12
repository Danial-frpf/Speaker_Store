import React from "react";
import {
    AiFillStar,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineStar,
} from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import { ProductI } from "../../types/sanity";

interface ProductBuyDetailsI {
    product: ProductI;
}

const ProductBuyDetails: React.FC<ProductBuyDetailsI> = ({ product }) => {
    const { name, details, price } = product;

    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd!(product, qty);
        setShowCart!(true);
    };

    return (
        <div className="product-details-desc">
            <h1>{name}</h1>
            <div className="reviews">
                <div>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
                </div>
            </div>
            <p>{20}</p>
            <h4>Details: </h4>
            <p>{details}</p>
            <p className="price">${price}</p>
            <div className="quantity">
                <h3>Quantity</h3>
                <p className="quantity-desc">
                    <button style={{ border: "none" }}>
                        <span className="minus" onClick={decQty}>
                            <AiOutlineMinus />
                        </span>
                    </button>

                    <span className="num">{qty}</span>
                    <button style={{ border: "none" }}>
                        <span className="plus" onClick={incQty}>
                            <AiOutlinePlus />
                        </span>
                    </button>
                </p>
            </div>
            <div className="buttons">
                <button
                    className="add-to-cart"
                    type="button"
                    onClick={() => {
                        if (onAdd) onAdd(product, qty);
                    }}
                >
                    Add to Cart
                </button>
                <button
                    className="buy-now"
                    type="button"
                    onClick={handleBuyNow}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductBuyDetails;
