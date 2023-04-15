const express = require("express");
const Users = require("../model/Users");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { use } = require("./notes");
const fetchuser = require("../middleware/fetchuser");

// declaring JWT private key
const JWT_SECRET = "idontlikecoding";

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    // creating validation for the user inputs
    body("firstname", "First name must contain 3 characters").isLength({
      min: 3,
    }),
    body("lastname", "Last name must contain 3 characters").isLength({
      min: 3,
    }),
    body("username", "username must be of 6 or more characters").isLength({
      min: 6,
    }),
    body("password", "password must be of 6 or more characters").isLength({
      min: 6,
    }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    //cheaking for error regarding validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //using try-catch to cheak unknown any error
    try {
      //creating user
      let user = await Users.findOne(
        { email: req.body.email }, //using findone func for taking unique email
        { username: req.body.username } //using findone func for taking unique username
      );
      // cheacking if entered email/username is already used or not
      if (user) {
        return res.status(400).json({ success, error: "entered username/email has already been used", });
      }

      if(req.body.password !== req.body.conpassword){
        return res.status(400).json({success, error: "Password and Confirm Password should be same",})
      }

      // creating salt and hash for the password
      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(req.body.password, salt);
      const conpass = await bcrypt.hash(req.body.conpassword, salt);

      // creating 'Users'(from Users.js) to take the details of user and passing it to 'user'
      user = await Users.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: pass,
        conpassword: conpass,
      });

      // Payload for JWT(here we can either use string or objects)
      const data = {
        // creating user data object for payload
        user: {
          id: user.id,
        },
      };

      //created the ‘authtoken’ function in which we have used the jwt.sign method
      const authToken = jwt.sign(data, JWT_SECRET); //Jwt.sign method takes two parameters and returns the promise
      success = true;
      res.json({ success, authToken }); //taking token in response
      // res.json(user); //printing details of user to json
      // console.log(req.body); //printing details of user to console
    } catch (error) {
      // catch block for showing the error message
      console.error(error.message);
      res.status(500).send("Something went wrong ");
    }
  }
);

// ROUTE 2: Authenticating a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    // creating validation for the user inputs
    body("password", "password must be of 6 or more characters").isLength({
      min: 6,
    }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    let success = false;
    //cheaking for error regarding validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          error: "please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "please try to login with correct credentials",
        });
      }

      // for ideal case (correct credentials) we will send the payload to user
      const data = {
        // creating user data object for payload
        user: {
          id: user.id,
        },
      };

      //created the ‘authtoken’ function in which we have used the jwt.sign method
      const authToken = jwt.sign(data, JWT_SECRET); //Jwt.sign method takes two parameters and returns the promise
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong ");
    }
  }
);

// ROUTE 3: Get User details using: POST "/api/auth/getuser". Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userID = req.user.id;
    const user = await Users.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something went wrong ");
  }
});

module.exports = router;
