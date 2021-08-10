import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { UserContext } from "./UserContext";
import { FridgeContext } from "./FridgeContext";

const RecipeList = () => {
  const { currentUser, userStatus } = useContext(UserContext);
  const { fridge } = useContext(FridgeContext);
  const [recipeList, setRecipeList] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   fetch(`/api/find/recipe/${searchTerm}`);
  // }, []);

  const handleChange = (event) => {
    setSearchTerm({ value: event.target.value });
    console.log(searchTerm.value);
  };

  const handleSearch = () => {
    if (!searchTerm.value) {
      console.log("error");
    } else {
      fetch(`/api/find/recipe/${searchTerm.value}`)
        .then((res) => res.json())
        .then((data) => setRecipeList(data.result.results))
        .then((data) => console.log(recipeList));
    }
  };

  return recipeList ? (
    <>
      <Wrapper>
        <Main>
          <Searchbar onChange={handleChange} />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </Main>
        <RecipesWrapper>
          {recipeList.map((recipe) => {
            return (
              <RecipesList key={recipe.id} value={recipe}>
                <RecipeName key={recipe.title}>{recipe.title}</RecipeName>
                <RecipeImage key={recipe.image} src={recipe.image} />
              </RecipesList>
            );
          })}
        </RecipesWrapper>
        <Logout />
        <Background />
      </Wrapper>
    </>
  ) : (
    <Wrapper>
      <Main>
        <Searchbar onChange={handleChange} />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </Main>
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

const SearchButton = styled.button``;

const RecipesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50vw;
  margin-top: 15vh;
  background-color: #3b3d94;
  padding: 40px;
  border-radius: 15px;
`;

const RecipeImage = styled.img`
  border-radius: 15px;
  max-height: 150px;
  max-width: 150px;
`;

const RecipeName = styled.p`
  font-weight: bold;
`;

const RecipesList = styled.div`
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
`;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e08043;
`;

export default RecipeList;
