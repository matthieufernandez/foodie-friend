import React, { useContext } from "react";
import BuildFridge from "./BuildFridge";
import styled from "styled-components";

const Fridge = () => {
  return (
    <Wrapper>
      These items are currently in your fridge:
      <BuildFridge />
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

export default Fridge;
