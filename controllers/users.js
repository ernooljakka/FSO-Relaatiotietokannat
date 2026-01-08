import { Router } from 'express';
import { User } from '../models/user.js';
import { Blog } from '../models/blog.js';
import { tokenExtractor, sessionValidator, disabledValidation } from '../util/middleware.js';
import { Op } from 'sequelize';

const router = Router();

router.get('/', async (req, res) => {
    const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['user_id'] }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res, next) => {
  try {

    let read = {
      [Op.in]: [true, false]
    }
    if ( req.query.read ) {
      read = req.query.read === "true"
    }
 
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Blog,
          as: 'readings',
          through: {
            attributes: {exclude: ['user_id', 'blog_id', 'blogId']},
            where: {read} 
          },
        }
      ]
    })

    if (!user) return res.status(404).end()

    res.json(user)

  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', tokenExtractor, sessionValidator, disabledValidation, async (req, res, next) => {
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