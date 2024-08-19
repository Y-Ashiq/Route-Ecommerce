import express from "express";
import connectDB from "./database/DBconnection.js";
import { BootStrap } from "./src/modules/bootStrap.js";
const app = express();
const port = 3000;

app.use(express.json());

connectDB;
BootStrap(app);

app.use("**", (req, res, next) => {
  next(new AppError(`invalid url ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: "error", error: err.message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
