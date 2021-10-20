import { Request, Response, Router } from "express";
import { Product } from "../models/product";
import ProductRepository from "../repositories/productRepository";

export class ProductController {
  public router: Router;
  private repository: ProductRepository;

  constructor() {
    this.router = Router();

    //regresa todos los productos con su relacion a tienda
    this.router.post("/getProductsStore", (req, res) => this.getProductsStore(req, res));
    
    this.repository = new ProductRepository();
  }
  

  private async getProductsStore(req: Request, res: Response): Promise<void> {

    const products = await this.repository.getAllProductsStore();

    res.status(200).json(products);
   
  }

}
