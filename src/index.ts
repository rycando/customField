import 'reflect-metadata'

import { connect } from 'mongoose'

import { App } from './app'
import { DB_URI } from './constants'
import logger from './tools/logger'

;(async() => {
  const app = new App()

  await connect(DB_URI).catch((error) => {
    logger.error(`Log 23300: MongoDB connection failed - ${error}`)
    process.exit(1)
  })

  logger.info(`MongoDB is connected with mongoose - ${DB_URI}`)

  app.start()
})()

process.on('unhandledRejection', (err) => {
  logger.error(err)
  // process.exit(1);
})
