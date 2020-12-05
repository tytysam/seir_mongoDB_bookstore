// =======================================
//              DEPENDENCIES
// =======================================
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;
const MONGO_STRING = process.env.MONGO_STRING;

// const Asdf = require("./models/asdfasdf")

// =======================================
//               MIDDLEWARE
// =======================================
// * note: before *any* route runs, your middleware should run

app.use(express.urlencoded({ extended: true })); // THIS is what gives us acces to req.body
app.use(express.static("public"));
// app.use(methodOverride("_method"));

// =======================================
//               VIEW ENGINE
// =======================================

app.set("view engine", "jsx"); // use .set method to create a key/value pair...  our Key = "View Engine" and our Value = "JSX"
app.engine("jsx", require("express-react-views").createEngine()); // Creates our engine...

// =======================================
//                DATABASE
// =======================================

mongoose.connect(MONGO_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Bingo, Bongo | Connected to Mongo");
});

// =======================================
//                  ROUTES
// =======================================

app.get("/", (req, res) => {
  res.send("heluh wurl");
});

// =============================================
//
//              * RESTFUL ROUTES *
//       "Representational State Transfer"
//
// =============================================

/*                      THE BIG 5 REQUESTS
• GET ==> the user asks for information from a server
• POST ==> sending data to a server
• PUT ==> sending data to a server with the intention of changing (but really more like replacing) something that already exists
• DELETE ==> request to remove data from a server
• PATCH ==> you want to make a small change (misspelling, inventory #, or similar) to something that already exists (as opposed to PUT, that technically replaces the object)
*/

/*                        I.N.D.U.C.E.S.
    INDEX  |  NEW  |  DESTROY  |  UPDATE  | CREATE |  EDIT  |  SHOW  |
*/

// INDEX | GET Request | Presentational Route | ==> Display a list of all orders
// "/<nameOfResource>"

// NEW | GET Request | Presentational Route | ==> Return an HTML form for creating a new order
// "/<nameOfResource>/new"

// DESTROY | DELETE Request | Functional Route | ==> Delete a specific order
// "/<nameOfResource>/:id"

// UPDATE | PUT Request | Functional Route | ==> Update a specific order
// "/<nameOfResource>/:id"

// CREATE | POST Request | Functional Route | ==> Create a new order
// "/<nameOfResource>/"

// EDIT | GET Request | Presentational Route | ==> Return an HTML form for editing an order
// "/<nameOfResource>/:id/edit"

// SHOW | GET Request | Presentational Route | ==> Display a specific order
// "/<nameOfResource>/:id"

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
  console.log(`Dude, let's surf the interwebs | Listening on port: ${PORT}`);
});
