import express from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  updateRole,
} from "../controllers/roleController";
import { verifyCustomer, verifyToken } from "../middleware/authMiddleware";

const rolesRouter = express.Router();

rolesRouter.use(verifyToken);
rolesRouter.use(verifyCustomer);

rolesRouter.get("/", getAllRoles);
rolesRouter.post("/", createRole);
rolesRouter.put("/:id", updateRole);
rolesRouter.delete("/:id", deleteRole);

export default rolesRouter;
