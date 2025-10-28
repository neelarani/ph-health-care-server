import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import * as service from './doctor.service';
import sendResponse from '../../shared/sendResponse';
import { pick } from '@/app/helper';
import { doctorFilterableFields } from './doctor.constant';

export const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const fillters = pick(req.query, doctorFilterableFields);

  const result = await service.getAllFromDB(fillters, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await service.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor updated successfully!',
    data: result,
  });
});

export const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await service.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor retrieval successfully',
    data: result,
  });
});

export const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await service.deleteFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor deleted successfully',
    data: result,
  });
});

export const softDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await service.softDelete(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Doctor soft deleted successfully',
    data: result,
  });
});

export const getAISuggestions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await service.getAISuggestions(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'AI suggestions fetched successfully',
      data: result,
    });
  }
);
