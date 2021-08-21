import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProfileRegistration = () => {
  let history = useHistory();
  let { user } = useAuth0();
  const { setCurrentUser, isRegistered, setIsRegistered } =
    useContext(UserContext);

  user = { ...user, ...{ fridge: [], recipeBook: [], friends: [] } }; // this data is sent to db as the full user profile.

  const handleRegister = (isRegistered) => {
    fetch("/user/create", {
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
    setCurrentUser(user);
  };

  return !isRegistered ? (
    <>
      <ProfilePicture src={user.picture} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>
        You're almost done! If the information above is correct, please complete
        your registration by clicking on the button below!
      </p>
      {/* <p>{JSON.stringify(user)}</p> */}
      <RegisterButton onClick={handleRegister}>Register</RegisterButton>
    </>
  ) : (
    <>
      <h1>Registration Complete!</h1>
      <p>You can now start adding items to your fridge!</p>
      <p>You can also visit your profile or see your recipe book!</p>
      <button onClick={() => history.push("/buildfridge")}>
        Click Here to Continue...
      </button>
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

const ProfilePicture = styled.img`
  max-height: 100px;
  max-width: 100px;
`;

export default ProfileRegistration;
