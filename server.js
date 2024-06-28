import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import knex from "knex";
import users from "./routes/users.js";

const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 8080;
console.log(process.env.DB_LOCAL_PASSWORD);
app.use(cors());

app.use("/users", users);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
