import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import router from "./routes";

createConnection()
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(router);

    app.listen(3300, () => {
      console.log("Server is running on port 3300");
    });
  })
  .catch((error) => console.log(error));
