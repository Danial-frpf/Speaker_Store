import React, { useState } from "react";
import { ProductI } from "../../types/sanity";
import ProductBuyDetails from "./ProductBuyDetails";
import ProductBuyDisplayImages from "./ProductBuyDisplayImages";

interface ProductBuyI {
    product: ProductI;
}

const ProductBuy: React.FC<ProductBuyI> = ({ product }) => {
    const { image, name } = product;

    return (
        <div
            className="product-detail-container"
            style={{ justifyContent: "center" }}
        >
            <ProductBuyDisplayImages image={image} name={name} />
            <ProductBuyDetails product={product} />
        </div>
    );
};

export default ProductBuy;
