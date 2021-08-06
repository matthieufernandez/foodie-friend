const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 4000;
const API_KEY = `bedadb9759e1420fa813aa91f7ed5409`;

const {
  createUser,
  getUser,
  getIngredient,
  updateFridge,
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

  //these are our calls to the API
  .get(`/api/fridge/search/:ingredient`, getIngredient)

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
