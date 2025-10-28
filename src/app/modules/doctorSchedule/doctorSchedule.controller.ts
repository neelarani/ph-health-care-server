import * as service from './doctorSchedule.service';
import catchAsync from '@/app/shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '@/app/shared/sendResponse';
import { IJWTPayload } from '@/app/types/common';

export const insertIntoDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await service.insertIntoDB(user as IJWTPayload, req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Doctor Schedule created successfully!',
      data: result,
    });
  }
);
