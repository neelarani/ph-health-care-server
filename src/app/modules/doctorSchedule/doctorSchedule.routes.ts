import { auth, validateRequest } from '@/app/middlewares';
import { Router } from 'express';
import * as controller from './doctorSchedule.controller';
import { UserRole } from '@prisma/client';
import * as validation from './doctorSchedule.validation';

const router = Router();

router.post(
  '/',
  auth(UserRole.DOCTOR),
  validateRequest(validation.createDoctorScheduleValidationSchema),
  controller.insertIntoDB
);

export default router;
