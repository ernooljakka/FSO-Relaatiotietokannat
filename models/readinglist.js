import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

export class ReadingList extends Model {}

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'readinglist',
  timestamps: false
})