import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('readinglists', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
      onDelete: 'CASCADE',
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('readinglists')
}