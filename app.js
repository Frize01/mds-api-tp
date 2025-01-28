import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT

// Middleware pour parser le JSON
app.use(express.json())

// Route de base pour tester
app.get('/', (req, res) => {
  res.json({ message: 'API is working!' })
})

// Route de santé pour les healthchecks
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})