import catchAsync from '@/app/shared/catchAsync';
import * as service from '@/app/modules/user/user.service';
import sendResponse from '@/app/shared/sendResponse';
import { pick } from '@/app/helper';

export const createPatient = catchAsync(async (req, res) => {
  const result = await service.createPatient(req);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Patient Created Successfully',
    data: result,
  });
});

export const createAdmin = catchAsync(async (req, res) => {
  const result = await service.createAdmin(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Admin Created successfuly!',
    data: result,
  });
});

export const createDoctor = catchAsync(async (req, res) => {
  const result = await service.createDoctor(req);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Doctor Created Successfully',
    data: result,
  });
});

export const getAllFormDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['status', 'role', 'email']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await service.getAllFormDB(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Retrive Successfully!',
    meta: result.meta,
    data: result.data,
  });
});
