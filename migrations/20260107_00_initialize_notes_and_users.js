import { DataTypes, Sequelize } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('blogs', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
  })
  await queryInterface.createTable('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: Sequelize.literal('NOW()')},
  updatedAt: { 
    type: DataTypes.DATE,
    allowNull: false, 
    defaultValue: Sequelize.literal('NOW()') }
  })
  await queryInterface.addColumn('blogs', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  })
}
export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('blogs')
  await queryInterface.dropTable('users')
}