import React, { useContext, useState, useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const { user } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [userStatus, setUserStatus] = useState("loading");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    const checkEmail = user?.email;
    console.log(checkEmail);
    fetch(`/user/find/${checkEmail}`)
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.result))
      .then(() => console.log(currentUser))
      .then(() => setUserStatus("idle"))
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userStatus,
        isRegistered,
        setIsRegistered,
        isFirstLogin,
        setIsFirstLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
