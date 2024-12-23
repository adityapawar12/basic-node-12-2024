import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const UserModel = sequelize.define("users", {
   username: {
     type: DataTypes.STRING,
     allowNull: false
   },
   email: {
     type: DataTypes.STRING,
     allowNull: false
   },
   password: {
     type: DataTypes.STRING,
     allowNull: false
   },
});

sequelize.sync().then(() => {
   console.log('Users table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

export default UserModel;
