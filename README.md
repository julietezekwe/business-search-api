# Business-search-api
This service exposes endpoints that allows a user to search for businesses within a certain proximity

## Introduction
An API the returns businesses around you.

## Table of Contents
1. <a href="#hosted-app">Link to Hosted App</a>
4. <a href="#application-features">Application Features</a>
5. <a href="#how-to-use">How To Use</a>
6. <a href="#author">Author</a>
7. <a href="#license">License</a>


## Link to Hosted App
* [API link](https://assessment-api-19.herokuapp.com/api/)

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Typscript](https://www.typescriptlang.org/)


## Application Features

*  Get three top coffee shops and resturant within 3km of the entered address
*  Get all businesses grouped according to rating within 3km of the entered address


## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/julietezekwe/business-search-api.git

# Go into the repository
$ cd business-search-api

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the sample.env file and provide the keys


# Run the app
$ npm start
```

## API endpoints
```
##USERS
POST Request -> localhost:8000/api/v1/businesses/groups
POST Request -> localhost:800/api/v1/businesses/top

```
## Recommended impprovements
* The top three businesses can be made to dynamically let users input the business category and the distance they want to search 
* The users can also be allowed to search for combination of two categories like `Bar and Guesthouse`
* Another endpoint can be created for retrieving a specific business

## Author

Chidimma Juliet Ezekwe

## License

ISC

---
