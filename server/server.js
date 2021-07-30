const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

express()
  .use(morgan("tiny"))
  .use(express.json())

  // Here we write our endpoints for the various server requests to the API. Each uses a handler from handlers.js

  .listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  });
