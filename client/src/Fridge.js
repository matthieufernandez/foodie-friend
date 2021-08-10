import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import BuildFridge from "./BuildFridge";
import FridgeContext from "./FridgeContext";
import { UserContext } from "./UserContext";

const Fridge = () => {
  const { fridge, setFridge, showItems, setShowItems } =
    useContext(FridgeContext);
  const { currentUser, userStatus } = useContext(UserContext);

  if (fridge && fridge.length > 0) {
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
          {/* <ShowItems onClick={handleShow}>Show items in your fridge:</ShowItems> */}
          <BuildFridge />
          <Background />
        </Wrapper>
      </>
    );
  }

  return (
    <Wrapper>
      <BuildFridge />
      <Background />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100vw;
  background-color: #e08043;
`;

const ItemsArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 50vw;
`;

const FridgeItem = styled.li``;

const ShowItems = styled.button`
  background-color: none;
`;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e08043;
`;

export default Fridge;
