import { Sequelize } from 'sequelize';
import variables from '../../config/variables';

const sequelize = new Sequelize(
  variables.DB_NAME,
  variables.DB_USER,
  variables.DB_PASS,
  {
    host: variables.DB_HOST,
    dialect: 'mysql',
  }
);

export default sequelize;
