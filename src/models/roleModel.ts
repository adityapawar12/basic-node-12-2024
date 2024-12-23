import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const RoleModel = sequelize.define("Role", {
   userRole: {
      type: DataTypes.STRING,
      allowNull: false
   },
});

sequelize.sync({ alter: true }).then(() => {
   console.log('Roles table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

export default RoleModel;
