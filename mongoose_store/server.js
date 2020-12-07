// =======================================
//              DEPENDENCIES
// =======================================
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;
const MONGO_STRING = process.env.MONGO_STRING;

const Books = require("./models/bookData.js");

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

// const bookSchema = new mongoose.Schema({
//   // the structure / rules that we want to impose on the data
//   name: { type: String, required: true },
//   author: { type: String, required: true },
//   genre: { type: String, required: true, default: "No info available" },
//   img: { type: String, required: true, default: "***INSERT IMAGE URL***" },
//   synopsis: {
//     type: String,
//     required: true,
//     default: "***INSERT DUMMY SYNOPSIS TEXT***",
//   },
//   price: {
//     type: Number,
//     required: true,
//     default: 0.99,
//   } /* *** NEED TO UPDATE DEFAULT VALUES  */,
//   quantity: { type: Number, required: true, default: 1 },
// });

/*

Potential additional data keys:
• ISBN: (def. ==> "No info available")
• FORMAT: (def. ==> "Paperback")
• Publisher: (def. ==> "No info available")
• Edition: (def. ==> "No info available")

*/

// const Books = mongoose.model("Book", bookSchema); // mongoose.model is what connects us to our MongoDB Collection (here, called Bounties)

// Books.create(
//   {
//     name: "The Old Man and the Sea",
//     author: "Hemingway, Ernest",
//     genre: "General Fiction",
//     img: "https://i.imgur.com/cgJfAqw.jpg",
//     synopsis:
//       "The Old Man and the Sea is one of Hemingway's most enduring works. Told in language of great simplicity and power, it is the story of an old Cuban fisherman, down on his luck, and his supreme ordeal -- a relentless, agonizing battle with a giant marlin far out in the Gulf Stream.",
//     price: 10.0,
//     quantity: 2,
//   },
//   {
//     name: "Letters to a Young Poet",
//     author: "Rilke, Rainer Maria",
//     genre: "Letters",
//     img: "https://i.imgur.com/kFtLKk7.jpg",
//     synopsis:
//       "Written during an important stage in Rilke's artistic development, these letters contain many of the themes that later appeared in his best works. Essential reading for scholars and poetry lovers.",
//     price: 12.0,
//     quantity: 1,
//   },
//   {
//     name: "Slaughterhouse-five",
//     author: "Vonnegut, Kurt",
//     genre: "General Fiction",
//     img: "https://i.imgur.com/vvhOdKN.jpg",
//     synopsis:
//       "Billy Pilgrim survives capture by the Gemans in World War II, the Dresden bombings, and the struggle for financial success only to be kidnapped in a flying saucer and taken to the planet Tralfamadore",
//     price: 8.0,
//     quantity: 6,
//   },
//   {
//     name: "The Brief Wondrous Life of Oscar Wao",
//     author: "Diaz, Junot",
//     genre: "General Fiction",
//     img: "https://i.imgur.com/QifjKKD.jpg",
//     synopsis:
//       "Winner of both the National Book Critics Circle Award and the Pulitzer Prize for Fiction, the most talked about--and praised--smash hit of 2007 follows the adventures of a sweet but disastrously overweight ghetto nerd plagued by a family curse.",
//     price: 14.0,
//     quantity: 3,
//   },
//   {
//     name: "The Catcher in the Rye",
//     author: "Salinger, J.D.",
//     genre: "General Fiction",
//     img: "https://i.imgur.com/nvIst5B.jpg",
//     synopsis:
//       "In an effort to escape the hypocrisies of life at his boarding school, sixteen-year-old Holden Caulfield seeks refuge in New York City",
//     price: 6.0,
//     quantity: 5,
//   },
//   {
//     name: "Mountains Beyond Mountains",
//     author: "Kidder, Tracy",
//     genre: "Medical",
//     img: "https://i.imgur.com/twQRCue.jpg",
//     synopsis:
//       "A thought-provoking portrait of world-renowned infectious disease expert Dr. Paul Farmer follows the efforts of this unconventional Harvard genius to understand the world's great health, economic, and social problems and to bring healing to humankind.",
//     price: 12.0,
//     quantity: 3,
//   },
//   {
//     name: "But What If We're Wrong",
//     author: "Klosterman, Chuck",
//     genre: "Essays",
//     img: "https://i.imgur.com/KxIegxI.jpg",
//     synopsis:
//       "The best-selling author of Sex, Drugs, and Cocoa Puffs explores the idea that today's mainstream beliefs about the world are fundamentally incorrect, drawing on original interviews with forefront intellectuals and experts to consider how the music, sports, literature and other present-day conventions may be perceived in future centuries.",
//     price: 10.0,
//     quantity: 4,
//   },
//   {
//     name: "Sex, Drugs, and Cocoa Puffs",
//     author: "Klosterman, Chuck",
//     genre: "General Fiction",
//     img: "https://i.imgur.com/GlDqzfz.jpg",
//     synopsis:
//       "The author of Fargo Rock City explores a range of modern cultural phenomena, including Internet pornography, tribute bands, baseball rivalries, and reality television, as he explores the role of the media in American life.",
//     price: 8.0,
//     quantity: 8,
//   }
// );

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
app.get("/books", (req, res) => {
  Books.find({}, (err, allBooks) => {
    if (err) {
      res.send(err);
    } else {
      res.render("Index", {
        books: allBooks,

        // *** ANY OTHER INFO WE NEED TO PASS AS PROPS?
      });
    }
  });
});
// *** COME BACK AND CREATE A 404 that we pass as our ERR

// NEW | GET Request | Presentational Route | ==> Return an HTML form for creating a new order
app.get("/books/new", (req, res) => {
  res.render("New");
});

// DESTROY | DELETE Request | Functional Route | ==> Delete a specific order
// "/<nameOfResource>/:id"

// UPDATE | PUT Request | Functional Route | ==> Update a specific order
// "/<nameOfResource>/:id"

// CREATE | POST Request | Functional Route | ==> Create a new order
app.post("/books", (req, res) => {
  Books.create(req.body, (err, createdBook) => {
    err ? res.send(err) : res.redirect("/books");

    // *** COME BACK AND CREATE A 404 that we pass as our ERR

    console.log(createdBook);
  });
});

// EDIT | GET Request | Presentational Route | ==> Return an HTML form for editing an order
// "/<nameOfResource>/:id/edit"

// SHOW | GET Request | Presentational Route | ==> Display a specific order
// "/<nameOfResource>/:id"
app.get("/books/:id", (req, res) => {
  Books.findById(req.params.id, (err, foundBook) => {
    if (err) {
      res.send(err);
    } else {
      res.render("Show", {
        book: foundBook,
      });
    }
  });
});

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => {
  console.log(`Dude, let's surf the interwebs | Listening on port: ${PORT}`);
});
