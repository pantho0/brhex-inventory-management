import { z } from 'zod';
const passwordValidation = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  );

export const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1, { message: 'Old password is required.' }),
    newPassword: passwordValidation,
  }),
});

export const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().min(1, { message: 'Email is required.' }),
    newPassword: passwordValidation,
  }),
});
