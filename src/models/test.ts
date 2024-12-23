import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const TestModel = sequelize.define("tests", {
   testText: {
     type: DataTypes.STRING(500),
     allowNull: false
   },
});

sequelize.sync().then(() => {
   console.log('Test table created successfully!');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

export default TestModel;
