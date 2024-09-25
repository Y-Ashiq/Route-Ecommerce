import express from "express";
import connectDB from "./database/DBconnection.js";
import { BootStrap } from "./src/modules/bootStrap.js";
import { AppError } from "./src/util/AppError.js";
import 'dotenv/config'
const app = express();
const port = 3000;

app.use(express.json());
app.use('/uploads' , express.static('uploads'))

connectDB;
BootStrap(app);


app.use("**", (req, res, next) => {
  next(new AppError(`invalid url ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  
  res.status(err.statusCode).send({ message: "error", error: err.message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));