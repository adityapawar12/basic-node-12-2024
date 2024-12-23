import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const TestModel = sequelize.define("Test", {
   testText: {
      type: DataTypes.STRING(500),
      allowNull: false
   },
});

sequelize.sync({ alter: true }).then(() => {
   console.log('Tests table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

export default TestModel;
