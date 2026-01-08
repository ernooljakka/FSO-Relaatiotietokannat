import { Router } from 'express';
import { ReadingList } from '../models/readinglist.js';
import { tokenExtractor } from '../util/middleware.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { blog_id, user_id } = req.body

    const entry = await ReadingList.create({
      blog_id,
      user_id,
      read: false
    })

    res.json(entry)
  } catch (e) {
    next(e)
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {

  try {

    if (!req.decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const readingList = await ReadingList.findByPk(req.params.id)

    if (!readingList) {
      return res.status(404).json({ error: 'reading list not found' })
    }

    if (readingList.user_id !== req.decodedToken.id) {
      return res.status(403).json({ error: 'forbidden: not your reading list' })
    }

    readingList.read = req.body.read
    await readingList.save()

    res.json(readingList)
  } catch (err) {
      res.status(500).json({ error: 'something went wrong' })
    }

})



export default router;