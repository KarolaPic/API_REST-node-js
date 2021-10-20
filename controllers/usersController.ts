import { Request, Response, Router } from "express";
import {getManager} from "typeorm";
import JWT from "jsonwebtoken";
import { Users } from "../models/user";
import userRepository from "../repositories/userRepository";

export class UsersController {
  public router: Router;
  private repository: userRepository;

  constructor() {
    this.router = Router();
    this.router.post("/login", this.login);
    //add user
    this.router.post("/addUser", (req, res) => this.add(req, res));
    this.repository = new userRepository;
  }

  private async add(req: Request, res: Response): Promise<void> {
    const p: Users = req.body;
    if (p.name) {
      const newUser: Users = await this.repository.createUser(
        p.name,
        p.password
      );
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "Error, name cannot be empty" });
    }
  }

  private async login(req: Request, res: Response) {
    const { user, password } = req.body;
    const userRepository = getManager().getRepository(Users);
    const userValidate= await userRepository.find({where: {name: user, password:password}});
    if(userValidate.length== 0)
      res.status(404).json({ message: "User or password doesnt exists." });
    else{
      const token = JWT.sign(
        { user: user, role: "admin" },
        process.env.secret
      );
      res.status(200).json({ token });
    }
  }
}
