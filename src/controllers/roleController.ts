import { Request, Response } from "express";
import RoleModel from "../models/roleModel";

export const getAllRoles = async (_: Request, res: Response) => {
  try {
    await RoleModel.findAll()
      .then((data) => {
        res.status(201).json({
          isSuccess: true,
          isError: false,
          data: data,
          error: null,
        });
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

export const createRole = async (req: Request, res: Response) => {
  try {
    await RoleModel.create({ role: req.body.role })
      .then(() => {
        res.status(201).json({
          isSuccess: true,
          isError: false,
          data: {
            result: `Created a new role ${req.body.role}.`,
          },
          error: null,
        });
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

export const updateRole = async (req: Request, res: Response) => {
  try {
    await RoleModel.update(
      { role: req.body.role },
      { where: { id: req.params.id } }
    )
      .then((data) => {
        if (data[0] === 1) {
          res.status(201).json({
            isSuccess: true,
            isError: false,
            data: {
              result: `Updated a role with id ${req.params.id}.`,
            },
            error: null,
          });
        } else {
          res.status(400).json({
            isSuccess: false,
            isError: true,
            data: null,
            error: {
              message: `Role does not exist with id ${req.params.id}`,
            },
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

export const deleteRole = async (req: Request, res: Response) => {
  try {
    await RoleModel.destroy({ where: { id: req.params.id }, force: true }).then(
      (data) => {
        if (data === 1) {
          res.status(201).json({
            isSuccess: true,
            isError: false,
            data: {
              result: `Role with id ${req.params.id} is deleted.`,
            },
            error: null,
          });
        } else {
          res.status(400).json({
            isSuccess: false,
            isError: true,
            data: null,
            error: {
              message: `Role does not exist with id ${req.params.id}`,
            },
          });
        }
      }
    );
  } catch (error) {
    res.status(501).json({
      isSuccess: false,
      isError: true,
      data: null,
      error: error,
    });
  }
};
