import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./product";
@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(type => Product, product => product.store)
  products: Product[];
}
