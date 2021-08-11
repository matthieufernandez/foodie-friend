import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import { FridgeContext } from "./FridgeContext";

const Recipe = () => {
  const { currentUser, userStatus } = useContext(UserContext);
  const { fridge } = useContext(FridgeContext);
  const [recipe, setRecipe] = useState("");
  const [recipeStatus, setRecipeStatus] = useState(false);
  let id = useParams().id;

  useEffect(() => {
    fetch(`/api/find/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.result);
        setRecipeStatus("idle");
      });
  }, []);

  let htmlMarkup = { __html: `${recipe?.summary}` };

  let htmlMarkupInstructions = { __html: `${recipe?.instructions}` };

  console.log(recipe);

  const addHandler = () => {
    fetch(`/api/recipe/add/${currentUser?.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    })
      .then((res) => {
        res.json();
      })
      .then((res) => {
        if (res?.message == "duplicate") {
          console.log("duplicate");
        } else {
          console.log("test");
        }
      });
  };

  return recipeStatus ? (
    <>
      <Wrapper>
        <AllRecipeArea>
          <RecipeArea>
            <RecipeName>{recipe?.title}</RecipeName>
            <RecipeImage alt="a delicious picture" src={recipe?.image} />
          </RecipeArea>
          <TitleWrap>
            <h1>Summary:</h1>
            <RecipeInfo dangerouslySetInnerHTML={htmlMarkup}></RecipeInfo>
          </TitleWrap>
          <TitleWrap>
            <h1>Steps:</h1>
            <RecipeInstructions
              dangerouslySetInnerHTML={htmlMarkupInstructions}
            ></RecipeInstructions>
            <AddButton onClick={addHandler}>
              Click here to add this recipe to your recipe book
            </AddButton>
          </TitleWrap>
        </AllRecipeArea>
      </Wrapper>
      <Background />
    </>
  ) : (
    <>
      <Wrapper>
        <p>loading...</p>
      </Wrapper>
      <Background />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100vw;
  background-color: #e08043;
`;

const RecipeImage = styled.img`
  transition: all 9s;
  border-radius: 25px;
  box-shadow: 10px 10px 26px 0px rgba(0, 0, 0, 0.75);
  border-radius: 30px;

  &:hover {
    border: solid 5px #ed4c3b;
  }
`;

const RecipeName = styled.h1`
  color: black;
`;

const AllRecipeArea = styled.div`
  max-width: 70vw;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const RecipeArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 50vw;
  margin-bottom: 3vh;
`;

const RecipeInstructions = styled.h3`
  color: black;
  margin-top: -3vh;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeInfo = styled.div`
  max-width: 50vw;
  color: black;
`;

const AddButton = styled.button`
  text-decoration: none;
  align-self: center;
  max-width: 10vw;
  max-height: auto;
  background-color: #1167e0;
  padding: 10px;
  border-radius: 15px;
  border: none;

  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    background-color: #0be021;
  }
`;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #e08043;
`;

export default Recipe;
