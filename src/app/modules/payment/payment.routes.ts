import { Router } from 'express';
import * as controller from './payment.controller';

const router = Router();

router.post('/webhook', controller.handleStripeWebhookEvent);

export default router;
