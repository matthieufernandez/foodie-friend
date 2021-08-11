import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";

const Login = () => {
  const { isLoading, loginWithRedirect, isAuthenticated, user } = useAuth0({
    appState: { target: "/profile" },
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    !isAuthenticated && (
      <LoginButton
        onClick={loginWithRedirect({
          redirect_uri: "http://localhost:3000/profile",
        })}
      >
        Log In
      </LoginButton>
    )
  );
  isAuthenticated && (
    <LoginButton
      onClick={loginWithRedirect({
        redirect_uri: "http://localhost:3000/profile",
      })}
    >
      Log In
    </LoginButton>
  );
};

const LoginButton = styled(CgProfile)`
  display: none;
  color: #a7a8d9;
  cursor: pointer;
  width: 9vw;
  height: 9vh;
`;

export default Login;
