import { GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { MayLikeProducts, ProductBuy } from "../../src/components";
import { client } from "../../src/lib/sanity/client";
import { ProductI } from "../../src/types/sanity";

interface ProductDetailsI {
    product: ProductI;
    products: ProductI[];
}

const ProductDetails: NextPage<ProductDetailsI> = ({ product, products }) => {
    return (
        <>
            <ProductBuy product={product} />
            <MayLikeProducts products={products} />
        </>
    );
};

interface ParamsI extends ParsedUrlQuery {
    slug: string;
}

export const getStaticPaths = async () => {
    const query = `*[_type=="product"] {
        slug {
            current
        }
    }`;

    const products = (await client.fetch(query)) as ProductI[];
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current,
        },
    }));
    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as ParamsI;

    const productQuery = `*[_type=="product" && slug.current=='${slug}'][0]`;
    const similarProductsQuery = '*[_type=="product"]';

    const product = await client.fetch(productQuery);
    const products = await client.fetch(similarProductsQuery);

    return {
        props: { product, products },
    };
};

export default ProductDetails;
