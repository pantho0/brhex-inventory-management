import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import config from '../../config';

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  res.cookie('refreshToken', result.refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    maxAge: 90 * 24 * 60 * 60 * 1000,
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePasswordIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPasswordGenerator(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password reset link sent successfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPasswordIntoDB(
    req.body,
    token as string,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  });
});

const accessTokenGenerateWithRefreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  const result = await AuthServices.accessTokenWithRefreshToken(refreshToken);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Access token generated successfully',
    data: result,
  });
});

export const AuthControllers = {
  login,
  changePassword,
  forgetPassword,
  resetPassword,
  accessTokenGenerateWithRefreshToken,
};
