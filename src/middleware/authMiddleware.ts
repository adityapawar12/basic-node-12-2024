import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";
import RoleModel from "../models/roleModel";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({
        isSuccess: false,
        isError: true,
        data: null,
        error: { message: "Access denied" },
      });
    } else {
      const decoded = jwt.verify(token.slice(7), "asdfghkl;");
      const verifiedUserId: { userId: string } = decoded as {
        userId: string;
      };
      res.locals.userId = verifiedUserId.userId;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({
      isSuccess: false,
      isError: true,
      data: null,
      error: error,
    });
  }
};

export const verifySuperAdmin = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserModel.findByPk(res.locals.userId, {
      include: {
        model: RoleModel,
      },
    })
      .then((data) => {
        if (data === null) {
          res.status(400).json({
            isSuccess: false,
            isError: true,
            data: null,
            error: {
              message: `User not found with id ${res.locals.userId}`,
            },
          });
        } else {
          if (data.dataValues.Role.role === "superadmin") {
            return next();
          } else {
            res.status(400).json({
              isSuccess: false,
              isError: true,
              data: null,
              error: {
                message: `User is not superadmin`,
              },
            });
          }
        }
      })
      .catch((error) => {
        res.status(400).json({
          isSuccess: false,
          isError: true,
          data: null,
          error: error,
        });
      });
  } catch (error) {
    res.status(501).json({
      isSuccess: false,
      isError: true,
      data: null,
      error: error,
    });
  }
};

export const verifyAdmin = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserModel.findByPk(res.locals.userId, {
      include: {
        model: RoleModel,
      },
    })
      .then((data) => {
        if (data === null) {
          res.status(400).json({
            isSuccess: false,
            isError: true,
            data: null,
            error: {
              message: `User not found with id ${res.locals.userId}`,
            },
          });
        } else {
          if (
            data.dataValues.Role.role === "admin" ||
            data.dataValues.Role.role === "superadmin"
          ) {
            return next();
          } else {
            res.status(400).json({
              isSuccess: false,
              isError: true,
              data: null,
              error: {
                message: `User is not admin`,
              },
            });
          }
        }
      })
      .catch((error) => {
        res.status(400).json({
          isSuccess: false,
          isError: true,
          data: null,
          error: error,
        });
      });
  } catch (error) {
    res.status(501).json({
      isSuccess: false,
      isError: true,
      data: null,
      error: error,
    });
  }
};

export const verifyCustomer = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UserModel.findByPk(res.locals.userId, {
      include: {
        model: RoleModel,
      },
    })
      .then((data) => {
        if (data === null) {
          res.status(400).json({
            isSuccess: false,
            isError: true,
            data: null,
            error: {
              message: `User not found with id ${res.locals.userId}`,
            },
          });
        } else {
          if (
            data.dataValues.Role.role === "customer" ||
            data.dataValues.Role.role === "admin" ||
            data.dataValues.Role.role === "superadmin"
          ) {
            return next();
          } else {
            res.status(400).json({
              isSuccess: false,
              isError: true,
              data: null,
              error: {
                message: `User is not customer`,
              },
            });
          }
        }
      })
      .catch((error) => {
        res.status(400).json({
          isSuccess: false,
          isError: true,
          data: null,
          error: error,
        });
      });
  } catch (error) {
    res.status(501).json({
      isSuccess: false,
      isError: true,
      data: null,
      error: error,
    });
  }
};
