"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
class UsersController {
    constructor() {
        this.router = (0, express_1.Router)();
        this.router.post("/login", this.login);
        //add user
        this.router.post("/addUser", (req, res) => this.add(req, res));
        this.repository = new userRepository_1.default;
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = req.body;
            if (p.name) {
                const newUser = yield this.repository.createUser(p.name, p.password);
                res.status(201).json(newUser);
            }
            else {
                res.status(400).json({ error: "Error, name cannot be empty" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            const userRepository = (0, typeorm_1.getManager)().getRepository(user_1.Users);
            const userValidate = yield userRepository.find({ where: { name: user, password: password } });
            if (userValidate.length == 0)
                res.status(404).json({ message: "User or password doesnt exists." });
            else {
                const token = jsonwebtoken_1.default.sign({ user: "cestrada", role: "admin" }, process.env.secret);
                res.status(200).json({ token });
            }
        });
    }
}
exports.UsersController = UsersController;
