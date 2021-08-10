import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import { UserContext } from "./UserContext";
import { FridgeContext } from "./FridgeContext";

const Recipe = () => {
  const { currentUser, userStatus } = useContext(UserContext);
  const { fridge } = useContext(FridgeContext);
  const [recipeList, setRecipeList] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  console.log("hello test");

  return <div>Hello</div>;
};

export default Recipe;
