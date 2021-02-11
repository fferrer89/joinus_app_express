const mysql = require('mysql');
const bodyParser = require("body-parser");
const express = require('express');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yournewpassword',
    database: 'joinus_db'
});

app.get("/", function (req, res) {
    // Find count of users in DB
    let q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function (err, results) {
        if (err) throw err;
        let count = results[0].count; // isolate the count from the results
        res.render("home", {count: count});
    });
});

app.post("/register", function (req, res) {
    let person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function (err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

app.listen(8080, function () {
    console.log("Server running on 8080!");
});