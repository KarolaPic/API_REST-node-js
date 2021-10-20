import { getRepository, Repository } from "typeorm";
import { Users } from "../models/user";

export default class ProductRepository {
  private repository_: Repository<Users>;
  constructor() {}

  private get repository(): Repository<Users> {
    if (!this.repository_) {
      this.repository_ = getRepository(Users);
    }
    return this.repository_;
  }
  async createUser(
    name: string,
    password: string
  ): Promise<Users> {
    let user = new Users();
    user.name = name;
    user.password = password;
    return await this.repository.save(user);
  }
}
