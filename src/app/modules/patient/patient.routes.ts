import { UserRole } from '@prisma/client';
import { Router } from 'express';
import * as controller from './patient.controller';
import { auth } from '@/app/middlewares';

const router = Router();

router.get('/', controller.getAllFormDB);

router.get('/:id', controller.getByIdFromDB);

router.patch('/', auth(UserRole.PATIENT), controller.updateIntoDB);

router.delete('/soft/:id', controller.softDelete);

export default router;
