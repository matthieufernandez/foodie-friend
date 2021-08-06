const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

require("dotenv").config();

const { MONGO_URI } = process.env;

const { API_KEY } = process.env;

// const options = {
//   useNewUrlParser = true,
//   useUnifiedTopology = true,
// }

const dbName = "foodie_friend";

//Here we write our handlers for various requests to the API and to MongoDB

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const check = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (check) {
      res.status(501).json({ status: 501, message: "user already exists" });
    } else {
      const result = await db.collection("users").insertOne(req.body);

      result
        ? res.status(200).json({ status: 200, result })
        : res.status(500).json({
            status: 500,
            error: "there was an error creating the account",
          });

      await client.close();
      console.log("disconnecting from database...");
    }
  } catch (err) {
    res.status(401).json({ status: 401, error: err });
  }
};

const getUser = async (req, res) => {
  let userEmail = req.params.checkEmail;
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    console.log(userEmail);
    const result = await db.collection("users").findOne({ email: userEmail });

    result
      ? res.status(200).json({ status: 200, result })
      : res.status(500).json({
          status: 500,
          message: "there was an error fetching the user",
        });
  } catch (err) {
    res.status(401).json({ status: 401, error: err });
  }
};

const getIngredient = async (req, res) => {
  let searchIngredient = req.params.ingredient;
  try {
    await fetch(
      `https://api.spoonacular.com/food/ingredients/search?query=${searchIngredient}&apiKey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        res.status(200).json({ status: 200, result: data });
      });
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: 401, error: err });
  }
};

const updateFridge = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  let userEmail = req.params.checkEmail;
  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const check = await db
      .collection("users")
      .findOne({ email: userEmail, fridge: req.body });

    if (!check) {
      const result = await db.collection("users").findOneAndUpdate(
        {
          email: userEmail,
          fridge: { $ne: req.body }, // failsafe to avoid duplicates
        },
        { $push: { fridge: req.body } }
      );

      result
        ? res.status(200).json({ status: 200, message: "success" })
        : res.status(501).json({ status: 501, error: "there was an issue" });

      await client.close();
      console.log("disconnecting from database...");
    } else {
      res.status(501).json({ status: 501, error: "duplicate" });
      await client.close();
      console.log("disconnecting from database (dupe)");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  getUser,
  getIngredient,
  updateFridge,
};
