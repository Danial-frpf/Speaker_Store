import { NextApiRequest, NextApiResponse } from "next";
import { ProductI } from "../../src/types/sanity";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            shipping_options: [
                { shipping_rate: "shr_1LrHC4BiCrdOGwwLW2qfpcdZ" },
                { shipping_rate: "shr_1LrHFVBiCrdOGwwLI1B5G81A" },
            ],
            line_items: req.body.map((item: ProductI) => {
                const img = item.image[0].asset._ref;
                const newImage = img
                    .replace(
                        "image-",
                        "https://cdn.sanity.io/images/2iqltxma/production/"
                    )
                    .replace("-webp", ".webp");

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                            images: [newImage],
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
        };
        try {
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            const error = err as Error;
            console.log(error);
            res.status(500).json(error.message);
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}
