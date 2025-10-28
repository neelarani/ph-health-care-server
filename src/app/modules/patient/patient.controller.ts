import { pick } from '@/app/helper';
import catchAsync from '@/app/shared/catchAsync';
import { patientFilterableFields } from './patient.constant';
import * as service from './patient.service';
import sendResponse from '@/app/shared/sendResponse';
import httpStatus from 'http-status';

import { Request } from 'express';
import { IJWTPayload } from '@/app/types/common';

export const getAllFormDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, patientFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await service.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const getByIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await service.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient retrieval successfully',
    data: result,
  });
});

export const softDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await service.softDelete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Patient soft deleted successfully',
    data: result,
  });
});

export const updateIntoDB = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const user = req.user;

    const result = await service.updateIntoDB(user as IJWTPayload, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Patient updated successfully',
      data: result,
    });
  }
);
