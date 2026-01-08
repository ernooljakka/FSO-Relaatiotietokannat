import { DataTypes, Sequelize } from 'sequelize';

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn('users', 'user_disabled', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('users', 'user_disabled');
}