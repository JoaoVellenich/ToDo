import { config } from "dotenv";

config();

export const dbHost = process.env.MYSQL_HOST || "";
export const dbUser = process.env.DB_USER || "";
export const dbPassword = process.env.DB_PASSWORD || "";
export const dbDataBase = process.env.DB_DATA_BASE || "";
export const dbPort = process.env.MYSQL_PORT || 3306;

export const jwtSecret = process.env.JWT_SECTE || "secret";
