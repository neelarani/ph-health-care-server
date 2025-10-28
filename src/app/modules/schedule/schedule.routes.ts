import { Router } from 'express';
import * as controller from './schedule.controller';
import { auth } from '@/app/middlewares';
import { UserRole } from '@prisma/client';

const router = Router();

router.get(
  '/',
  auth(UserRole.DOCTOR, UserRole.ADMIN),
  controller.schedulesForDoctor
);

router.post('/', auth(UserRole.ADMIN), controller.insertIntoDB);

router.delete('/:id', auth(UserRole.ADMIN), controller.deleteScheduleFromDB);

export default router;
