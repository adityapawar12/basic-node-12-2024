import { Request, Response } from "express";
import TestModel from "../models/test";

export const getTest = async (_: Request, res: Response) => {
  try {
    await TestModel.findAll().then((data) => {
      res.status(201).json({
        isSuccess: true, 
        isError: false, 
        data: data, 
        error: null
      });
    }).catch(error => {
      res.status(400).json({
        isSuccess: false, 
        isError: true, 
        data: null, 
        error: error
      });
    });
  } catch (error) {
    res.status(501).json({
      isSuccess: false, 
      isError: true, 
      data: null, 
      error: error
    });
  }
};

export const getTestById = async (req: Request, res: Response) => {
  try {
    await TestModel.findByPk(req.params.id).then((data) => {
      if(data === null) {
        res.status(400).json({
          isSuccess: false, 
          isError: true, 
          data: null, 
          error: {message: `Test does not exist with id ${req.params.id}`}
        });
      } else {
        res.status(201).json({
          isSuccess: true, 
          isError: false, 
          data: data, 
          error: null
        });
      }
    }).catch(error => {
      res.status(400).json({
        isSuccess: false, 
        isError: true, 
        data: null, 
        error: error
      });
    });
  } catch (error) {
    res.status(501).json({
      isSuccess: false, 
      isError: true, 
      data: null, 
      error: error
    });
  }
};

export const createTest = async (req: Request, res: Response) => {
  try {
    await TestModel.create({testText: req.body.text}).then((_) => {
      res.status(201).json({
        isSuccess: true, 
        isError: false, 
        data: {
          result: `Created a new test item with text ${req.body.text}.`
        }, 
        error: null
      });
    }).catch(error => {
      res.status(400).json({
        isSuccess: false, 
        isError: true, 
        data: null, 
        error: error
      });
    });
  } catch (error) {
    res.status(501).json({
      isSuccess: false, 
      isError: true, 
      data: null, 
      error: error
    });
  }
};

export const updateTest = async (req: Request, res: Response) => {
  try {
    await TestModel.update({testText: req.body.text}, {where: {id: req.params.id}}).then((data) => {
      if(data[0] === 1) {
        res.status(201).json({
          isSuccess: true, 
          isError: false, 
          data: {
            result: `Updated a test item with id ${req.params.id}.`
          }, 
          error: null
        });
      } else {
        res.status(400).json({
          isSuccess: false, 
          isError: true, 
          data: null, 
          error: {message: `Test does not exist with id ${req.params.id}`}
        });
      }
    }).catch(error => {
      res.status(400).json({
        isSuccess: false, 
        isError: true, 
        data: null, 
        error: error
      });
    });
  } catch (error) {
    res.status(501).json({
      isSuccess: false, 
      isError: true, 
      data: null, 
      error: error
    });
  }
};

export const deleteTest = async (req: Request, res: Response) => {
  try {
    await TestModel.destroy({where: {id: req.params.id}}).then((data) => {
      if(data === 1) {
        res.status(201).json({
          isSuccess: true, 
          isError: false, 
          data: {
            result: `Test item with id ${req.params.id} is deleted.`
          }, 
          error: null
        });
      } else {
        res.status(400).json({
          isSuccess: false, 
          isError: true, 
          data: null, 
          error: {message: `Test does not exist with id ${req.params.id}`}
        });
      }
    })
  } catch (error) {
    res.status(501).json({
      isSuccess: false, 
      isError: true, 
      data: null, 
      error: error
    });
  }
};
