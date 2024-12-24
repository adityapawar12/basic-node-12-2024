import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const TestModel = sequelize.define(
  "Test",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
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
    console.log("Tests table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export default TestModel;
