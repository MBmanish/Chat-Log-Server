import mongoose from 'mongoose'
import config from './index.js'
//value for our connection URL
const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`
//using the CONNECTION_URL we form a Mongo connection
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,        //MongoDB driver has deprecated their current connection string parser.
  useUnifiedTopology: true      //Set to true to opt in to using MongoDB driver's new connection management engine
})
//mongoose event handlers
mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})