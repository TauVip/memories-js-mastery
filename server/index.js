import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (_, res) => res.send('Hello to Memories API'))

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, null, err => {
  if (err) throw err
  console.log('Connected to mongodb')
})
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

// Full Stack MERN Project - Pagination & Search | React + Redux, Node, Express, MongoDB | 1:28:39 / 1:57:42
