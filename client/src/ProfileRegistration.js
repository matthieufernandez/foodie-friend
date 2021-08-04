import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Logout from "./Logout";

const ProfileRegistration = () => {
  const { user, isAuthenticated } = useAuth0();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    console.log(user);
    fetch("http://localhost:4000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("error: ", err));

    setIsRegistered(true);
  };

  return !isRegistered ? (
    <>
      <img src={user.picture} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>
        You're almost done! If the information above is correct, please complete
        your registration by clicking on the button below!
      </p>
      {/* <p>{JSON.stringify(user)}</p> */}
      <RegisterButton onClick={handleRegister}>Register</RegisterButton>
      <Logout />
    </>
  ) : (
    <>
      <h1>Registration Complete!</h1>
      <Logout />
    </>
  );
};

const RegisterButton = styled.button`
  margin-bottom: 5vh;
  text-decoration: none;
  background-color: #a7a8d9;
  font-family: American Typewriter, serif;
  transition: all 0.2s;
  box-sizing: border-box;
  border: none;
  border-radius: 3px;
  height: 35px;

  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);

  &:hover {
    background-color: #e08043;
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export default ProfileRegistration;
