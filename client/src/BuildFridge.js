import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { UserContext } from "./UserContext";
import { FridgeContext } from "./FridgeContext";

const BuildFridge = () => {
  const { currentUser } = useContext(UserContext);
  const { setShowItems, showItems } = useContext(FridgeContext);
  const [queryItem, setQueryItem] = useState("");
  const [ingredients, setIngredients] = useState(null);

  const handleChange = (event) => {
    setQueryItem({ value: event.target.value });
  };

  const addHandler = (item) => {
    fetch(`/user/update/fridge/${currentUser.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then(() => setShowItems(!showItems))
      .then((res) => {
        if (res?.message === "duplicate") {
          console.log("duplicate");
        } else {
          console.log("success");
        }
      });
  };

  const handleClick = () => {
    if (!queryItem.value) {
      console.log("error");
    } else {
      fetch(`/api/fridge/search/${queryItem.value}`)
        .then((res) => res.json())
        .then((data) => setIngredients(data.result.results));
    }
  };

  return ingredients ? (
    <>
      <Wrapper>
        <Main>
          <Searchbar onChange={handleChange} />
          <SearchButton onClick={handleClick}>Search</SearchButton>
        </Main>
        <ItemWrapper>
          {ingredients.map((item) => {
            return (
              <HomeItems
                key={item.id}
                value={item}
                onClick={() => {
                  if (!queryItem) {
                    console.log("not valid");
                  } else {
                    addHandler(item);
                  }
                }}
              >
                <ItemName key={item.name} value={item}>
                  {item.name}
                </ItemName>
                <ItemImage
                  key={item.image}
                  value={item}
                  src={` https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
                />
              </HomeItems>
            );
          })}
        </ItemWrapper>
        <Logout />
        <Background />
      </Wrapper>
    </>
  ) : (
    <Wrapper>
      <Searchbar onChange={handleChange} />
      <SearchButton onClick={handleClick}>Search</SearchButton>
      <Logout />
      <Background />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #e08043;
  height: 100%;
  width: 100vw;
`;

const Main = styled.div`
  display: flex;
  background-color: #e08043;
`;

const Searchbar = styled.textarea`
  background-color: #a7a8d9;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50vw;
  margin-top: 15vh;
  background-color: #3b3d94;
  padding: 40px;
  border-radius: 15px;
`;

const SearchButton = styled.button``;

const HomeItems = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px;
  border-radius: 15px;
  background-color: #a7a8d9;
  padding: 50px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 10px 10px 5px 0px black;

  :active {
    transform: scale(1.2);
  }

  :hover {
    opacity: 70%;
  }
`;

const ItemName = styled.p`
  font-weight: bold;
`;

const ItemImage = styled.img`
  border-radius: 15px;
  max-height: 150px;
  max-width: 150px;
`;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e08043;
`;

export default BuildFridge;
