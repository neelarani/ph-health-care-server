import { UserRole } from '@prisma/client';
import { Router } from 'express';
import * as controller from './meta.controller';
import { auth } from '@/app/middlewares';

const router = Router();

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  controller.fetchDashboardMetaData
);

export default router;
