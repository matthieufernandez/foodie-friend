import React, { useContext, useState, useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const { user } = useAuth0();
  const [currentUser, setCurrentUser] = useState(null);
  const [userStatus, setUserStatus] = useState("loading");

  useEffect(() => {
    const checkEmail = user?.email;
    console.log(checkEmail);
    fetch(`/user/find/${checkEmail}`)
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.result))
      .then(() => setUserStatus("idle"))
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
