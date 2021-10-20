import { Connection, createConnection } from "typeorm";
import { Product } from "../models/product";
import { Store } from "../models/store";
import { Users } from "../models/user";

export class DatabaseConnection {
  public static connection: Connection = null;

  static async connect() {
    if (!this.connection) {
      try {
        this.connection = await createConnection({
          type: "mssql",
          host: process.env.host,
          port: parseInt(process.env.db_port),
          username: process.env.database_username,
          password: process.env.database_password,
          database: process.env.database,
          synchronize: true,
          logging: false,
          dropSchema: false,
          entities: [Product, Store, Users],
          options: {
            enableArithAbort: true,
          },
        });
        console.log("Connection to DB success");
      } catch (ex) {
        console.log("Error db connection", ex);
      }
    }
    return this.connection;
  }
}
