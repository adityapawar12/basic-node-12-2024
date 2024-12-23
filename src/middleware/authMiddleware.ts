import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      res.status(401).json({
        isSuccess: false,
        isError: true,
        data: null,
        error: { message: 'Access denied' }
      });
    } else {
      const decoded = jwt.verify(token.slice(7), 'asdfghkl;');
      const verifiedUserId: { userId: string } = decoded as { userId: string };
      res.locals.userId = verifiedUserId.userId;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({
      isSuccess: false,
      isError: true,
      data: null,
      error: error
    });
  }
}
