const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

express()
  .use(morgan("tiny"))
  .use(express.json())

  .listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  });
