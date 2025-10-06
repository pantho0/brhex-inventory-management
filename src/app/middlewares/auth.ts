/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import status from 'http-status';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import { verifyToken } from '../modules/auth/auth.utils';
import config from '../config';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    console.log('We are entering in auth guard');
    const token = req.headers.authorization;
    console.log('we found token ==>', token);
    if (!token) throw new AppError(status.UNAUTHORIZED, 'Unauthorized');
    let decoded;
    try {
      decoded = verifyToken(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error: any) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
    }

    const { email, role, iat } = decoded;

    const user = await User.isUserExist(email);
    if (!user) throw new AppError(status.NOT_FOUND, 'User not found');
    if (user.isBlocked)
      throw new AppError(status.UNAUTHORIZED, 'User is blocked');
    if (user.isDeleted)
      throw new AppError(status.UNAUTHORIZED, 'User is deleted');

    if (
      user.passwordChagedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChagedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You may be trying with old password',
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'Unauthorized');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
