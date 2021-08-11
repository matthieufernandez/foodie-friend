import React, { useContext } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import ProfileRegistration from "./ProfileRegistration";
import Profile from "./Profile";
import RecipeList from "./RecipeList";
import BuildFridge from "./BuildFridge";
import Recipe from "./Recipe";
import Registration from "./Registration";
import Header from "./Header";
import { UserContext } from "./UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import Fridge from "./Fridge";

const App = () => {
  let userProfile = "";
  const { isLoading } = useAuth0();
  const { userStatus, currentUser } = useContext(UserContext);

  if (userStatus === "idle" && currentUser) {
    userProfile = currentUser.nickname;
  } else {
    console.log(userStatus);
  }

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Switch>
          <Route path="/recipelist">
            <RecipeList />
          </Route>
          <Route exact path="/recipe/:id">
            <Recipe />
          </Route>
          <Route path="/fridge">
            <Fridge />
          </Route>
          {/* <Route exact path="/buildfridge">
            <BuildFridge />
          </Route> */}
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>

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
