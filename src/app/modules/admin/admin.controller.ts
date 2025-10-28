import catchAsync from '@/app/shared/catchAsync';
import { RequestHandler } from 'express';
import { adminFilterAbleFields } from './admin.constant';
import { pick } from '@/app/helper';
import * as service from './admin.service';
import sendResponse from '@/app/shared/sendResponse';
import httpStatus from 'http-status';

export const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
  const filter = pick(req.query, adminFilterAbleFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await service.getAllFromDB(filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data fetched!',
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
    message: 'Admin data fetched by id!',
    data: result,
  });
});

export const updateIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await service.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data updated!',
    data: result,
  });
});

export const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await service.deleteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data deleted!',
    data: result,
  });
});

export const softDeleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await service.softDeleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin data deleted!',
    data: result,
  });
});
