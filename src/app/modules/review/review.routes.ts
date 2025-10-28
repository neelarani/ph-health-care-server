import { auth } from '@/app/middlewares';
import { UserRole } from '@prisma/client';
import { Router } from 'express';
import * as controller from './review.controller';

const router = Router();

router.get('/', controller.getAllFromDB);

router.post('/', auth(UserRole.PATIENT), controller.insertIntoDB);

export default router;
