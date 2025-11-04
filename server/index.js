require('dotenv/config');
const express = require("express");
const pg = require("pg");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const pool = new pg.Pool({
   connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
//   user: 'postgres',
//   password: 'password',
//   host: 'localhost',
//   port: 5432,
//   database: 'contactlead'
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage})

app.use(express.json({
    limit: "1000MB"
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
app.get("/manage_groups_contact_:contact_id", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/group_:group_id", (req, res) => {
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

//get an image
app.get("/images/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM images WHERE id = $1', [id]);
    if (result.rows.length > 0) {
                const imageData = result.rows[0].data; // bytea data as Buffer
                const contentType = result.rows[0].mime_type; // e.g., 'image/jpeg'
                const base64Image = imageData.toString('base64');
                res.json({ image: base64Image, contentType: contentType });
            } else {
                res.status(404).send('Image not found');
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            res.status(500).send('Server error');
        }
})

//post image
// app.post("/images", upload.single('imageFile'), async (req, res) => {
//     if (!req.file) {
//             return res.status(400).send('No file uploaded.');
//         }

//         const user_id = req.body.id;
//         const { originalname, mimetype, buffer } = req.file;

//         try {
//             // Insert image data into PostgreSQL
//             const result = await pool.query(
//                 'INSERT INTO images (user_id, name, mime_type, data) VALUES ($1, $2, $3, $4) RETURNING*',
//                 [user_id, originalname, mimetype, buffer]
//             );
//             res.status(201).json({ message: 'Image uploaded successfully!', id: result.rows[0].id });
//         } catch (error) {
//             console.error('Error saving image to DB:', error);
//             res.status(500).send('Error uploading image.');
//         }
// });

//get a user's image
app.get("/user_images/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await pool.query('SELECT * FROM user_images WHERE user_id = $1', [user_id]);
    if (result.rows.length > 0) {
                const imageData = result.rows[0].data; // bytea data as Buffer
                const contentType = result.rows[0].mime_type; // e.g., 'image/jpeg'
                const base64Image = imageData.toString('base64');
                res.json({ image: base64Image, contentType: contentType });
            } else {
                res.status(404).send('Image not found');
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            res.status(500).send('Server error');
        }
})

//post a user image
app.post("/user_images", upload.single('imageFile'), async (req, res) => {
    if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const user_id = req.body.id;
        const { originalname, mimetype, buffer } = req.file;

        try {
            // Insert image data into PostgreSQL
            const result = await pool.query(
                'INSERT INTO user_images (user_id, name, mime_type, data) VALUES ($1, $2, $3, $4) RETURNING*',
                [user_id, originalname, mimetype, buffer]
            );
            res.status(201).json({ message: 'Image uploaded successfully!', id: result.rows[0].id });
        } catch (error) {
            console.error('Error saving image to DB:', error);
            res.status(500).send('Error uploading image.');
        }
});

//update a user image
app.put("/user_images/:user_id", upload.single('editUserAddPhoto'), async (req, res) => {
    if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const { user_id } = req.params
        const id = req.body.id;
        const { originalname, mimetype, buffer } = req.file;

        try {
            // Insert image data into PostgreSQL
            const result = await pool.query('UPDATE user_images SET user_id = $1, name = $2, mime_type = $3, data = $4 WHERE user_id = $5', [id, originalname, mimetype, buffer, user_id]);
            res.status(201).json({ message: 'Image uploaded successfully!', id: result.rows.id });
        } catch (error) {
            console.error('Error saving image to DB:', error);
            res.status(500).send('Error uploading image.');
        }
});

//delete a user image
app.delete("/user_images/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const deleteUserImage = await pool.query("DELETE FROM user_images WHERE user_id = $1", [user_id])
        res.json(deleteUserImage.rows[0])
    } catch (err) {
            console.log(err.message)
    }
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

//get a user group
app.get("/groups/:user_id/:group_id", async (req, res) => {
    try {
        const { user_id, group_id  } = req.params;
        const userGroup = await pool.query("SELECT * FROM groups WHERE user_id = $1 AND group_id = $2", [user_id, group_id]);
        res.json(userGroup.rows[0]);
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

//edit a user group
app.put("/groups/:user_id/:group_id", async (req, res) => {
    try {
       const { user_id, group_id } = req.params;
       const { groupName } = req.body;
       const editedUserGroup = await pool.query("UPDATE groups SET groupName = $1 WHERE user_id = $2 AND group_id = $3", [groupName, user_id, group_id])
       res.json(editedUserGroup.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a user group
app.delete("/groups/:user_id/:group_id", async (req, res) => {
    try {
        const { user_id, group_id } = req.params;
        const deleteGroup = await pool.query("DELETE FROM groups WHERE user_id = $1 AND group_id = $2", [user_id, group_id])
        res.json(deleteGroup.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});

//delete all user groups
app.delete("/groups/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const deleteAllGroups = await pool.query("DELETE FROM groups WHERE user_id = $1", [user_id])
        res.json(deleteAllGroups.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});

//get all users contact groupings
app.get("/contactGroups/:user_id", async (req, res) => {
    try {
        const { user_id  } = req.params;
        const allUserContactGroupings = await pool.query("SELECT * FROM contactGroups WHERE user_id = $1", [user_id]);
        res.json(allUserContactGroupings.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//post a contact to a group
app.post("/contactGroups", async (req, res) => {
    try {
       const { user_id, contact_id, group_id, groupName } = req.body;
       const newContactGrouping = await pool.query("INSERT INTO contactGroups (user_id, contact_id, group_id, groupName) VALUES($1, $2, $3, $4) RETURNING *", [user_id, contact_id, group_id, groupName])
       res.json(newContactGrouping.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact grouping
app.delete("/contactGroups/:user_id/:group_id", async (req, res) => {
    try {
        const { user_id, group_id } = req.params;
        const deleteContactGrouping = await pool.query("DELETE FROM contactGroups WHERE user_id = $1 AND group_id = $2", [user_id, group_id])
        res.json(deleteContactGrouping.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});

//delete a contact grouping
app.delete("/contactGroups/:user_id/:contact_id/:group_id", async (req, res) => {
    try {
        const { user_id, contact_id, group_id } = req.params;
        const deleteContactGrouping = await pool.query("DELETE FROM contactGroups WHERE user_id = $1 AND contact_id = $2 AND group_id = $3", [user_id, contact_id, group_id])
        res.json(deleteContactGrouping.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});

//delete all contact groupings
app.delete("/contactGroups/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const deleteAllContactGroupings = await pool.query("DELETE FROM contactGroups WHERE user_id = $1", [user_id])
        res.json(deleteAllContactGroupings.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`server has started on 3000`)
});