import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../util/db.js';

export class Blog extends Model {}

Blog.init({
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
  },
  user_id: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  year: {
  type: DataTypes.INTEGER,
  allowNull: false,
  validate: {
    min: 1991,
    max: new Date().getFullYear(),
    isInt: true
  }
}
}, {
  sequelize,
  timestamps: false,
  modelName: "blog"
});
