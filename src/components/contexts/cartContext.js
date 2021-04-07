import React from "react";

export const CartContext = React.createContext();

const ADD = "ADD";
const SUBTRACT = "SUBTRACT";
const REMOVE = "REMOVE";
const RESET = "RESET";
const SET_PRODUCT_COUNT = "SET_PRODUCT_COUNT";
const SET_STATE = "SET_STATE";

function reducer(state, { type, payload }) {
  switch (type) {
    case ADD:
      state.total += payload.price;
      state.totalItemCount += 1;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].product.id === payload.id) {
          state.items[i].count++;
          return { ...state };
        }
      }
      state.items.push({ count: 1, product: payload });
      return { ...state };
    case SUBTRACT:
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].product.id === payload.id) {
          state.items[i].count--;
          state.total -= payload.price;
          state.totalItemCount -= 1;
          if (state.items[i].count < 0) {
            state.items.splice(i, 1);
          }
          break;
        }
      }
      return { ...state };
    case REMOVE:
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].product.id === payload.id) {
          state.total -= state.items[i].count * state.items[i].product.price;
          state.totalItemCount -= state.items[i].count;
          state.items.splice(i, 1);
          break;
        }
      }
      return { ...state };
    case SET_PRODUCT_COUNT:
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].product.id === payload.product.id) {
          state.total -= state.items[i].count * state.items[i].product.price;
          state.totalItemCount -= state.items[i].count;

          if (payload.count > 0) {
            state.total += payload.count * state.items[i].product.price;
            state.totalItemCount += payload.count;
            state.items[i].count = payload.count;
          } else {
            state.items[i].count = 0;
          }
          break;
        }
      }
      return { ...state };
    case RESET:
      return { total: 0, totalItemCount: 0, items: [] };
    case SET_STATE:
      return payload;
    default:
      return state;
  }
}

function CartContextProvider(props) {
  const [cart, dispatch] = React.useReducer(reducer, { total: 0, totalItemCount: 0, items: [] });

  const addToCart = (product) => {
    dispatch({ type: ADD, payload: product });
  };

  const subtract = (product) => {
    dispatch({ type: SUBTRACT, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE, payload: product });
  };

  const setCount = (product, count) => {
    dispatch({ type: SET_PRODUCT_COUNT, payload: { product, count } });
  };

  const resetCart = () => {
    dispatch({ type: RESET });
  };

  React.useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      dispatch({ type: SET_STATE, payload: storedCart });
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, subtract, removeFromCart, setCount, resetCart }}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
