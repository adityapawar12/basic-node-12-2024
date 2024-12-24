import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const RoleModel = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Roles table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export default RoleModel;
