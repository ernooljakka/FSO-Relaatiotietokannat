import { sequelize } from './util/db.js' // adjust path if needed
import { User } from './models/user.js'  // adjust path if needed
import { Blog } from './models/blog.js'  // adjust path if needed

const seed = async () => {
  try {
    // 1️⃣ Connect to the database
    await sequelize.authenticate()
    console.log('Database connected!')

    // 2️⃣ Create dummy users
    // All required fields in User are: username (email), name, createdAt, updatedAt
    const now = new Date()
    const users = await User.bulkCreate([
      { username: 'alice@example.com', name: 'Alice', createdAt: now, updatedAt: now, password: 'password123' },
      { username: 'bob@example.com', name: 'Bob', createdAt: now, updatedAt: now, password: 'password123' },
      { username: 'charlie@example.com', name: 'Charlie', createdAt: now, updatedAt: now, password: 'password123' },
    ])

    // 3️⃣ Create dummy blogs
    // Required fields in Blog: url, title, user_id, year
    const currentYear = new Date().getFullYear()
    await Blog.bulkCreate([
      { author: 'Alice', url: 'https://example.com/hello-world', title: 'Hello World', user_id: users[0].id, year: 2023, likes: 5 },
      { author: 'Alice', url: 'https://example.com/sequelize-tips', title: 'Sequelize Tips', user_id: users[0].id, year: 2022, likes: 10 },
      { author: 'Bob', url: 'https://example.com/nodejs-tricks', title: 'NodeJS Tricks', user_id: users[1].id, year: 2021, likes: 3 },
      { author: 'Bob', url: 'https://example.com/backend-life', title: 'Backend Life', user_id: users[1].id, year: 2020, likes: 7 },
      { author: 'Charlie', url: 'https://example.com/final-thoughts', title: 'Final Thoughts', user_id: users[2].id, year: 2023, likes: 1 },
    ])

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Seeding failed:', err)
    process.exit(1)
  }
}

seed()
