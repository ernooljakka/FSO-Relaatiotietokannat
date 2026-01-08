import { Blog } from './blog.js'
import { User } from './user.js'
import { ReadingList } from './readinglist.js'
import { Session } from './session.js'

User.hasMany(Blog, { foreignKey: 'user_id' })
Blog.belongsTo(User, { foreignKey: 'user_id' })

User.hasMany(ReadingList, { foreignKey: 'user_id' })
ReadingList.belongsTo(User, { foreignKey: 'user_id' })

Blog.hasMany(ReadingList, { foreignKey: 'blog_id' })
ReadingList.belongsTo(Blog, { foreignKey: 'blog_id' })

User.belongsToMany(Blog, {
  through: ReadingList,
  foreignKey: 'user_id',
  as: 'readings'
})

User.hasMany(Session, { foreignKey: 'user_id' })
Session.belongsTo(User, { foreignKey: 'user_id' })

export { Blog, User };