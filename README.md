# Project Nodepop API 2.0

Creating a project for the "full stack web development" from Keepcoding with "Node.js" in the advanced module.

# Base

For running this API is necesary:

Installing MongoDB

- For mor information, look on the website --> https://www.mongodb.com/

Download the API from the github repository:

- git clone https://github.com/Josu-Rubio/Project-NodeJS

# From the main folder on the CMD

Installing the modules:

- npm install

Run the database:

- node install_db.js

To run the API from the production enviroment:

- npm start

To run the API from the development enviroment:

- npm run dev
  It runs on the port 3000

On this moment, the API is fully installed and the data from the database can ve observed on localhost:3000

# API use

The update of this API requires a `.env` file with some personal information. We have created an `.env.example`on the repository whose name will have to be changed to `.env` and its information compelled as explained on it.

This API incorporate users with a JWT login. On the DB we have incorporate a default user.

This API incorporate on its website a session login with the same user as commented before.

This API have the following features:

- Allow language selection on the menu of the Website wich affects all the pages on it.

- Create a list on products/advertisements through: `**`

  1. Filter by name
  2. Filter by "status" ("on sell", "Wanted")
  3. Filter on a price range
  4. Filter by tag

- Create, update and delete products. `**`

## Product list

It is necessary to add the JWT token that can be received through the method "POST" with the software "postman" or similar.

This method should be implemented adding to the URL:
`/api/loginJWT`

After getting the token, it could be use as an "Authorization" value on the headers of the URL http://localhost:3000/api/products or adding that token at the end of the URL + `?token=` .

To filter with products it is necessary to follow these steps:

The filter is always made by adding to the URL `/product?` and the filter
Lets see some examples:

1. By name

URL/api/products?name=`begining_of_the_name`

We add the name we are looking for or the begining to find the products.

2. By status

URL/api/products?sell=`boolean`

We add the boolean true (On sell) or false (Wanted)

3. By price range

URL/api/products?price=`price or price-range`

On the price we have 3 diferent choices:

- Add the number (50) --> It will return just the products with that price
- Add the range (30-90) --> It will return the products on that product range
- Add the maximum price (-120) --> It will return the products until that maximun price
- Add the minimum price (50-) --> It will return the products from that minimun price

`**` Fixed

4. By tag

URL/api/products?tag=`tag`

We only have to add the selected tag.

There are only 4 available tags, as the API has been designed like that.

- lifestyle
- work
- motor
- mobile
  Those are the tags we will be able to work with.

The filters can be combined by adding "&" between them.
That way, a valid request could be:

http://localhost:3000/api/products?name=phone&sell=true

## Create, update and delete a product

This API can work the creation and delete of the products on the database.
For this is necessary to use a software like "postman".
The request for each of them are:

- Creation
  Request POST to the URL http://localhost:3000/api/products

  `**` In this version of NODEAPI it is possible to create a product through the method POST wich will resize any photo you will upload to the size `100x100` px.

  This is thanks to the microservices implemented on this version of the API through `Cote` and `Jimp`.

- Update
  Request PUT to the URL http://localhost:3000/api/products/:id

- Delete
  Request Delete to the URL http://localhost:3000/api/products/:id

For the testing of these features, it is necessary to know the structure of each product: - name: String - sell: Boolean - price: Number - photo: String - tags: [String]

Any bug that could be found on the API, please do not hesitate to comunicate it through GitHub.
Thanks for showing interest on this API.

Regards
