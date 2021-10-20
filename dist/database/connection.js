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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("../models/product");
const store_1 = require("../models/store");
const user_1 = require("../models/user");
class DatabaseConnection {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                try {
                    this.connection = yield (0, typeorm_1.createConnection)({
                        type: "mssql",
                        host: process.env.host,
                        port: parseInt(process.env.db_port),
                        username: process.env.database_username,
                        password: process.env.database_password,
                        database: process.env.database,
                        synchronize: true,
                        logging: false,
                        dropSchema: false,
                        entities: [product_1.Product, store_1.Store, user_1.Users],
                        options: {
                            enableArithAbort: true,
                        },
                    });
                    console.log("Connection to DB success");
                }
                catch (ex) {
                    console.log("Error db connection", ex);
                }
            }
            return this.connection;
        });
    }
}
exports.DatabaseConnection = DatabaseConnection;
DatabaseConnection.connection = null;
