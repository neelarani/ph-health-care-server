import catchAsync from '@/app/shared/catchAsync';
import { IJWTPayload } from '@/app/types/common';
import * as service from './review.service';
import sendResponse from '@/app/shared/sendResponse';
import httpStatus from 'http-status';
import { Request } from 'express';
import { pick } from '@/app/helper';
import { reviewFilterableFields } from './review.constant';

export const insertIntoDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const user = req.user;
    const result = await service.insertIntoDB(user as IJWTPayload, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review created successfully',
      data: result,
    });
  }
);

export const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await service.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});
