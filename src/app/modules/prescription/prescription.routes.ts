import { UserRole } from '@prisma/client';
import { Router } from 'express';
import * as controller from './prescription.controller';
import { auth } from '@/app/middlewares';

const router = Router();

router.get(
  '/my-prescription',
  auth(UserRole.PATIENT),
  controller.patientPrescription
);

router.post('/', auth(UserRole.DOCTOR), controller.createPrescription);

export default router;
