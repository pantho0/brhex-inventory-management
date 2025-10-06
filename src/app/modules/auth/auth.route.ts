import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import {
  changePasswordValidationSchema,
  resetPasswordValidationSchema,
} from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post('/login', AuthControllers.login);
router.put(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(changePasswordValidationSchema),
  AuthControllers.changePassword,
);
router.post('/forget-password', AuthControllers.forgetPassword);
router.put(
  '/reset-password',
  validateRequest(resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);
router.post(
  '/generate-accesstoken',
  AuthControllers.accessTokenGenerateWithRefreshToken,
);

export const AuthRoutes = router;
