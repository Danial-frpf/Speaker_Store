import Link from "next/link";
import React from "react";
import { urlFor } from "../../lib/sanity/client";
import { BannerI } from "../../types/sanity";

interface FooterBannerI {
    banner: BannerI;
}

const FooterBanner: React.FC<FooterBannerI> = ({ banner }) => {
    const {
        discount,
        largeText1,
        largeText2,
        saleTime,
        smallText,
        midText,
        product,
        buttonText,
        image,
        desc,
    } = banner;
    return (
        <div className="footer-banner-container">
            <div className="banner-desc">
                <div className="left">
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>
                <div className="right">
                    <p>{smallText}</p>
                    <h3>{midText}</h3>
                    <p>{desc}</p>
                    <Link href={`/product/${product}`}>
                        <button type="button">{buttonText}</button>
                    </Link>
                </div>
                <img
                    className="footer-banner-image"
                    src={urlFor(image)}
                    alt="banner image"
                />
            </div>
        </div>
    );
};

export default FooterBanner;
