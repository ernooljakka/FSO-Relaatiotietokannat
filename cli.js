import { Blog } from './models/blog.js';

async function listBlogs() {
  try {
    await Blog.sync();

    const blogs = await Blog.findAll();
    blogs.forEach(b => {
      console.log(`${b.author} "${b.title}" ${b.likes} likes`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    process.exit(1);
  }
}

listBlogs();