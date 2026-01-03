import pool from './db.js';

async function listBlogs() {
  try {
    const result = await pool.query('SELECT * FROM blogs');
    console.log("Blogs in database:");
    const rows = result.rows;

    rows.map(b => {
      console.log(`${b.author} "${b.title}" ${b.likes} likes` )
    })



    process.exit();
  } catch (err) {
    console.error("Error fetching blogs:", err);
    process.exit(1);
  }
}

listBlogs();