export interface ProductI {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    details: string;
    image: ImageProductI[];
    name: string;
    price: number;
    slug: SlugI;
    quantity?: number;
}

export interface BannerI {
    _createdAt: Date;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: Date;
    buttonText: string;
    desc: string;
    discount: string;
    image: ImageBannerI;
    largeText1: string;
    largeText2: string;
    midText: string;
    product: string;
    saleTime: string;
    smallText: string;
}

export interface ImageBannerI {
    _type: string;
    asset: AssetI;
}

export interface ImageProductI {
    _key: string;
    _type: string;
    asset: AssetI;
}

export interface AssetI {
    _ref: string;
    _type: string;
}

export interface SlugI {
    _type: string;
    current: string;
}
