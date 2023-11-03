# Retail_Backend
## Intro
This robust backend application empowers E-Commerce businesses to seamlessly manage their database operations. Developed with MySQL2 and Sequelize, it serves as the backbone for integrating with any frontend web solution, thus streamlining the overall digital commerce experience.

## Table of Contents
Description
Features
Installation
Usage
License
Contact Information
Description
Designed specifically for E-Commerce platforms, this system facilitates the connection to a MySQL database and allows for comprehensive viewing and manipulation of various data aspects. It dynamically synchronizes all transactions with the server's database and provides user-friendly routing to create, retrieve, update, and delete records, even when dealing with complex relational associations.

## Features
Connects to and manages an E-Commerce database
Dynamically stores data on the server
Simplifies data operations with CRUD functionalities across associated models
## Installation
To set up this backend system, please ensure Node.js is installed on your computer. Follow these steps:

Clone the repository to your local machine.
Ensure the presence of mysql2, express.js, console.table, and inquirer by executing npm install.
Launch your MySQL command-line tool and log in with the command mysql -u root -p. When prompted, enter the password C00l_2009$.
Initialize the database by sourcing the schema file:
sh
Copy code
source C:\Users\kyleespera\Bootcamp\Retail_Backend\Develop\db\schema.sql
Exit MySQL and populate the database with seed data using:
sh
Copy code
npm run seed
Start the application with:
sh
Copy code
npm start
## Usage
To interact with the database, utilize API testing tools such as Insomnia. Perform GET, POST, PUT, and DELETE requests to the following endpoints:

http://localhost:3001/api/products
http://localhost:3001/api/categories
http://localhost:3001/api/tags
Note: All operations are performed in real-time and will directly impact the database, so proceed with caution and precision (I did have some errors trying to access certain lines so I'm not sure if the post, delete, and put options work well).


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact Information
Should you have any questions or suggestions, please contact me via:

GitHub: https://github.com/kyleespera
Email: espera.kyle@yahoo.com