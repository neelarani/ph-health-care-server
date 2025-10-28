import { auth } from '@/app/middlewares';
import { UserRole } from '@prisma/client';
import { Router } from 'express';
import * as controller from './appointment.controller';

const router = Router();

router.get('/', auth(UserRole.ADMIN), controller.getAllFromDB);

router.get(
  '/my-appointments',
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  controller.getMyAppoinment
);

router.post('/', auth(UserRole.PATIENT), controller.createAppointment);

router.patch(
  '/status/:id',
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  controller.updateAppoinmentStatus
);

export default router;
