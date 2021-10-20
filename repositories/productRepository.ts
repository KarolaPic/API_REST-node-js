import { getManager, getRepository, Repository } from "typeorm";
import { Product } from "../models/product";

export default class ProductRepository {
  private repository_: Repository<Product>;
  constructor() {}

  private get repository(): Repository<Product> {
    if (!this.repository_) {
      this.repository_ = getRepository(Product);
    }
    return this.repository_;
  }

  async getAllProductsStore(): Promise<Product[]>{
    const productRepository = getManager().getRepository(Product);
    return await productRepository.find({relations:['store']});
  }
}
