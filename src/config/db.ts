import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres://postgres:postgres@172.20.182.145:5432/postgres')

export default sequelize;
