import mongodb from "mongodb";
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";

const PORT = process.env.PORT||8000;

// uri is the connection string that you can get from your MongoDB deployment

const uri = "mongodb+srv://userme:SS9fDB9OJJQOgcW8@cluster1.yqbxwtr.mongodb.net/?retryWrites=true&w=majority";

const app = express();
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use('/auth', authRoute);

app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running");
});