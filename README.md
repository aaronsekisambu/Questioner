# Questioner


  Crowd-source questions for a meetup. Questioner helps the meetup organizer prioritize
questions to be answered. Other users can vote on asked questions and they bubble to the top
or bottom of the log.
## Testing 
[![Coverage Status](https://coveralls.io/repos/github/aaronsekisambu/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/aaronsekisambu/Questioner?branch=develop)
[![Build Status](https://travis-ci.com/aaronsekisambu/Questioner.svg?branch=develop)](https://travis-ci.com/aaronsekisambu/Questioner)
### Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need set the following in your as your dependecies

```
- Node 11+
- jest
- mocha
- chai
- express
- joi
- nodemon
- eslint
```

## Set up
### Clone the repo
```
git clone [https://github.com/aaronsekisambu/Questioner]
```

### Run

```
- run command cd in the root directory 
- run npm install 
```
### Install
```
$ brew update
$ npm update
now install npm and bower packages
```
```
$ npm install
$ bower install
```
## Run Tests

``` 
npm test
```
## Start Server
``` 
npm nodemon server
```

### Unit Testing

The tests are testing all the 3 Endpoints

```
1. Users Endpoints
2. Meet ups End points
3. Questions Endpoints
```

### coding style
`eslint and Airbnb`
```
{
    "env": {
        "browser": true,
        "commonjs": true,
        "mocha": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
```

## Deployment

`When deploying the app, ignore the following`
```
.idea/
.nyc_output/
coverage/
npm-debug.log
.DS_Store
/*.env
node_modules/
```

## Built With
* [Node](https://nodejs.org/en//) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Express](http://www.dropwizard.io/1.0.2/docs/) - Web Applications. Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [babel](https://babeljs.io/) - Babel is a JavaScript compiler. Use next generation JavaScript, today. Babel 7 is out! Please read our announcement and upgrade guide for more information.
* [eslint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.

## Contributing

Andela Learning facilators
```
Tawakalt Olaniyi
Philip Newman
Innocent Asiimwe
John Mengere
Angela Lehru
Chidinma Orajiaku
Arthur Thungu
Mercy Muchai
```
## Versioning

We use [url-versioning](https://www.baeldung.com/rest-versioning) where you append a version number in the URL, see the [tags on this repository](https://github.com/aaronsekisambu/Questioner). 

## Authors

* **Aaron Sekisambu** - *Initial work* - [Andela](https://andela.com/)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Andela
* Mosh






