import express from 'express';
import { PORT } from './util/config.js';
import { connectToDatabase } from './util/db.js';
import { errorHandler } from './util/middleware.js';
import blogsRouter from './controllers/blogs.js';
import loginRouter from './controllers/login.js'
import usersRouter from './controllers/users.js'
import authorsRouter from './controllers/authors.js'
import readingListRouter from './controllers/readingLists.js'
import logoutRouter from './controllers/logout.js'

const app = express();

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListRouter);
app.use('/api/logout', logoutRouter);

app.use(errorHandler)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();