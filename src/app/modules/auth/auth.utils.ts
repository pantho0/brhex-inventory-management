/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';

export const createToken = (
  jwtPayload: {
    userId: Types.ObjectId | undefined;
    role: 'admin' | 'user' | undefined;
    firstName: string;
    lastName: string;
    email: string | undefined;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiresIn,
  } as jwt.SignOptions);
};

export const verifyToken = (
  token: string,
  secret: string,
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
  }
};
