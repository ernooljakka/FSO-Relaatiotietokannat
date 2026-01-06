// routes/blogs.js
import { Router } from 'express';
import { Blog } from '../models/blog.js';

const router = Router();

const BlogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', BlogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

router.delete('/:id', BlogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Blog not found' });
  }
});

router.put('/:id', BlogFinder, async (req, res, next) => {
  try {

    if (!req.blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    req.blog.likes = req.body.likes
    await req.blog.save()

    res.json(req.blog)
  } catch (error) {
    next(error)
  }
})

export default router;
