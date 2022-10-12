import Link from "next/link";
import React from "react";
import { urlFor } from "../../lib/sanity/client";
import { BannerI } from "../../types/sanity";

interface HeroBannerI {
    heroBanner: BannerI | undefined;
}

const HeroBanner: React.FC<HeroBannerI> = ({ heroBanner }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">{heroBanner?.smallText}</p>
                <h3>{heroBanner?.midText}</h3>
                <h1>{heroBanner?.largeText1}</h1>
                <img
                    className="hero-banner-image"
                    src={urlFor(heroBanner?.image)}
                    alt="headphones"
                />
            </div>
            <div>
                <Link href={`/product/${heroBanner?.product}`}>
                    <button type="button">{heroBanner?.buttonText}</button>
                </Link>
            </div>
            <div className="desc">
                <h5 style={{ color: "#ffffff" }}>Description</h5>
                <p style={{ color: "#cccccc" }}>{heroBanner?.desc}</p>
            </div>
        </div>
    );
};

export default HeroBanner;
