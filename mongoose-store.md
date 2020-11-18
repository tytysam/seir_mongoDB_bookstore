[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly)

# Mongoose Store

Make a product inventory manager with full CRUD using Mongoose.

#### Learning Objectives

- Full CRUD app in Express with Mongoose

#### Prerequisites

- JavaScript 
- Express / Node 
- MongoDB Atlas / Mongoose 

---

## Expected Functionality (MVP)

### Index Page 

1. Your app should have an index page where
	- all the products are displayed
	- the images link to the product's show page
	- and there should be a link to add a new product.

<details><summary><strong>Example</strong></summary>
<img src="https://i.imgur.com/CRJd6Hg.png">
</details>

### Show Page 

1. Your show page should display a product with
	- a link back to the products
	- and the number of items remaining in stock.
	
2. There should be a BUY button. The BUY button will reduce the number of items in stock by 1 each time it's pressed.

<details><summary><strong>Example</strong></summary>
<img src="https://i.imgur.com/sp9DGtd.png">
</details>

3. If the quantity of your item is zero, the show page should say 'OUT OF STOCK' instead of saying how many are remaining. (Hint: conditionals in JSX).


4. The BUY button should also **not** be rendered if the quantity of the item is zero.

<details><summary><strong>Example</strong></summary>
<img src="https://i.imgur.com/5FZKyly.png">
</details>

### New Page

1. This view should render forms and submit to the appropriate routes. i.e /fruits/new

### Redirects 

1. The create route should redirect to the index route with a res.redirect (after it creates a new resource)

1. For the Hungry for more? the BUY button will go to a route that redirects back to the product's show page

---

## Getting Started

1. Inside the `mongoose_store` folder, set up Express App with MVC architecture with the appropriate folders for models, views, and controllers.

1. You will need the seven RESTful routes. Don't worry about what the BUY button does or where it goes just yet. Just set up your regular RESTful stuff.

1. You will need to make a Mongoose Schema in a products.js file for your products. The schema should have:

	```js
	  name: String,
	  description: String,
	  img: String,
	  price: Number,
	  qty: Number
	```
