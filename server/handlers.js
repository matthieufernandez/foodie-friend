const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

require("dotenv").config();

const { MONGO_URI } = process.env;

const { API_KEY } = process.env;

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
        : res.status(501).json({ status: 501, message: "there was an issue" });
      await client.close();
      console.log("disconnecting from database...");
    } else {
      res.status(501).json({ status: 501, message: "duplicate" });
      await client.close();
      console.log("disconnecting from database (dupe)");
    }
  } catch (err) {
    console.log(err);
  }
};

const getFridge = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  let userEmail = req.params.checkEmail;
  try {
    await client.connect();
    console.log("connecting to database");

    const db = client.db(dbName);

    const result = await db.collection("users").findOne({
      email: userEmail,
    });
    result
      ? res.status(200).json({ result: result.fridge })
      : res.status(501).json({ message: "error" });

    await client.close();
    console.log("disconnecting from database");
  } catch (err) {
    console.log(err);
  }
};

const getRecipe = async (req, res) => {
  let keyWord = req.params.keyWord;
  try {
    await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${keyWord}&apiKey=${API_KEY}`
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

const getRecipeInfo = async (req, res) => {
  let id = req.params.id;
  try {
    await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
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

const updateRecipe = async (req, res) => {
  let userEmail = req.params.checkEmail;

  try {
    const client = new MongoClient(MONGO_URI);

    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const check = await db
      .collection("users")
      .findOne({ email: userEmail, recipeBook: req.body });

    if (!check) {
      const result = await db.collection("users").findOneAndUpdate(
        {
          email: userEmail,
          recipeBook: { $ne: req.body }, // failsafe to avoid duplicates
        },
        { $push: { recipeBook: req.body } }
      );

      console.log(check);

      result
        ? res.status(200).json({ status: 200, message: "success" })
        : res.status(501).json({ status: 501, message: "there was an issue" });
      await client.close();
      console.log("disconnecting from database...");
    } else {
      res.status(501).json({ status: 501, message: "duplicate" });
      await client.close();
      console.log("disconnecting from database (dupe)");
    }
  } catch (err) {
    console.log(err.stack);
  }
};

const getRecipeList = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  let userEmail = req.params.checkEmail;

  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const result = await db.collection("users").findOne({ email: userEmail });

    result
      ? res.status(200).json({ status: 200, result: result.recipeBook })
      : res.status(401).json({ status: 401, message: "there was an error" });

    await client.close();
    console.log("disconnecting from database...");
  } catch (err) {
    console.log(err);
  }
};

const getRecipeFridge = async (req, res) => {
  let query = req.params.ingredients;

  try {
    await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        res.status(200).json({ status: 200, result: data });
      });
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: 401, error: err });
  }
};

const deleteIngredient = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  const { query, ingredient } = req.body;

  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const result = await db.collection("users").findOneAndUpdate(
      {
        email: query,
      },
      { $pull: { fridge: { name: ingredient } } }
    );

    result
      ? res.status(200).json({ status: 200, message: ingredient + " deleted" })
      : res.status(400).json({ status: 400, message: "there was an error" });

    await client.close();
    console.log("disconnecting from database...");

    // result should use params to delete the ingredient from the user's account
  } catch (err) {
    console.log(err.stack);
  }
};

const deleteRecipe = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { query, recipe } = req.body;

  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const result = await db.collection("users").findOneAndUpdate(
      {
        email: query,
      },
      { $pull: { recipeBook: { title: recipe } } }
    );

    result
      ? res.status(200).json({ status: 200, message: recipe + " deleted" })
      : res.status(400).json({ status: 400, message: "there was an error" });

    await client.close();
    console.log("disconnecting from database...");
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {
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
  deleteRecipe,
};
