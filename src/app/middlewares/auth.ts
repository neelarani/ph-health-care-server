import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';

export const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.cookies.token.accessToken;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      const verifyUser = token.verifyToken(token, 'dikfrje');
      req.user = verifyUser;

      if (roles.length && !roles.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
