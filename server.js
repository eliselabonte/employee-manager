const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Import inquirer
const inquirer = require('inquirer')

// environmental variables
require('dotenv').config();
const environment = process.env;

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: environment.USER_ID,
    // TODO: Add MySQL password here
    password: environment.USER_PASSWORD,
    database: 'employees_db'
    },
    console.log(`Connected to the ${database} database.`)
);