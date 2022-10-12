import Link from "next/link";
import React from "react";
import { urlFor } from "../../lib/sanity/client";
import { ProductI } from "../../types/sanity";

interface ProductComponentI {
    product: ProductI;
}

const Product: React.FC<ProductComponentI> = ({ product }) => {
    const { image, name, slug, price } = product;
    return (
        <Link href={`/product/${slug.current}`}>
            <a>
                <div className="product-card">
                    <img
                        src={urlFor(image && image[0])}
                        alt={`${name}_image`}
                        width={250}
                        height={250}
                        className="product-image"
                    />
                    <p className="product-name">{name}</p>
                    <p className="product-price">{price}$</p>
                </div>
            </a>
        </Link>
    );
};

export default Product;
