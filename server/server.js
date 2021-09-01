const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 4000;
const { API_KEY } = process.env;

const {
  createUser,
  getUser,
  getIngredient,
  updateFridge,
  getFridge,
  getRecipe,
  getRecipeInfo,
  updateRecipe,
  getRecipeList,
  getRecipeFridge,
  deleteIngredient,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(bodyParser.json())
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })

  // Here we write our endpoints for the various server requests to the API. Each uses a handler from handlers.js
  .post("/user/create", createUser) // this registers the user in the db
  .get("/user/find/:checkEmail", getUser)
  .put("/user/update/fridge/:checkEmail", updateFridge)
  .delete("/user/update/fridge/delete/:checkEmail", deleteIngredient)
  .get("/user/find/fridge/:checkEmail", getFridge)
  .get("/user/find/recipeList/:checkEmail", getRecipeList)

  //these are our calls to the API
  .put("/api/recipe/add/:checkEmail", updateRecipe)
  .get("/api/find/recipe/use/:ingredients", getRecipeFridge)
  .get(`/api/fridge/search/:ingredient`, getIngredient)
  .get("/api/find/recipe/:id", getRecipeInfo)
  .get("/api/find/recipe/search/:keyWord", getRecipe)

  // This is our last .get request. It handles incorrect requests and returns an error.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message:
        "Something went wrong! Our robo-chefs are working 'round the clock to fix this error!",
    });
  })

  .listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  });
