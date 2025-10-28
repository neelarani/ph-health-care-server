import sendResponse from '@/app/shared/sendResponse';
import httpStatus from 'http-status';
import * as service from './meta.service';
import catchAsync from '@/app/shared/catchAsync';
import { IJWTPayload } from '@/app/types/common';
import { Request } from 'express';

export const fetchDashboardMetaData = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const user = req.user;
    const result = await service.fetchDashboardMetaData(user as IJWTPayload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meta data retrival successfully!',
      data: result,
    });
  }
);
