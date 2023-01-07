const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connecting to the MongoDB database
mongoose.connect('mongodb://localhost/my_database');

// Defining the User model for the database
const User = mongoose.model('User', {
  email: String,
  password: String
});

app.use(bodyParser.urlencoded({ extended: true }));

// Setting up the /signup route
app.post('/signup', (req, res) => {
  // Getting the email and password from the request body
  const { email, password } = req.body;

  // Hashing the password using bcrypt
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      // If there's an error, sending a 500 response
      res.sendStatus(500);
    } else {
      // Otherwise, creating a new User with the hashed password
      const user = new User({
        email,
        password: hash
      });

      // Saving the user to the database
      user.save((saveErr) => {
        if (saveErr) {
          // If there's an error, sending a 500 response
          res.sendStatus(500);
        } else {
          // Otherwise, sending a 201 response
          res.sendStatus(201);
        }
      });
    }
  });
});

// Setting up the /login route
app.post('/login', (req, res) => {
  // Getting the email and password from the request body
  const { email, password } = req.body;

  // Finding the user with the matching email
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      // If there's an error or the user is not found, sending a 401 response
      res.sendStatus(401);
    } else {
      // Otherwise, comparing the hashed password to the provided password
      bcrypt.compare(password, user.password, (compareErr, matches) => {
        if (compareErr || !matches) {
          // If there's an error or the passwords don't match, sending a 401 response
          res.sendStatus(401);
        } else {
          // Otherwise, sending a 200 response
          res.sendStatus(200);
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
