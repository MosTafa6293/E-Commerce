const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { auth, admin } = require("../middleware/auth");
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
});
router.post("/", auth, admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
});

router.put("/:id", auth, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
});

router.post("/:id/review", auth, async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400).json({ msg: "user already reviewd" });
      } else {
        const review = {
          user: req.user._id,
          name: req.user.name,
          rating: Number(rating),
          comment,
        };

        /*product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length*/
        product.reviews.push(review);
        await product.save();
        res.status(201).json({ msg: "Review added" });
      }
    } else {
      res.status(404).json({ msg: "product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
router.get("/:id/review", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const productReviewd = product.reviews;
      res.json(productReviewd);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "not found" });
    }
    await product.remove();
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
});
module.exports = router;
