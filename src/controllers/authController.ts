import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RoleModel from "../models/roleModel";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await RoleModel.findOne({ where: { role: role } })
      .then((data) => {
        if (data === null) {
          res.status(400).json({
            isSuccess: false,
            isError: true,
            data: null,
            error: {
              message: `${role} role does not exist`,
            },
          });
        } else {
          UserModel.create({
            username,
            email,
            password: hashedPassword,
            RoleId: data.dataValues.id,
          })
            .then(() => {
              res.status(201).json({
                isSuccess: true,
                isError: false,
                data: {
                  result: `A new user has been created.`,
                },
                error: null,
              });
            })
            .catch((error) => {
              res.status(401).json({
                isSuccess: false,
                isError: true,
                data: null,
                error: error,
              });
            });
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

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await UserModel.findOne({ where: { email } }).then(async (data) => {
      if (data === null) {
        res.status(401).json({
          isSuccess: false,
          isError: true,
          data: null,
          error: {
            message: `User with email address ${email} does not exists!`,
          },
        });
      } else {
        const passwordMatch = await bcrypt.compare(
          password,
          data.dataValues.password
        );
        if (!passwordMatch) {
          res.status(401).json({
            isSuccess: false,
            isError: true,
            data: null,
            error: { message: `Incorrect password!` },
          });
        }

        const token = jwt.sign({ userId: data.dataValues.id }, "asdfghkl;", {
          expiresIn: "1h",
        });

        res.status(201).json({
          isSuccess: true,
          isError: false,
          data: { token },
          error: null,
        });
      }
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
