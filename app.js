import express from 'express'
import dotenv from 'dotenv'
import './models/associations.js'
import router from './router.js'

dotenv.config()

const app = express()
const port = process.env.PORT

// Middleware pour parser le JSON
app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

