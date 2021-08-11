import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import {
  CgMenuBoxed,
  CgSmartHomeRefrigerator,
  CgProfile,
} from "react-icons/cg";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  let { currentUser, userStatus } = useContext(UserContext);

  const handleProfile = () => {
    if (userStatus === "idle" && currentUser) {
      history.push(`/profile/${currentUser.nickname}`);
    } else {
      history.push("/login");
    }
  };

  const handleFridge = () => {
    if (userStatus === "idle" && currentUser) {
      history.push("/fridge");
    } else {
      console.log("sign in to access fridge");
    }
  };

  const handleRecipe = () => {
    if (userStatus === "idle" && currentUser) {
      history.push("/recipelist");
    } else {
      console.log("sign in to access recipe book");
    }
  };

  return (
    <>
      <Desktop>
        <Nav>
          <MenuIcons>
            <RecipeIcon alt="Recipe Book" onClick={handleRecipe} />

            <FridgeIcon alt="Your Fridge" onClick={handleFridge} />
          </MenuIcons>
          <Title onClick={() => history.push("./")}>Foodie Friend</Title>
          <ProfileIcons>
            <ProfileIcon alt="Your Profile" onClick={handleProfile} />
          </ProfileIcons>
        </Nav>
      </Desktop>
    </>
  );
};

// Versions
const Desktop = styled.div`
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;
const Mobile = styled.div`
  @media only screen and (min-width: 801px) {
    display: none;
  }
`;

// Variable
const button = css`
  --fontSizeXl: 40px;
  --fontSizeLg: 35px;
  --fontSizeMd: 30px;
  color: white;
  font-size: var(--fontSizeXl);
  @media only screen and (max-width: 1200px) {
    font-size: var(--fontSizeLg);
  }
  @media only screen and (max-width: 800px) {
    font-size: var(--fontSizeMd);
  }
`;

const Nav = styled.nav`
  width: 100vw;
  height: 10vh;
  background-color: #45468a;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  @media only screen and (max-width: 800px) {
    display: flex;
    justify-content: space-evenly;
  }
`;

const RecipeIcon = styled(CgMenuBoxed)`
  color: #a7a8d9;
  margin-left: 0;
  width: 9vw;
  height: 9vh;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #e08043;
  }
`;

const MenuIcons = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: -13vw;
`;

const ProfileIcons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: -10vw;
`;

const ProfileIcon = styled(CgProfile)`
  color: #a7a8d9;
  cursor: pointer;
  width: 9vw;
  height: 9vh;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #e08043;
  }
`;

const FridgeIcon = styled(CgSmartHomeRefrigerator)`
  color: #a7a8d9;
  margin-left: -3vw;
  width: 9vw;
  height: 9vh;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.2);
    color: #e08043;
  }
`;

const Title = styled.h1`
  color: #e08043;
  font-size: 32px;
  font-family: American Typewriter, serif;
  font-weight: 400;
  font-style: italic;
  transition: 1.2s;

  &:hover {
    cursor: pointer;
    transform: translateY(1.2);
  }
`;

export default Header;
