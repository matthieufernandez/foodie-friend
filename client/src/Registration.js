import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileRegistration from "./ProfileRegistration";

const Registration = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  return !isAuthenticated ? (
    <Wrapper>
      <Main>
        <WelcomeTitle>Welcome to Foodie Friend!</WelcomeTitle>
        <WelcomeMessage>
          To begin your journey to world-class chefdom, please create an
          account. This will give you access to your fridge and recipe book.
        </WelcomeMessage>
        <WelcomeMessage>
          You can also click on your profile icon in the top-right to log in.
        </WelcomeMessage>
        <WelcomeButton onClick={loginWithRedirect}>
          CLICK HERE TO BEGIN
        </WelcomeButton>
      </Main>
    </Wrapper>
  ) : (
    <Wrapper>
      <Main>
        <ProfileRegistration />
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e08043;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  align-items: center;
  margin-top: -10vh;
  background-color: #515294;
  height: 50vh;
  width: 30vw;
  font-family: American Typewriter, serif;
  color: white;
  padding: 15px;
`;

const WelcomeTitle = styled.h2`
  color: white;
`;

const WelcomeMessage = styled.p`
  font-size: 18px;
  margin-top: -5vh;
  color: white;
  text-align: center;
`;

const WelcomeButton = styled.button`
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

export default Registration;
