import React from "react";
import styled from "styled-components";

const App = () => {
  return (
    <Wrapper>
      <Title>This is the beginning of a tasty friendship...</Title>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  background-color: #98a189;
  max-width: 100%;
  max-height: 100%;
`;

const Title = styled.h1`
  color: #edb1cb;
`;
