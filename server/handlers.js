const { v4: uuidv4 } = require("uuid");
const { json } = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

require("dotenv").config();

const { MONGO_URI } = process.env;

// const options = {
//   useNewUrlParser = true,
//   useUnifiedTopology = true,
// }

const dbName = "foodie_friend";

//Here we write our handlers for various requests to the API and to MongoDB

const checkUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log("connecting to database...");

    const db = client.db(dbName);

    const result = await db
      .collection("users")
      .findOne({ email: req.body.email });

    result
      ? res.status(200).json({ status: 200, email: result.email })
      : res.status(500).json({
          status: 500,
          error: "there was an issue finding the requested user",
        });

    await client.close();
    console.log("disconnecting from database...");
  } catch (err) {
    console.log(err.stack);
  }
};

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
    console.log(err.stack);
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
    console.log(err.stack);
  }
};

// const createUser = (user, callback) => {
//   const bcrypt = require("bcrypt");
//   // const MongoClient = require("mongodb@3.1.4").MongoClient;
//   const client = new MongoClient(MONGO_URI, options)
//   console.log(MONGO_URI)

//   client.connect( (err) => {
//     console.log("connecting...")
//     if (err) return callback(err);

//     const db = client.db(dbName);
//     const users = db.collection("users");

//     users.findOne({ email: user.email }, function (err, withSameMail) {
//       if (err || withSameMail) {
//         client.close();
//         return callback(err || new Error("the user already exists"));
//       }

//       bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//           client.close();
//           return callback(err);
//         }

//         user.password = hash;
//         users.insert(user, function (err, inserted) {
//           client.close();

//           if (err) return callback(err);
//           callback(null);
//         });
//       });
//     });
//   });
// };

module.exports = {
  checkUser,
  createUser,
  getUser,
};
