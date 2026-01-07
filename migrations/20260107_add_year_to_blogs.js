import { DataTypes, Sequelize } from 'sequelize';

export async function up({ context: queryInterface }) {
  await queryInterface.addColumn('blogs', 'year', {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1991,
      max: new Date().getFullYear()
    },
    defaultValue: new Date().getFullYear()
  });
}

export async function down({ context: queryInterface }) {
  await queryInterface.removeColumn('blogs', 'year');
}