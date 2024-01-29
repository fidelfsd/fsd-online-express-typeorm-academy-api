import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateRoles1702301789294 } from "./migrations/01-CreateRoles";
import { CreateUsers1702301796616 } from "./migrations/02-CreateUsers";
import { CreateUsersRoles1702301805968 } from "./migrations/03-CreateUsersRoles";

import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

// import { config } from "../config";

// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: process.env.DB_HOST,
   port: 3306,
   username: process.env.DB_USER,
   password: "password",
   database: process.env.DB_DATABASE,
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
   migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
   // migrations: [
   //    CreateRoles1702301789294,
   //    CreateUsers1702301796616,
   //    CreateUsersRoles1702301805968,
   // ],
   synchronize: false,
   logging: false,
});

// console.log(`${__dirname}/migrations`);

console.log(process.env);
