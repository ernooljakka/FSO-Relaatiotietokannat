import { Router } from 'express';
import { Blog } from '../models/index.js';
import { User } from '../models/index.js';
import { tokenExtractor }  from '../util/middleware.js'
import { Op } from 'sequelize';

const router = Router();

const BlogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {

  const search = req.query.search;

  const where = {};

if (search) {
  where[Op.or] = [
    { title: { [Op.iLike]: `%${search}%` } },
    { author: { [Op.iLike]: `%${search}%` } }
  ];
}

  const blogs = await Blog.findAll({
  where,
  order: [
    ['likes', 'DESC']
  ],
  attributes: { exclude: ['userId'] },
  include: {
    model: User,
    attributes: ['name']
  }
  })
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id});
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

router.delete('/:id', BlogFinder, tokenExtractor, async (req, res) => {
  if (req.blog && req.decodedToken) {
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
