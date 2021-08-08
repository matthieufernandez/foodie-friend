import React, { useContext } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { UserContext } from "./UserContext";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);
  return (
    <Wrapper>
      <ProfileArea>
        <ProfilePic alt="profile picture" src={currentUser.picture} />
        <NameArea>{currentUser.name}</NameArea>
      </ProfileArea>
      <Logout />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #e08043;
`;

const ProfileArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15vh;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  padding: 10px;
`;

const NameArea = styled.h1``;

export default Profile;
