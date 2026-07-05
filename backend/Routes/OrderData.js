const express = require("express");

const router = express.Router();

const Order = require("../models/Order");


// SAVE ORDER DATA
router.post("/orderData", async (req, res) => {

  try {

    let data = req.body.order_data;

    // Add Order Date
    data.splice(0, 0, {
      order_date: req.body.order_date,
    });

    // Find Existing User Order
    const existingOrder = await Order.findOne({
      email: req.body.email,
    });

    // If User Has No Orders
    if (existingOrder === null) {

      await Order.create({

        email: req.body.email,

        order_data: [data],

      });

      return res.json({
        success: true,
      });
    }

    // If User Already Has Orders
    await Order.findOneAndUpdate(

      { email: req.body.email },

      {
        $push: {
          order_data: data,
        },
      }
    );

    return res.json({
      success: true,
    });

  } catch (error) {

    console.error(error.message);

    return res.status(500).send("Server Error");
  }
});


// GET USER ORDERS
router.post("/myOrderData", async (req, res) => {

  try {

    const myData = await Order.findOne({
      email: req.body.email,
    });

    return res.json({
      orderData: myData,
    });

  } catch (error) {

    console.error(error.message);

    return res.status(500).send("Server Error");
  }
});

module.exports = router;