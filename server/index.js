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
// app.get("/images/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await pool.query('SELECT * FROM images WHERE id = $1', [id]);
//     if (result.rows.length > 0) {
//                 const imageData = result.rows[0].data; // bytea data as Buffer
//                 const contentType = result.rows[0].mime_type; // e.g., 'image/jpeg'
//                 const base64Image = imageData.toString('base64');
//                 res.json({ image: base64Image, contentType: contentType });
//             } else {
//                 res.status(404).send('Image not found');
//             }
//         } catch (error) {
//             console.error('Error fetching image:', error);
//             res.status(500).send('Server error');
//         }
// })

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
});

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

//mobile update a user image
// app.put("/user_images/:user_id", upload.single('mobileEditUserAddPhoto'), async (req, res) => {
//     if (!req.file) {
//             return res.status(400).send('No file uploaded.');
//         }

//         const { user_id } = req.params
//         const id = req.body.id;
//         const { originalname, mimetype, buffer } = req.file;

//         try {
//             // Insert image data into PostgreSQL
//             const result = await pool.query('UPDATE user_images SET user_id = $1, name = $2, mime_type = $3, data = $4 WHERE user_id = $5', [id, originalname, mimetype, buffer, user_id]);
//             res.status(201).json({ message: 'Image uploaded successfully!', id: result.rows.id });
//         } catch (error) {
//             console.error('Error saving image to DB:', error);
//             res.status(500).send('Error uploading image.');
//         }
// });

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
       const {user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password, user_image} = req.body;
       const newUser = await pool.query("INSERT INTO users (user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password, user_image) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [user_id, session_id, firstname, lastname, emailaddress, phonenumber, user_password, user_image])
       res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//edit a user
app.put("/users/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const {firstname, lastname, emailaddress, phonenumber, password, session_id } = req.body;
        const updateUser = await pool.query("UPDATE users SET firstname = $1, lastname = $2, emailaddress = $3, phonenumber = $4, user_password = $5, session_id = $6 WHERE user_id = $7", [firstname, lastname, emailaddress, phonenumber, password, session_id, user_id]);
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
       const {user_id, contact_id, firstname, lastname, birthday, gender, organization, organization_role, notes} = req.body;
       const newUser = await pool.query("INSERT INTO contacts (user_id, contact_id, firstname, lastname, birthday, gender, organization, organization_role, notes) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [user_id, contact_id, firstname, lastname, birthday, gender, organization, organization_role, notes])
       res.json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//get all user contact images
app.get("/contact_images/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const allUserContactImages = await pool.query('SELECT * FROM contact_images WHERE user_id = $1', [user_id]);
        res.json(allUserContactImages.rows)
    // if (result.rows.length > 0) {
    //             const imageName = result.rows[0].name
    //             const imageData = result.rows[0].data; // bytea data as Buffer
    //             const contentType = result.rows[0].mime_type; // e.g., 'image/jpeg'
    //             const base64Image = imageData.toString('base64');
    //             res.json({name: imageName, image: base64Image, contentType: contentType });
    //         } else {
    //             res.status(404).send('Image not found');
    //         }
        } catch (err) {
            console.error(err.message);
            // res.status(500).send('Server error');
        }
});


//get a contact's image
app.get("/contact_images/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id } = req.params;
        const result = await pool.query('SELECT * FROM contact_images WHERE user_id = $1 AND contact_id = $2', [user_id, contact_id]);
    if (result.rows.length > 0) {
                const imageName = result.rows[0].name
                const imageData = result.rows[0].data; // bytea data as Buffer
                const contentType = result.rows[0].mime_type; // e.g., 'image/jpeg'
                const base64Image = imageData.toString('base64');
                res.json({name: imageName, image: base64Image, contentType: contentType });
            } else {
                res.status(404).send('Image not found');
            }
        } catch (error) {
            console.error('Error fetching image:', error);
            res.status(500).send('Server error');
        }
});

