import express from 'express';
import * as controller from './doctor.controller';
import { UserRole } from '@prisma/client';
import { auth } from '@/app/middlewares';
const router = express.Router();

router.get('/', controller.getAllFromDB);

router.post('/suggestion', controller.getAISuggestions);

router.get('/:id', controller.getByIdFromDB);

router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  controller.updateIntoDB
);

router.delete('/:id', auth(UserRole.ADMIN), controller.deleteFromDB);

router.delete('/soft/:id', auth(UserRole.ADMIN), controller.softDelete);

export const DoctorRoutes = router;
