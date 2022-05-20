const mongoose = require("mongoose");
const mongodbUrl =
  "mongodb+srv://laca:jae09908@cluster0.gjxhg.mongodb.net/shop-ecommerce?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    const db = await mongoose.connect(mongodbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`db connected...`);
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;
