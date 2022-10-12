import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = sanityClient({
    projectId: "2iqltxma",
    dataset: "production",
    apiVersion: "2022-10-08",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource | undefined) => {
    if (source) return builder.image(source).toString();
    return "";
};
