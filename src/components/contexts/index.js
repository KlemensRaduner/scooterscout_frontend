import React from "react";
import UserContextProvider, {UserContext} from "./userContext";
import FilterContextProvider, {FilterContext} from "./filterContext";
import CartContextProvider, {CartContext} from "./cartContext";
import ScooterContextProvider from "./scooterContext";

export default function ContextProvider(props) {
    return (
        <ScooterContextProvider>
            <CartContextProvider>
                <FilterContextProvider>
                    <UserContextProvider>{props.children} </UserContextProvider>
                </FilterContextProvider>
            </CartContextProvider>
        </ScooterContextProvider>
    );
}

export {UserContext, FilterContext, CartContext};
