import { Sequelize } from "sequelize-typescript";
import { resolve } from "path";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
  dialect: "postgres",
  models: [resolve(__dirname, "../models")],
  logging: true,
});

try {
  sequelize.authenticate();
  console.log("CONNECTED ON DB");
} catch (error: any) {
  console.log(`ERROR TRYING TO CONNECT ON DB => ${error.message}`);
}

export default sequelize;
