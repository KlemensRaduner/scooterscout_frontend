import React from "react";
import { CartContext } from "./cartContext";
import api from "../../config/api";

export const UserContext = React.createContext();

function UserContextProvider(props) {
  const { resetCart } = React.useContext(CartContext);
  const [user, setUserFunction] = React.useState(JSON.parse(localStorage.getItem("user")));

  const setUser = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUserFunction(newUser);
  };

  const login = (email, password) => {
    return api.post("/login", { email, password }).then((response) => {
      localStorage.setItem("token", response.headers["authorization"]);
      setUser(response.data);
    });
  };

  const hasAuthority = (authority) => {
    if (user && user.roles) {
      for (let i = 0; i < user.roles.length; i++) {
        let role = user.roles[i];
        for (let j = 0; j < role.authorities.length; j++) {
          if (role.authorities[j].name === authority) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const logout = () => {
    setUserFunction(null);
    resetCart();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, login, hasAuthority }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
