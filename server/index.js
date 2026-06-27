import dotenv from "dotenv";
dotenv.config();

import express from "express";
import conssectDB from "./src/config/dbConnection.config.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Defult Get API Hit");
  res.json({ massage: "Welcom to my cracings project" });
});

// Defult Error Handling

app.use((err, req, res, next) => {
  const ErrMessage = err.message || "Internal Server Error";
  const ErrStausCode = err.statusCode || 500;

  res.status(ErrStausCode).json({ message: ErrMessage });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Start on Port ", port);
  conssectDB;
});
