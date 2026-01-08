import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('sessions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE'
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('sessions')
}