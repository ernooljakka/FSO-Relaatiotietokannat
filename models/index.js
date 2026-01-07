import { Blog } from './blog.js'
import { User } from './user.js'

User.hasMany(Blog, { foreignKey: 'user_id' })
Blog.belongsTo(User, { foreignKey: 'user_id' })

export { Blog, User };