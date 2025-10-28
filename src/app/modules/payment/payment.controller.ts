import { stripe } from '@/app/helper/stripe';
import catchAsync from '@/app/shared/catchAsync';
import * as service from './payment.service';
import sendResponse from '@/app/shared/sendResponse';
import env from '@/config/env';

export const handleStripeWebhookEvent = catchAsync(async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = env.web_hook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret as string
    );
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  const result = await service.handleStripeWebhookEvent(event);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Webhook req send successfully',
    data: result,
  });
});
