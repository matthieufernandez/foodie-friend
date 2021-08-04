import React from "react";
import styled from "styled-components";
import Login from "./Login";
import Logout from "./Logout";
import ProfileRegistration from "./ProfileRegistration";
import Registration from "./Registration";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <Header />
      <Registration />
    </>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  background-color: #e08043;
  max-width: 100%;
  max-height: 100%;
`;

const Title = styled.h1`
  font-family: Roboto, sans-serif;
  color: #45468a;
`;
