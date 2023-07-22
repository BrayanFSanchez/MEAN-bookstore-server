## Project Name
Welcome to my MEAN project server called Bookstore-server.

## Description
This server was developed using Node.js and Express as the backend for a MEAN project (MongoDB, Express, Angular, Node.js). It provides a RESTful API to interact with the database and serve the data required by the client.

## Installation

1. Clone the repository: [https://github.com/BrayanFSanchez/MERN-web-personal-server.git](https://github.com/BrayanFSanchez/MEAN-bookstore-server.git)
2. Navigate to the server directory: cd server
3. Install the dependencies using Yarn: yarn install or npm install

## Configuration
1. Create a .env file in the root directory of the server.
2. Define the required environment variables, such as the database connection string or other project-specific configurations.

## Usage
To start the server, run the following command:

npm run dev

The server will run on http://localhost:5000/ by default.

## Project structure
The folder structure you mentioned (controllers, middlewares, models, router, uploads, utils, .env) follows an organization based on the Model-Controller pattern (MVC). In this pattern, the models represent the data and are located in the "models" folder. Controllers, located in the "controllers" folder, take care of the business logic and handle user requests. Although not explicitly mentioned, the MVC structure also includes the view, which handles the presentation of data to the user. The modularized and organized structure of the Model-Controller pattern allows for easier project development and maintenance.

## APIs and endpoints

APIs represent sets of endpoints that provide functionality and enable communication with the Node.js server. Each API focuses on a specific domain of the application, such as authentication (auth), authors (author), books (book), user (user). Each API has designated endpoints, which are the paths through which that functionality is accessed.

## Dependencies and requirements
* bcryptjs: is a library that provides password hashing functionality using the bcrypt algorithm. It helps securely store and compare passwords, essential for user authentication and data protection.

* cors: is a middleware package for Express that allows you to enable Cross-Origin Resource Sharing (CORS) in your server, permitting secure access to resources from different domains or origins.

* dotenv: is a library that loads environment variables from an .env file. It allows you to store configuration settings, secrets, or sensitive information outside your codebase, promoting a more secure and configurable application.

* express: is a fast, minimalist, and flexible web application framework for Node.js. It simplifies building server-side applications by providing various routing, middleware, and HTTP utility methods.

* jsonwebtoken: is a library that facilitates the creation and verification of JSON Web Tokens (JWT) in Node.js applications. JWTs are used for secure authentication and data exchange between parties.

* mongoose: is an Object Data Modeling (ODM) library for MongoDB and Node.js. It simplifies database interactions by providing a straightforward schema-based solution to model application data.

* morgan: is a logging middleware for Express that helps generate detailed HTTP request logs, aiding in debugging and monitoring server-side activities.
