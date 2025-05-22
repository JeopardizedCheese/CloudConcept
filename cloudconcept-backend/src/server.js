//Server

require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
})

app.use('/api/debate', require('./routes/debate'))

//Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})