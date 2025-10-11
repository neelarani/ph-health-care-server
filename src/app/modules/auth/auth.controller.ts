import catchAsync from '@/app/shared/catchAsync';
import * as service from '@/app/modules/auth/auth.service';
import sendResponse from '@/app/shared/sendResponse';

export const login = catchAsync(async (req, res) => {
  const result = await service.login(req.body);
  const { accessToken, refreshToken, needPasswordChange } = result;

  res.cookie('accessToken', accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60,
  });

  res.cookie('refreshToken', refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 90,
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'User Loggedin Successfully',
    data: {
      needPasswordChange,
    },
  });
});
