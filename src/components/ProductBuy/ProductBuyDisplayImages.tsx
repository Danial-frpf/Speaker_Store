import React, { useState } from "react";
import { urlFor } from "../../lib/sanity/client";
import { ImageProductI } from "../../types/sanity";

interface ProductBuyDisplayImagesI {
    image: ImageProductI[];
    name: string;
}

const ProductBuyDisplayImages: React.FC<ProductBuyDisplayImagesI> = ({
    image,
    name,
}) => {
    const [index, setIndex] = useState(0);
    return (
        <div>
            <div className="image-container">
                <img
                    className="product-detail-image"
                    src={urlFor(image && image[index])}
                    alt={`${name} image`}
                />
            </div>
            <div className="small-images-container">
                {image?.map((item, i) => (
                    <img
                        src={urlFor(item)}
                        key={item._key}
                        alt={`${name} image ${i}`}
                        className={
                            i === index
                                ? "small-image selected-image"
                                : "small-image"
                        }
                        onMouseEnter={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductBuyDisplayImages;
