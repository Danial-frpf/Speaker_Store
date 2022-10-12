import { NextPage } from "next";
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { ProductI } from "../types/sanity";

interface ContextI {
    showCart: boolean;
    cartItems?: ProductI[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    incQty?: () => void;
    decQty?: () => void;
    onAdd?: (product: ProductI, quantity: number) => void;
    setShowCart?: React.Dispatch<React.SetStateAction<boolean>>;
    setCartItems?: React.Dispatch<React.SetStateAction<ProductI[] | undefined>>;
    setTotalPrice?: React.Dispatch<React.SetStateAction<number>>;
    setTotalQuantities?: React.Dispatch<React.SetStateAction<number>>;
    toggleCartItemQuantity?: (id: string, value: "inc" | "dec") => void;
    onRemove?: (id: string) => void;
}

const INITIAL_VALUE = {
    showCart: false,
    totalPrice: 0,
    totalQuantities: 0,
    qty: 1,
};

const Context = createContext<ContextI>(INITIAL_VALUE);

interface StateContextI {
    children: React.ReactNode;
}

export const StateContext: NextPage<StateContextI> = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState<ProductI[]>();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct: ProductI | undefined;
    let index;

    const incQty = () => {
        setQty((prevQty) => ++prevQty);
    };

    const onAdd = (product: ProductI, quantity: number) => {
        const isProductInCart = cartItems?.find(
            (item) => item._id === product._id
        );

        setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
        setTotalQuantities((prevQty) => prevQty + quantity);
        if (isProductInCart) {
            const updatedCartItems = cartItems?.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct?.quantity
                            ? cartProduct?.quantity + quantity
                            : quantity,
                    };
                }
                return cartProduct;
            });
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            if (cartItems) setCartItems([...cartItems, { ...product }]);
            else setCartItems([product]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    };

    const onRemove = (id: string) => {
        if (!cartItems) return;
        foundProduct = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);
        setTotalPrice((prevPrice) => {
            if (foundProduct?.quantity)
                return prevPrice - foundProduct.price * foundProduct.quantity;
            return prevPrice;
        });
        setTotalQuantities((prevQty) => {
            if (foundProduct?.quantity) return prevQty - foundProduct.quantity;
            return prevQty;
        });
        setCartItems(newCartItems);
    };

    const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
        if (!cartItems) return;
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = [...cartItems];

        if (value === "inc" && foundProduct) {
            if (foundProduct?.quantity) foundProduct.quantity += 1;
            newCartItems[index] = foundProduct;
            setCartItems(newCartItems);
            setTotalPrice((prevPrice) => {
                if (foundProduct) return prevPrice + foundProduct.price;
                return prevPrice;
            });
            setTotalQuantities((prevQty) => prevQty + 1);
        } else if (
            value === "dec" &&
            foundProduct &&
            foundProduct.quantity &&
            foundProduct.quantity > 1
        ) {
            foundProduct.quantity -= 1;
            newCartItems[index] = foundProduct;
            setCartItems(newCartItems);
            setTotalPrice((prevPrice) => {
                if (foundProduct) return prevPrice - foundProduct.price;
                return prevPrice;
            });
            setTotalQuantities((prevQty) => prevQty - 1);
        }
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return --prevQty;
        });
    };

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
                setTotalPrice,
                setTotalQuantities,
                setCartItems,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default StateContext;

export const useStateContext = () => useContext(Context);
