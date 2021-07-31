const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 4000;

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(bodyParser.json())

  // Here we write our endpoints for the various server requests to the API. Each uses a handler from handlers.js
  .get("/api/fridge/add", addIngredients)

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
