import { Router } from 'express';
import { User } from '../models/user.js';
import { Blog } from '../models/blog.js';
import { tokenExtractor } from '../util/middleware.js';

const router = Router();

router.get('/', async (req, res) => {
    const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    user.username = req.body.username
    await user.save()
    res.json(user);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

export default router;