import env from '@/config/env';

import Stripe from 'stripe';

export const stripe = new Stripe(env.stripe_secret_key as string);
