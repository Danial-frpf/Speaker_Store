import React from "react";
import { ProductI } from "../../types/sanity";
import Product from "../Product";

interface MayLikeProductsI {
    products: ProductI[];
}

const MayLikeProducts: React.FC<MayLikeProductsI> = ({ products }) => {
    return (
        <div className="maylike-products-wrapper">
            <h2>You may also like</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {products.map((item) => (
                        <Product key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MayLikeProducts;
