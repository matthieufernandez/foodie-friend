import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { UserContext } from "./UserContext";

const BuildFridge = () => {
  const { currentUser } = useContext(UserContext);
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
      .then((res) => console.log(res));
  };

  const handleClick = () => {
    fetch(`/api/fridge/search/${queryItem.value}`)
      .then((res) => res.json())
      .then((data) => setIngredients(data.result.results));
  };

  console.log(currentUser);
  console.log(queryItem.value);
  console.log(ingredients);

  return ingredients ? (
    <>
      <Wrapper>
        Add items to your fridge
        <Searchbar onChange={handleChange} />
        <SearchButton onClick={handleClick}>Search</SearchButton>
        {ingredients.map((item) => {
          return (
            <HomeItem
              key={item.id}
              value={item}
              onClick={() => {
                addHandler(item);
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
            </HomeItem>
          );
        })}
        <Logout />
      </Wrapper>
    </>
  ) : (
    <Wrapper>
      <Searchbar onChange={handleChange} />
      <SearchButton onClick={handleClick}>Search</SearchButton>
      <Logout />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Searchbar = styled.textarea`
  background-color: #a7a8d9;
`;

const SearchButton = styled.button``;

const HomeItem = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ItemName = styled.p`
  font-weight: bold;
`;

const ItemImage = styled.img``;

export default BuildFridge;
