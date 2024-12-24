import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import RoleModel from "./roleModel";

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

RoleModel.hasOne(UserModel, {
  foreignKey: {
    allowNull: false,
  },
});
UserModel.belongsTo(RoleModel);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Users table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export default UserModel;
