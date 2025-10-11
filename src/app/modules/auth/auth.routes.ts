import { Router } from 'express';
import * as controller from '@/app/modules/auth/auth.controller';

const router = Router();
router.post('/login', controller.login);

export default router;
