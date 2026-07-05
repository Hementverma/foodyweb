const express = require("express");

const router = express.Router();

const User = require("../models/User");

const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const jwtSecret = "MyNameisPrashantSinghWeb";


// CREATE USER
router.post(
  "/createuser",

  [
    body("email").isEmail(),

    body("name").isLength({ min: 4 }),

    body("password", "Invalid Password").isLength({ min: 5 }),
  ],

  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {

      const salt = await bcrypt.genSalt(10);

      const secPassword = await bcrypt.hash(
        req.body.password,
        salt
      );

      await User.create({

        name: req.body.name,

        password: secPassword,

        email: req.body.email,

        location: req.body.location,

      });

      return res.json({
        success: true,
      });

    } catch (error) {

      console.error(error);

      return res.json({
        success: false,
      });
    }
  }
);


// LOGIN USER
router.post(

  "/loginuser",

  [
    body("email").isEmail(),

    body("password", "Invalid Password").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const email = req.body.email;

    try {

      const userData = await User.findOne({ email });

      if (!userData) {

        return res.status(400).json({
          errors: "Try logging with correct credentials",
        });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!pwdCompare) {

        return res.status(400).json({
          errors: "Try logging with correct credentials",
        });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({
        success: true,
        authToken: authToken,
      });

    } catch (error) {

      console.error(error);

      return res.json({
        success: false,
      });
    }
  }
);

module.exports = router;