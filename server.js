const express = require("express");
const connectDB = require("./db");
const products = require("./routes/productRoutes");
const users = require("./routes/userRoutes");
const orderRoute = require("./routes/orderRoute");
const uploadRoute = require("./routes/uploadRoute");
const path = require("path");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const helmet = require("helmet");
require("dotenv").config({ path: "config/config.env" });
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//security
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running...");
  });
}

app.use("/upload", express.static(path.join(__dirname, "/upload")));
//router
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
