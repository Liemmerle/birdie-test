import { Sequelize } from "sequelize";

export const database = new Sequelize({
	database: process.env.DATABASE_NAME!,
	dialect: process.env.DATABASE_DIALECT! as "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | undefined,
	host: process.env.DATABASE_HOST!,
	password: process.env.DATABASE_PASSWORD!,
	port: Number.parseInt(process.env.DATABASE_PORT!, 10),
	username: process.env.DATABASE_USERNAME!,
});
