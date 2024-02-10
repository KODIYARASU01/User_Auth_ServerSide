import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import router from "./router/router.js";

let app = express();
dotenv.config();
//middleware :
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

//Port number
let PORT = process.env.PORT || 5000;
let uri = process.env.MONGODB_URI;
//Get HTTP Request :
app.get("/", (req, res) => {
  res.status(201).json("Get http request");
});

//Api route
app.use('/api', router);

//MOngodb connection :

mongoose.connect(uri)
  .then(() => {
    console.log("Mongodb connected sucessfully");
    app.listen(PORT, () => {
      console.log(`Server running ${PORT} port number`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
