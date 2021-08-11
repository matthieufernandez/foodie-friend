import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Recipe from "./Recipe";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { UserContext } from "./UserContext";
import { FridgeContext } from "./FridgeContext";

const RecipeList = () => {
  const { currentUser, userStatus } = useContext(UserContext);
  const { fridge } = useContext(FridgeContext);
  const [recipeList, setRecipeList] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeClick, setRecipeClick] = useState(false);
  const [myRecipes, setMyRecipes] = useState([]);

  const handleChange = (event) => {
    setSearchTerm({ value: event.target.value });
    console.log(searchTerm.value);
  };

  const handleSearch = () => {
    if (!searchTerm.value) {
      console.log("error");
    } else {
      fetch(`/api/find/recipe/search/${searchTerm.value}`)
        .then((res) => res.json())
        .then((data) => setRecipeList(data.result.results));
    }
  };

  const handleMyRecipes = () => {
    fetch(`/user/find/recipeList/${currentUser?.email}`)
      .then((res) => res.json())
      .then((data) => setMyRecipes(data?.result))
      .then(() => setRecipeClick(true));
  };

  console.log(recipeList);
  console.log(myRecipes);

  const onKeyPress = (e) => {
    if (e.which === 13) {
      handleSearch();
    }
  };

  return recipeList ? (
    <>
      <Wrapper>
        <Main>
          <Searchbar onChange={handleChange} onKeyPress={onKeyPress} />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </Main>
        <RecipesWrapper>
          {recipeList.map((recipe) => {
            return (
              <Link key={recipe.id} to={`./recipe/${recipe.id}`}>
                <RecipesList key={recipe.id} value={recipe}>
                  <RecipeName key={recipe.title}>{recipe.title}</RecipeName>
                  <RecipeImage key={recipe.image} src={recipe.image} />
                </RecipesList>
              </Link>
            );
          })}
        </RecipesWrapper>
        <MyRecipesArea>
          {!recipeClick && (
            <ShowMyRecipes onClick={handleMyRecipes}>
              Click to show your recipes
            </ShowMyRecipes>
          )}

          {myRecipes && (
            <>
              {myRecipes.map((recipe) => {
                return (
                  <Link key={recipe.id} to={`./recipe/${recipe.id}`}>
                    <RecipesList key={recipe.id} value={recipe}>
                      <RecipeName key={recipe.title}>{recipe.title}</RecipeName>
                      <RecipeImage key={recipe.image} src={recipe.image} />
                    </RecipesList>
                  </Link>
                );
              })}
            </>
          )}
        </MyRecipesArea>
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
      <MyRecipesArea>
        {!recipeClick && (
          <ShowMyRecipes onClick={handleMyRecipes}>
            Click to show your recipes
          </ShowMyRecipes>
        )}

        {myRecipes && (
          <>
            {myRecipes.map((recipe) => {
              return (
                <Link key={recipe.id} to={`./recipe/${recipe.id}`}>
                  <RecipesList key={recipe.id} value={recipe}>
                    <RecipeName key={recipe.title}>{recipe.title}</RecipeName>
                    <RecipeImage key={recipe.image} src={recipe.image} />
                  </RecipesList>
                </Link>
              );
            })}
          </>
        )}
      </MyRecipesArea>
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

const Searchbar = styled.input`
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
  text-decoration: none important!;
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

const MyRecipesArea = styled.div`
  display: flex;
`;

const ShowMyRecipes = styled.button``;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e08043;
`;

export default RecipeList;
