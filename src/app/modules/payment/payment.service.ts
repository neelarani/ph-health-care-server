import { prisma } from '@/app/shared';
import { PaymentStatus } from '@prisma/client';
import Stripe from 'stripe';

export const handleStripeWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const appoinmentId = session.metadata?.appointmentId;
      const paymentId = session.metadata?.paymentId;
      await prisma.appointment.update({
        where: {
          id: appoinmentId,
        },
        data: {
          paymentStatus:
            session.payment_status === 'paid'
              ? PaymentStatus.PAID
              : PaymentStatus.UNPAID,
        },
      });

      await prisma.payment.update({
        where: {
          id: paymentId,
        },
        data: {
          status:
            session.payment_status === 'paid'
              ? PaymentStatus.PAID
              : PaymentStatus.UNPAID,
        },
      });
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};
