import { Router } from 'express';
//import { tokenExtractor, sessionValidator } from '../util/middleware.js';
import { Session } from '../models/session.js';

const router = Router();

router.delete('/', async (req, res) => {
  try {

    const auth = req.get('authorization')

    const token = auth.substring(7)

    await Session.destroy({
      where: { token: token }
    })

    res.status(200).json({ message: 'logged out' })

  } catch (err) {
    res.status(500).json({ error: 'internal server error' })
  }
})

export default router;