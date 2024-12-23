import express from "express";
import { createTest, deleteTest, getTest, getTestById, updateTest } from "../controllers/testController";
import { verifyToken } from "../middleware/authMiddleware";

const testRouter = express.Router();

testRouter.use(verifyToken);

testRouter.get('/', getTest);
testRouter.get('/:id', getTestById);
testRouter.post('/', createTest);
testRouter.put('/:id', updateTest);
testRouter.delete('/:id', deleteTest);

export default testRouter;
