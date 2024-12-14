import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const hashedPassword = bcrypt.hashSync('admin123', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        createdAt: new Date()
      },
    ]);
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
  },
};
