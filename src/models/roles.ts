import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const RolesModel = sequelize.define("users", {
   userRole: {
     type: DataTypes.STRING,
     allowNull: false
   },
});

sequelize.sync().then(() => {
   console.log('Roles table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

export default RolesModel;
