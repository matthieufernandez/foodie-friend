import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";

const Login = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  // const handleLogin = () => {
  //   fetch("/api/user/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("successfully created user", data))
  //     .then(() => loginWithRedirect())
  //     .catch((err) => console.log({ error: err }));
  // };

  return (
    !isAuthenticated && (
      <LoginButton onClick={loginWithRedirect}>Log In</LoginButton>
    )
  );
};

const LoginButton = styled(CgProfile)`
  color: #a7a8d9;
  cursor: pointer;
  width: 9vw;
  height: 9vh;
`;

export default Login;
