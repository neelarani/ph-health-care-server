import catchAsync from '@/app/shared/catchAsync';
import sendResponse from '@/app/shared/sendResponse';
import { IJWTPayload } from '@/app/types/common';
import { Request } from 'express';
import * as service from './appointment.service';
import { pick } from '@/app/helper';
import { appointmentFilterableFields } from './appointment.constant';
import httpStatus from 'http-status';

export const createAppointment = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const user = req.user;
    const result = await service.createAppointment(
      user as IJWTPayload,
      req.body
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Appointment created successfully!',
      data: result,
    });
  }
);

export const getMyAppoinment = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = pick(req.query, ['status', 'paymentStatus']);
    const user = req.user;
    const result = await service.getMyAppoinment(
      user as IJWTPayload,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Appointment fetched successfully!',
      data: result,
    });
  }
);

export const updateAppoinmentStatus = catchAsync(
  async (req: Request & { user?: IJWTPayload }, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const result = await service.updateAppoinmentStatus(
      id,
      status,
      user as IJWTPayload
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Appointment updated successfully!',
      data: result,
    });
  }
);

export const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await service.getAllFormDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Appointment retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});
