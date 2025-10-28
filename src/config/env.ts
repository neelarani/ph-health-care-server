import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcryptSaltRound: process.env.BCRYPT_SALT_ROUND,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
  openRouterApiKey: process.env.OPEN_ROUTER_API_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  client_url: process.env.CLIENT_URL,
  web_hook_secret: process.env.WEB_HOOK_SECRET,
};
