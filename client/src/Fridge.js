import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import BuildFridge from "./BuildFridge";
import FridgeContext from "./FridgeContext";
import { UserContext } from "./UserContext";

const Fridge = () => {
  const { fridge, setFridge, showItems, setShowItems } =
    useContext(FridgeContext);
  const { currentUser, userStatus } = useContext(UserContext);

  if (fridge) {
    return (
      <>
        <Wrapper>
          <ItemsArea>
            {fridge.map((item) => {
              return (
                <ul key={item.id}>
                  <FridgeItem>{item.name}</FridgeItem>
                </ul>
              );
            })}
          </ItemsArea>
          <BuildFridge />
          <Background />
        </Wrapper>
      </>
    );
  } else {
    return (
      <Wrapper>
        <BuildFridge />
        <Background />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100vw;
  background-color: #e08043;
`;

const ItemsArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 50vw;
`;

const FridgeItem = styled.li`
  list-style-type: none;
  padding: 5px;
  border-radius: 25px;
  border: solid black 2px;
  background-color: #e08043;
  box-shadow: 3px 4px 5px 0px #3b3d94;
  cursor: pointer;
  transition: all 0.7s;

  :hover {
    transform: translateY(-5px);
  }
`;

const ShowItems = styled.button`
  background-color: none;
`;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e08043;
`;

export default Fridge;
