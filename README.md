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
* [API link](http://business-search-api-2.herokuapp.com)
* [UI link](https://business-search-ui.herokuapp.com)

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
POST Request -> localhost:8000/api/v1/businesses/groups
input:
  address: West Adams, Los Angeles


response:
"businessGroups": [
        "13 businesses between 1 and 2",
        "56 businesses between 2 and 3",
        "311 businesses between 3 and 4",
        "193 businesses between 4 and 5",
        "4 businesses between 0 and 1"
    ]

POST Request -> localhost:800/api/v1/businesses/top
input:
  address: West Adams, Los Angeles

response:
{
    "topCoffeeShops": {
        "0": {
            "name": "Paradocs Coffee and Tea 2.7km",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/NsXEjHV9809xsXB09SLKXQ/o.jpg",
            "rating": 4.5,
            "categories": [
                {
                    "alias": "coffee",
                    "title": "Coffee & Tea"
                },
                {
                    "alias": "sandwiches",
                    "title": "Sandwiches"
                },
                {
                    "alias": "bakeries",
                    "title": "Bakeries"
                }
            ]
        },
        "1": {
            "name": "Undergrind Cafe 2.5km",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/ErnEM1lDU_HjvtNyRY6upQ/o.jpg",
            "rating": 4.5,
            "categories": [
                {
                    "alias": "cafes",
                    "title": "Cafes"
                },
                {
                    "alias": "coffee",
                    "title": "Coffee & Tea"
                },
                {
                    "alias": "breakfast_brunch",
                    "title": "Breakfast & Brunch"
                }
            ]
        },
        "2": {
            "name": "Milk Jar Cookies 3.6km",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/oOkmMG_gbaylvRElP2lqhw/o.jpg",
            "rating": 4.5,
            "categories": [
                {
                    "alias": "desserts",
                    "title": "Desserts"
                },
                {
                    "alias": "bakeries",
                    "title": "Bakeries"
                },
                {
                    "alias": "coffee",
                    "title": "Coffee & Tea"
                }
            ]
        }
    },
    "topResturants": {
        "0": {
            "name": "Three Borders Brunch & Grill 3.2km",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/0JmPhq1DYOIt0p8K6X-mlA/o.jpg",
            "rating": 5,
            "categories": [
                {
                    "alias": "breakfast_brunch",
                    "title": "Breakfast & Brunch"
                },
                {
                    "alias": "newamerican",
                    "title": "American (New)"
                },
                {
                    "alias": "mexican",
                    "title": "Mexican"
                }
            ]
        },
        "1": {
            "name": "My Two Cents 2.0km !",
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/7rJ6HhAcdZlwvfSXfJzlIw/o.jpg",
            "rating": 4.5,
            "categories": [
                {
                    "alias": "southern",
                    "title": "Southern"
                },
                {
                    "alias": "seafood",
                    "title": "Seafood"
                },
                {
                    "alias": "soulfood",
                    "title": "Soul Food"
                }
            ]
        },
        "2": {
            "name": "Bronzed Aussie 3.1km",
            "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/BH44qALoRO6x2h_Jxg0uqA/o.jpg",
            "rating": 4.5,
            "categories": [
                {
                    "alias": "catering",
                    "title": "Caterers"
                },
                {
                    "alias": "desserts",
                    "title": "Desserts"
                }
            ]
        }
    }
}

```
## Recommended improvements
* The top three businesses can be made to dynamically let users input the business category and the distance they want to search 
* The users can also be allowed to search for combination of two categories like `Bar and Guesthouse`
* Another endpoint can be created for retrieving a specific business

## Author

Chidimma Juliet Ezekwe

## License

ISC

---
