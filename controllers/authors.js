import { Router } from 'express';
import { Blog } from '../models/index.js';
import { Op, col, fn } from 'sequelize';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const result = await Blog.findAll({
      attributes: [
        "author",
        [fn("COUNT", col("id")), "blogCount"],
        [fn("SUM", col("likes")), "totalLikes"]
      ],
      group: ["author"],
      order: [[fn("SUM", col("likes")), "DESC"]]
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router