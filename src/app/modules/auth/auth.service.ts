import ApiError from '@/app/errors/ApiError';
import { token } from '@/app/helper';
import { prisma } from '@/app/shared';
import env from '@/config/env';
import { UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';

export const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect!');
  }

  const accessToken = token.generateToken(
    { email: user.email, role: user.role },
    env.jwt_access_token!,
    '24h'
  );
  const refreshToken = token.generateToken(
    { email: user.email, role: user.role },
    env.jwt_refresh_token!,
    '90d'
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};
