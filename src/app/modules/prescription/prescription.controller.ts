import catchAsync from '@/app/shared/catchAsync';
import sendResponse from '@/app/shared/sendResponse';
import * as service from './prescription.service';
import { IJWTPayload } from '@/app/types/common';
import { Request } from 'express';
import httpStatus from 'http-status';
import { pick } from '@/app/helper';

export const createPrescription = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const user = req.user;
    const result = await service.createPrescription(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'prescription created successfully!',
      data: result,
    });
  }
);

export const patientPrescription = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const user = req.user;
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await service.patientPrescription(
      user as IJWTPayload,
      options
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Prescription fetched successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
