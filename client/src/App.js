import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import ProfileRegistration from "./ProfileRegistration";
import BuildFridge from "./BuildFridge";
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
      <BrowserRouter>
        <Header />
        <Route exact path="/buildfridge">
          <BuildFridge />
        </Route>
        <Route exact path="/">
          <Registration />
        </Route>
      </BrowserRouter>
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
