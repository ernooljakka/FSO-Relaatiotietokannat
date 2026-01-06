export const errorHandler = (error, request, response, next) => {
  console.error(error.message)

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

