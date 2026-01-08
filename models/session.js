import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../util/db.js'

export class Session extends Model {}

Session.init({
  token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false,
  modelName: 'session',
  tableName: 'sessions',
  underscored: true
})