//post a contact image
app.post("/contact_images", upload.single('newContactAddPhoto'), async (req, res) => {
    if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const user_id = req.body.id;
        const contact_id = req.body.contact_id;
        const { originalname, mimetype, buffer } = req.file;

        try {
            // Insert image data into PostgreSQL
            const result = await pool.query(
                'INSERT INTO contact_images (user_id, contact_id, name, mime_type, data) VALUES ($1, $2, $3, $4, $5) RETURNING*',
                [user_id, contact_id, originalname, mimetype, buffer]
            );
            res.status(201).json({ message: 'Image uploaded successfully!', id: result.rows[0].id });
        } catch (error) {
            console.error('Error saving image to DB:', error);
            res.status(500).send('Error uploading image.');
        }
});

//delete a contact's images
app.delete("/contact_images/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id } = req.params;
        const deleteContactImage = await pool.query("DELETE FROM contact_images WHERE user_id = $1 AND contact_id = $2", [user_id, contact_id])
        res.json(deleteContactImage.rows[0])
    } catch (err) {
            console.log(err.message)
    }
});

//get a contact's emailaddresses
app.get("/contactEmailAddresses/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id } = req.params;
        const contactEmailAddress = await pool.query("SELECT * FROM contactEmailAddresses WHERE userid = $1 AND contactid = $2 ORDER BY emailid", [user_id, contact_id]);
        res.json(contactEmailAddress.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//post a contact emailaddress
app.post("/contactEmailAddresses", async (req, res) => {
    try {
       const {user_id, contact_id, email_id, emailAddressLabel, emailaddress} = req.body;
       const newContactEmailAddress = await pool.query("INSERT INTO contactEmailAddresses (userId, contactId, emailId, emailaddresslabel, emailaddress) VALUES($1, $2, $3, $4, $5) RETURNING *", [user_id, contact_id, email_id, emailAddressLabel, emailaddress])
       res.json(newContactEmailAddress.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//edit a contact email address
app.put("/contactEmailAddresses/:userid/:contactid/:emailid", async (req, res) => {
    try {
       const { userid, contactid, emailid } = req.params;
       const {emailAddressLabel, emailaddress} = req.body;
       const editContactEmailAddress = await pool.query("UPDATE contactEmailAddresses SET emailaddress = $1, emailaddresslabel = $2 WHERE userid = $3 AND contactid = $4 AND emailid = $5", [emailaddress, emailAddressLabel, userid, contactid, emailid])
       res.json(editContactEmailAddress.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact emailaddresses
app.delete("/contactEmailAddresses/:userid/:contactid", async (req, res) => {
    try {
       const { userid, contactid } = req.params;
    //    const {emailAddressLabel, emailaddress} = req.body;
       const deleteContactEmailAddress = await pool.query("DELETE FROM contactEmailAddresses WHERE userid = $1 AND contactid = $2", [userid, contactid])
       res.json(deleteContactEmailAddress.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact emailaddress
app.delete("/contactEmailAddresses/:userid/:contactid/:emailid", async (req, res) => {
    try {
       const { userid, contactid, emailid } = req.params;
       const {emailAddressLabel, emailaddress} = req.body;
       const deleteContactEmailAddress = await pool.query("DELETE FROM contactEmailAddresses WHERE userid = $1 AND contactid = $2 AND emailid = $3 AND emailaddresslabel = $4 AND emailaddress = $5", [userid, contactid, emailid, emailAddressLabel, emailaddress])
       res.json(deleteContactEmailAddress.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//get a contact's phonenumbers
app.get("/contactPhoneNumbers/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id  } = req.params;
        const contactPhoneNumber = await pool.query("SELECT * FROM contactPhoneNumbers WHERE userid = $1 AND contactid = $2 ORDER BY phonenumberid", [user_id, contact_id]);
        res.json(contactPhoneNumber.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//post a contact phonenumber
app.post("/contactPhoneNumbers", async (req, res) => {
    try {
       const {user_id, contact_id, phonenumber_id, phoneNumberLabel, phonenumber} = req.body;
       const newContactPhoneNumber = await pool.query("INSERT INTO contactPhoneNumbers (userId, contactId, phonenumberId, phonenumberlabel, phonenumber) VALUES($1, $2, $3, $4, $5) RETURNING *", [user_id, contact_id, phonenumber_id, phoneNumberLabel, phonenumber])
       res.json(newContactPhoneNumber.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//edit a contact phonenumber
app.put("/contactPhoneNumbers/:userid/:contactid/:phonenumberid", async (req, res) => {
    try {
       const { userid, contactid, phonenumberid } = req.params;
       const {phoneNumberLabel, phonenumber} = req.body;
       const editContactPhoneNumber = await pool.query("UPDATE contactPhoneNumbers SET phonenumber = $1, phonenumberlabel = $2 WHERE userid = $3 AND contactid = $4 AND phonenumberid = $5", [phonenumber, phoneNumberLabel, userid, contactid, phonenumberid])
       res.json(editContactPhoneNumber.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//edit a contact phonenumber label
app.put("/contactPhoneNumbers/:userid/:contactid/:phonenumberid", async (req, res) => {
    try {
       const { userid, contactid, phonenumberid } = req.params;
       const {phoneNumberLabel, phonenumber} = req.body;
       const editContactPhoneNumber = await pool.query("UPDATE contactPhoneNumbers SET phonenumberlabel = $1 WHERE userid = $2 AND contactid = $3 AND phonenumberid = $4 AND phonenumber = $5", [phoneNumberLabel, userid, contactid, phonenumberid, phonenumber])
       res.json(editContactPhoneNumber.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact's phonenumbers
app.delete("/contactPhoneNumbers/:userid/:contactid", async (req, res) => {
    try {
       const { userid, contactid } = req.params;
    //    const {phoneNumberLabel, phonenumber} = req.body;
       const deleteContactPhoneNumber = await pool.query("DELETE FROM contactPhoneNumbers WHERE userid = $1 AND contactid = $2", [userid, contactid])
       res.json(deleteContactPhoneNumber.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact phonenumber
app.delete("/contactPhoneNumbers/:userid/:contactid/:phonenumberid", async (req, res) => {
    try {
       const { userid, contactid, phonenumberid } = req.params;
       const {phoneNumberLabel, phonenumber} = req.body;
       const deleteContactPhoneNumber = await pool.query("DELETE FROM contactPhoneNumbers WHERE userid = $1 AND contactid = $2 AND phonenumberid = $3 AND phonenumberlabel = $4 AND phonenumber = $5", [userid, contactid, phonenumberid, phoneNumberLabel, phonenumber])
       res.json(deleteContactPhoneNumber.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//get a contact's addresses
app.get("/contactAddresses/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id  } = req.params;
        const contactAddress = await pool.query("SELECT * FROM contactAddresses WHERE userid = $1 AND contactid = $2 ORDER BY addressid", [user_id, contact_id]);
        res.json(contactAddress.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//post a contact address
app.post("/contactAddresses", async (req, res) => {
    try {
       const {user_id, contact_id, address_id, addressLabel, address} = req.body;
       const newContactPhoneNumber = await pool.query("INSERT INTO contactAddresses (userId, contactId, addressId, addresslabel, address) VALUES($1, $2, $3, $4, $5) RETURNING *", [user_id, contact_id, address_id, addressLabel, address])
       res.json(newContactPhoneNumber.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//edit a contact address
app.put("/contactAddresses/:userid/:contactid/:addressid", async (req, res) => {
    try {
       const { userid, contactid, addressid } = req.params;
       const {addressLabel, address} = req.body;
       const editContactAddress = await pool.query("UPDATE contactAddresses SET address = $1, addresslabel = $2 WHERE userid = $3 AND contactid = $4 AND addressid = $5", [address, addressLabel, userid, contactid, addressid])
       res.json(editContactAddress.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact address
app.delete("/contactAddresses/:userid/:contactid/:addressid", async (req, res) => {
    try {
       const { userid, contactid, addressid } = req.params;
       const {addressLabel, address} = req.body;
       const deleteContactAddress = await pool.query("DELETE FROM contactAddresses WHERE userid = $1 AND contactid = $2 AND addressid = $3 AND addresslabel = $4 AND address = $5", [userid, contactid, addressid, addressLabel, address])
       res.json(deleteContactAddress.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact's addresses
app.delete("/contactAddresses/:userid/:contactid", async (req, res) => {
    try {
       const { userid, contactid } = req.params;
    //    const {addressLabel, address} = req.body;
       const deleteContactAddress = await pool.query("DELETE FROM contactAddresses WHERE userid = $1 AND contactid = $2", [userid, contactid])
       res.json(deleteContactAddress.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//get a contact's websites
app.get("/contactWebsites/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id  } = req.params;
        const contactWebsite = await pool.query("SELECT * FROM contactWebsites WHERE userid = $1 AND contactid = $2 ORDER BY websiteid", [user_id, contact_id]);
        res.json(contactWebsite.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//post a contact website
app.post("/contactWebsites", async (req, res) => {
    try {
       const {user_id, contact_id, website_id, websiteLabel, website} = req.body;
       const newContactWebsite = await pool.query("INSERT INTO contactWebsites (userId, contactId, websiteId, websitelabel, website) VALUES($1, $2, $3, $4, $5) RETURNING *", [user_id, contact_id, website_id, websiteLabel, website])
       res.json(newContactWebsite.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//edit a contact's website
app.put("/contactWebsites/:userid/:contactid/:websiteid", async (req, res) => {
    try {
       const { userid, contactid, websiteid } = req.params;
       const {websiteLabel, website} = req.body;
       const editContactWebsite = await pool.query("UPDATE contactWebsites SET website = $1, websitelabel = $2 WHERE userid = $3 AND contactid = $4 AND websiteid = $5", [website, websiteLabel, userid, contactid, websiteid])
       res.json(editContactWebsite.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact website
app.delete("/contactWebsites/:userid/:contactid/:websiteid", async (req, res) => {
    try {
       const { userid, contactid, websiteid } = req.params;
       const {websiteLabel, website} = req.body;
       const deleteContactWebsite = await pool.query("DELETE FROM contactWebsites WHERE userid = $1 AND contactid = $2 AND websitelabel = $3 AND website = $4 AND websiteid = $5", [userid, contactid, websiteLabel, website, websiteid])
       res.json(deleteContactWebsite.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//delete a contact's websites
app.delete("/contactWebsites/:userid/:contactid", async (req, res) => {
    try {
       const { userid, contactid } = req.params;
    //    const {websiteLabel, website} = req.body;
       const deleteContactWebsite = await pool.query("DELETE FROM contactWebsites WHERE userid = $1 AND contactid = $2", [userid, contactid])
       res.json(deleteContactWebsite.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//edit a contact image
app.put("/contact_images/:user_id/:contact_id", upload.single('editContactAddPhoto'), async (req, res) => {
    if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const { user_id } = req.params;
        const id = req.body.id;
        const { originalname, mimetype, buffer } = req.file;

        try {
            // Insert image data into PostgreSQL
            const result = await pool.query(
                'UPDATE contact_images SET contact_id = $1, name = $2, mime_type = $3, data = $4 WHERE user_id = $5 AND contact_id = $1', [id, originalname, mimetype, buffer, user_id]
            );
            res.status(201).json({ message: 'Image uploaded successfully!'});
        } catch (error) {
            console.error('Error saving image to DB:', error);
            res.status(500).send('Error uploading image.');
        }
});

//update a contact
app.put("/contacts/:user_id/:contact_id", async (req, res) => {
    try {
        const { user_id, contact_id } = req.params;
        const { firstname, lastname, gender, birthday, organization, organization_role, favorite, notes } = req.body;
        const updateContact = await pool.query("UPDATE contacts SET firstname = $1, lastname = $2, birthday = $3, gender = $4, organization = $5, organization_role = $6, favorite = $7, notes = $8 WHERE user_id = $9 AND contact_id = $10", [firstname, lastname, birthday, gender, organization, organization_role, favorite, notes, user_id, contact_id]);
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

async function helloApp() {
    console.log("hello app")
}


app.listen(process.env.PORT || 3000, () => {
    console.log(`server has started on 3000`)
});