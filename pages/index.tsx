import type { NextPage } from "next";
import { FooterBanner, HeroBanner, Product } from "../src/components";
import { client } from "../src/lib/sanity/client";
import { BannerI, ProductI } from "../src/types/sanity";

interface HomeI {
    products: ProductI[];
    bannerData: BannerI[];
}

const Home: NextPage<HomeI> = ({ products, bannerData }) => {
    return (
        <div>
            <HeroBanner
                heroBanner={bannerData.length ? bannerData[0] : undefined}
            />
            <div className="products-heading">
                <h2>Best Selling Products</h2>
                <p>Speaker of many variations</p>
            </div>
            <div className="products-container">
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
            <FooterBanner banner={bannerData && bannerData[0]} />
        </div>
    );
};

export const getServerSideProps = async () => {
    const productQuery = '*[_type=="product"]';
    const products = await client.fetch(productQuery);

    const bannerQuery = "*[_type=='banner']";
    const bannerData = await client.fetch(bannerQuery);

    return {
        props: { products, bannerData },
    };
};

export default Home;
