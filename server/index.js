const express = require("express");
const pg = require("pg");
const app = express();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const port = 3000;

const pool = new pg.Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "contactapp"
});

app.use(express.json({
    limit: "500MB"
}));

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile((path.join(__dirname, "../public/index.html")));
});
app.get("/login", (req, res) => {
    res.sendFile((path.join(__dirname, "../public/index.html")));
});
app.get("/register", (req, res) => {
    res.sendFile((path.join(__dirname, "../public/index.html")));
});
app.get("/user", (req, res) => {
    res.sendFile((path.join(__dirname, "../public/index.html")));
});

app.get("/users", async (req, res) => {
    try {
       const allUsers = await pool.query("SELECT * FROM users");
       res.json(allUsers.rows)
    } catch (err) {
        console.error(err.message);
    }
});

//get a user
app.get("/users/:user_id", async (req, res) => {
    try {
        const { user_id  } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//post a user
app.post("/users", async (req, res) => {
    try {
       const {user_id, firstname, lastname, emailaddress, user_password} = req.body;
       const newUser = await pool.query("INSERT INTO users (user_id, firstname, lastname, emailaddress, user_password) VALUES($1, $2, $3, $4, $5) RETURNING *", [user_id, firstname, lastname, emailaddress, user_password])
       res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

app.listen(port, () => {
    console.log(`server has started on port ${port}`)
});