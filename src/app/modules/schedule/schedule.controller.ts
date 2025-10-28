import catchAsync from '@/app/shared/catchAsync';
import * as service from './schedule.service';
import sendResponse from '@/app/shared/sendResponse';
import { pick } from '@/app/helper';
import { IJWTPayload } from '@/app/types/common';
import { Request } from 'express';

export const insertIntoDB = catchAsync(async (req, res) => {
  const result = await service.insertIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Schedule created successfully!',
    data: result,
  });
});

export const schedulesForDoctor = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const fillters = pick(req.query, ['startDateTime', 'endDateTime']);

    const user = req.user;

    const result = await service.schedulesForDoctor(
      user as IJWTPayload,
      fillters,
      options
    );
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Schedule fetched successfully!',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const deleteScheduleFromDB = catchAsync(async (req, res) => {
  const result = await service.deleteScheduleFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Schedule fetched successfully!',
    data: result,
  });
});
