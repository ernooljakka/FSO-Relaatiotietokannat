import jwt from 'jsonwebtoken'
import { SECRET } from './config.js'

export const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.message === 'Validation error: Validation isEmail on username failed') {
    return response.status(400).json({ error: 'Please provide username as email (xx@xxx.com)' })
  }

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).send("Please provide all the required fields")
  }

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send("Make sure all the values are of correct types")
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: 'unique constraint failed' })
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return response.status(400).json({ error: 'invalid foreign key' })
  }

  next(error)
}

export const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error){
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

