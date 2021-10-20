import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { ProductController } from "./controllers/productsController";
import { UsersController } from "./controllers/usersController";
import { DatabaseConnection } from "./database/connection";
import { Middleware } from "./utils/middleware";

dotenv.config();
DatabaseConnection.connect();

const port = process.env.PORT || 1234;

const app = express();

app.use(express.json());

app.get("/api", (_: Request, res: Response) => {
  res.status(200).json({ message: "API is running OK" });
});

app.use("/api", new UsersController().router);
app.use(
  "/api/products",
  Middleware.authenticateJWT,
  new ProductController().router
);

app.listen(port, () => {
  console.log("App is running");
});
