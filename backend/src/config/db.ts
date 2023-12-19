import { Sequelize } from "sequelize";
import { dbConfig } from "./db-config";

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  "JPhv2002@@",
  {
    host: dbConfig.HOST,
    dialect: "mysql",
    port: dbConfig.PORT,
  }
);

export default sequelize;
