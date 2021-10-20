import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Store } from "./store";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  prize: number;

  @Column()
  qty: number;

  @ManyToOne(type => Store, store => store.products)
  store: Store;
}
