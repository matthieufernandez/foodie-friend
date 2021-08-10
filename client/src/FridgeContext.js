import React, { useContext, createContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const FridgeContext = createContext(null);

export const FridgeContextProvider = ({ children }) => {
  const { currentUser, userStatus } = useContext(UserContext);
  const [fridge, setFridge] = useState(null);
  const [showItems, setShowItems] = useState(true);

  useEffect(() => {
    console.log(showItems);
    if (userStatus === "idle" && currentUser) {
      fetch(`/user/find/fridge/${currentUser.email}`)
        .then((res) => res.json())
        .then((data) => setFridge(data.result));
    } else {
      console.log("failure");
    }
  }, [currentUser, showItems]);

  return (
    <FridgeContext.Provider
      value={{
        showItems,
        setShowItems,
        fridge,
        setFridge,
      }}
    >
      {children}
    </FridgeContext.Provider>
  );
};

export default FridgeContext;
