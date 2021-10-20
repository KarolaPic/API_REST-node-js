"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const productsController_1 = require("./controllers/productsController");
const usersController_1 = require("./controllers/usersController");
const connection_1 = require("./database/connection");
const middleware_1 = require("./utils/middleware");
dotenv_1.default.config();
connection_1.DatabaseConnection.connect();
const port = process.env.PORT || 1234;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/api", (_, res) => {
    res.status(200).json({ message: "API is running OK" });
});
app.use("/api", new usersController_1.UsersController().router);
app.use("/api/products", middleware_1.Middleware.authenticateJWT, new productsController_1.ProductController().router);
app.listen(port, () => {
    console.log("App is running");
});
