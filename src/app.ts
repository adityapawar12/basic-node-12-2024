import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import testRouter from "./routes/testRoute";
import sequelize from "./config/db";
import authRouter from "./routes/authRoute";

const app: Express = express();

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.info('DB Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(compression());

app.use('/api/test/', testRouter);
app.use('/api/auth/', authRouter);

export default app;
