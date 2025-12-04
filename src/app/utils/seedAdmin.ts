import { User } from '../modules/user/user.model';

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@brhex.com' });
    if (existingAdmin) {
      console.log('Default admin user already exists. Skipping seeding.');
      return;
    }
    const admin = await User.create({
      firstName: 'Brhex',
      lastName: 'Admin',
      email: 'admin@brhex.com',
      password: 'Brhex@123',
      role: 'admin',
    });
    console.log('Default admin user seeded successfully:', admin.email);
  } catch (error) {
    console.error('Failed to seed default admin user:', error);
  }
};
