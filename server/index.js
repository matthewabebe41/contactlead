require('dotenv/config');
const express = require("express");
const pg = require("pg");
const app = express();
const cors = require("cors");
const path = require("path");

const pool = new pg.Pool({
//    connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'contactlead'
});

app.use(express.json({
    limit: "500MB"
}));

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));
// app.use('css', express.static(path.join(__dirname, "/public/css")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/contacts", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/recover-password", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"))
})
app.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/edit_user", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/groups", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/create-group", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/favorite_contacts", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/new_contact", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/contact_:contact_id", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/edit_contact_:contact_id", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/search-contacts", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});


//get all users
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

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
       const {user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password} = req.body;
       const newUser = await pool.query("INSERT INTO users (user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password])
       res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//edit a user
app.put("/users/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const {firstname, lastname, emailaddress, phonenumber, password, user_image, session_id } = req.body;
        const updateUser = await pool.query("UPDATE users SET firstname = $1, lastname = $2, emailaddress = $3, phonenumber = $4, user_password = $5, user_image = $6, session_id = $7 WHERE user_id = $8", [firstname, lastname, emailaddress, phonenumber, password, user_image, session_id, user_id]);
        res.json(updateUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a user
app.delete("/users/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [user_id])
        res.json(deleteUser.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});

//get all user contacts
app.get("/contacts/:user_id", async (req, res) => {
    try {
        const { user_id  } = req.params;
        const allUserContacts = await pool.query("SELECT * FROM contacts WHERE user_id = $1", [user_id]);
        res.json(allUserContacts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get a user contact
app.get("/contacts/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id  } = req.params;
        const contact = await pool.query("SELECT * FROM contacts WHERE user_id = $1 AND contact_id = $2", [user_id, contact_id]);
        res.json(contact.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//post a contact
app.post("/contacts", async (req, res) => {
    try {
       const {user_id, contact_id, firstname, lastname, phonenumber, emailaddress, birthday, homeaddress, gender, organization, organization_role, social_media, notes, contact_image} = req.body;
       const newUser = await pool.query("INSERT INTO contacts (user_id, contact_id, firstname, lastname, phonenumber, emailaddress, birthday, homeaddress, gender, organization, organization_role, social_media, notes, contact_image) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [user_id, contact_id, firstname, lastname, phonenumber, emailaddress, birthday, homeaddress, gender, organization, organization_role, social_media, notes, contact_image])
       res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//update a contact
app.put("/contacts/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id } = req.params;
        const { firstname, lastname, emailaddress, phonenumber, gender, birthday, homeaddress, organization, organization_role, social_media, favorite, notes, contact_image } = req.body;
        const updateContact = await pool.query("UPDATE contacts SET firstname = $1, lastname = $2, emailaddress = $3, phonenumber = $4, birthday = $5, homeaddress = $6, gender = $7, organization = $8, organization_role = $9, social_media = $10, favorite = $11, notes = $12, contact_image = $13 WHERE user_id = $14 AND contact_id = $15", [firstname, lastname, emailaddress, phonenumber, birthday, homeaddress, gender, organization, organization_role, social_media, favorite, notes, contact_image, user_id, contact_id]);
        res.json(updateContact.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a user contact
app.delete("/contacts/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id } = req.params;
        const deleteContact = await pool.query("DELETE FROM contacts WHERE user_id = $1 AND contact_id = $2", [user_id, contact_id])
        res.json(deleteContact.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});

//delete all user contacts
app.delete("/contacts/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const deleteContacts = await pool.query("DELETE FROM contacts WHERE user_id = $1", [user_id])
        res.json(deleteContacts.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});

//get all user groups
app.get("/groups/:user_id", async (req, res) => {
    try {
        const { user_id  } = req.params;
        const allUserGroups = await pool.query("SELECT * FROM groups WHERE user_id = $1", [user_id]);
        res.json(allUserGroups.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//post a user group
app.post("/groups", async (req, res) => {
    try {
       const { user_id, group_id, groupName } = req.body;
       const newUserGroup = await pool.query("INSERT INTO groups (user_id, group_id, groupName) VALUES($1, $2, $3) RETURNING *", [user_id, group_id, groupName])
       res.json(newUserGroup.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`server has started on 3000`)
});