1. Set up validations for the price and qty (can't be less than zero) and make the name a required field.

1. Create a model and export it.

1. Make sure you connect to your MongoDB Atlas server in `server.js`

1. Make sure your controller can access your model:

	`const Product = require('./models/products');`

1. _NOTE:_ For testing purposes, especially for having quick access to those wacky Mongo ids, maybe think about having a route /json that res.sends an index of all the data in json format so that you can copy/paste ids into your url bar or visit your collection on MongoDB Atlas and grab them from there.

## The Buy Button 

After you have your full CRUD app working, it's time to break/extend RESTful conventions according to your own lights. The app needs a buy button. It's up to you to make your own routes to facilitate it.

As mentioned in the expected functionality, if a product is in stock (the qty is above 0), the show page should have a BUY button. If the product is out of stock, it should not have this button.

When the BUY button is pressed, it will make a request to update the qty of the product (decrease it by 1).

**Things to think about:**

- What route should the BUY request go to? Maybe it could go to its own route.
- Since it updates the product, should it go to a PUT route?
- Do you need to send any data through to the route? You will need the id, but that is likely all you'll need.
- Can you edit the qty value just in the route? product.qty -= 1?
- Will you have to product.save() if you do this?

<details><summary>The Buy button is a bit of a gotcha! Here are some hints</summary>

<br/>

**There are two different ways to update a document: PUT routes and PATCH routes. They each have their own gotcha.**

PUT routes are what you've been using in class. But to use a PUT route, you must submit data for every field in the Schema. A PUT route overrites the entire document (except the ID), so your data will get messed up if you don't submit every field. 

**If you choose to use a PUT route, you're going to want to do one of two things:**
1. Easier: Create a form with default **values** (not placeholders) for the inputs you don't want to change. Use HTML or CSS to hide these inputs from the viewer. On submit, the default values will be sent to the database along with the updated value. 

2. Harder: Create a form that only has the field you want to update, then hop over to the PUT route you're creating and update req.body to have the other necessary values before sending it over to the database. Things to consider: How will you get those other values dynamically? 

**If you choose to use a PATCH route:**
- PATCH routes are used to update part of a document without affecting the other values. This can be handy but tricky. If you choose to use a PATCH route, you'll need to do some research on how to implement it. Make sure you have the rest of MVP and make sure you've committed before starting to work on this!


</details>

## Seed Data 

You can use this seed data to get some starting data if you so choose. Or use this format to create your own!
```js
  module.exports = [
    {
      name: 'Beans',
      description: 'A small pile of beans. Buy more beans for a big pile of beans.',
      img: 'https://cdn3.bigcommerce.com/s-a6pgxdjc7w/products/1075/images/967/416130__50605.1467418920.1280.1280.jpg?c=2',
      price: 5,
      qty: 99
    }, {
      name: 'Bones',
      description: 'It\'s just a bag of bones.',
      img: 'http://bluelips.com/prod_images_large/bones1.jpg',
      price: 25,
      qty: 0
    }, {
      name: 'Bins',
      description: 'A stack of colorful bins for your beans and bones.',
      img: 'http://www.clipartbest.com/cliparts/9cz/rMM/9czrMMBcE.jpeg',
      price: 7000,
      qty: 1
    }
  ]

```

_HANDY HINT:_ 
1. Make a models/productSeed.js file that exports the seed data.
1. Import the seed data in your controller `const productSeed = require('../models/productSeed');`
1. Make a route in your products controller that goes to '/seed' (see code below) to seed your database.
1. Visit this route to seed the database.

```js
app.get('/seed', (req, res) => {
  // drop database - prevents from seeding the same data over and over. But remember, it will drop all new changes to your database!
  Product.deleteMany({}, ()=> {});
  // this is the code to actually seed the database
  Product.create(productSeed, (error, data) => {
    // you can also change the second part to res.status(200).redirect('/products') or wherever you want to go.
    error ? res.status(400).json(error) : res.status(200).json(data);
  });
})
```

## Commits 

The order in which you tackle this homework is up to you. But here are some suggested milestones for commits. Make sure you're commiting as you work, even if you do it at different times than below. 

<details><summary><strong>Milestones to Commit</strong></summary>

<hr>

**Index - Commit your work** <br>
The commit message should read: <br>
"Index working"
<hr>

<hr>

**Show - Commit your work** <br>
The commit message should read: <br>
"Show working"
<hr>

<hr>

**Create route - Commit your work** <br>
The commit message should read: <br>
"Create working"

<hr>

<hr>

**Buy - Commit your work** <br>
The commit message should read: <br>
"Buy Button Working"
<hr>

<hr>

**CSS - Commit your work** <br>
The commit message should read: <br>
"App has style"
<hr>

</details>

## Style Inspiration 

See some previous student's examples for some inspiration for your store. Great homework can make great portfolio pieces too! Feel free to use or not use a CSS Framework like Bootstrap, Materialize, Bulma, Skeleton etc. 

<details><summary><strong>Example 1</strong></summary>
<img src="https://user-images.githubusercontent.com/17508245/28861521-1d513946-7716-11e7-8bed-fe1194f73a2d.png">
</details>

<details><summary><strong>Example 2</strong></summary>
<img src="https://user-images.githubusercontent.com/29133264/28857343-c3c537e6-76fd-11e7-8104-5ea76de35113.png">
</details>

## Hungry for More? 

1. Figure out how to make a 404 route - make a splashy 404 that uses CSS animations and/or cool jQuery effects

1. Add a favicon (google what it is, if you don't know/remember)

1. DRY out your code.

## Second Model H4M:
1. Make another model, this time for a User. The User will have:
	```js
	username: String,
	shopping_cart: Array
	```
1. On the product show page, when a user presses BUY, the product will be added to the User's shopping cart.

1. View the shopping cart on the User's show page. (The User will need only a show page and none of the other routes).

---

## Deliverables

A store app that meets all the expected functionality outlined at the beginning of this markdown. 

## Technical Requirements

1. Your app MUST run without syntax errors. If there are errors you can't solve, comment them out and leave a comment above explaining what is wrong
1. Portfolio quality styling, unless you're maxing out on your 4hrs per night, in which basic styling will be accepeted. Leave a note in your submission issue if this is the case. 

## Submission Guidelines

You will be required to submit this assignment by 10 AM on Monday morning. We suggest that you try not to save it all for Sunday night. Make a little schedule for yourself. 

---

*Copyright 2018, General Assembly Space. Licensed under [CC-BY-NC-SA, 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)*
