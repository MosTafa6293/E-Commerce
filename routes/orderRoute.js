const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/Order");
const { auth, admin } = require("../middleware/auth");
const stripe = require("stripe")(
  "sk_test_51KTM0RG1UJtyQQectypUPVCUHFWeglYFFazNMVOUAN9GnGiEwlThNoXjmcY7ZWOtbGJ5wDQueyBzFqdo6czsVAzw00PPCE6dMP"
);
const router = express.Router();
router.post("/placeorder", async (req, res) => {
  const { token, cartItems, userInfo, subtotal } = req.body;
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });
  const payment = await stripe.charges.create(
    {
      amount: subtotal * 100,
      currency: "inr",
      customer: customer.id,
      receipt_email: token.email,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );
  if (payment) {
    const order = new Order({
      user: userInfo.user._id,
      name: userInfo.user.name,
      email: userInfo.user.email,
      orderItems: cartItems,
      shippingAddress: {
        address: token.card.address_line1,
        city: token.card.address_city,
        country: token.card.address_country,
        postalCode: token.card.address_zip,
      },
      orderAmount: subtotal,
      transactionId: payment.source.id,
      isDelivered: false,
    });
    await order.save();
    res.status(200).json(order);
  } else {
    res.status(400).json({ msg: "payment failed" });
  }
});
router.get("/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
      res.status(404).json({ msg: "not orders found" });
    }
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ msg: "not order found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      res.status(404).json({ msg: "not order found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find();

    return res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "order not found" });
    }
    await order.remove();
    return res.json({ msg: "order deleted" });
  } catch (err) {
    console.log(err);
    return res.status(400).send("server error");
  }
});
module.exports = router;
