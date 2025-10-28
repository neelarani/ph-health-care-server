import catchAsync from '@/app/shared/catchAsync';
import * as service from './specialties.service';
import sendResponse from '@/app/shared/sendResponse';
import httpStatus from 'http-status';

export const insertIntoDB = catchAsync(async (req, res) => {
  const result = await service.insertIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialties created successfully!',
    data: result,
  });
});

export const getAllFromDB = catchAsync(async (req, res) => {
  const result = await service.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialties data fetched successfully',
    data: result,
  });
});

export const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await service.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Specialty deleted successfully',
    data: result,
  });
});
