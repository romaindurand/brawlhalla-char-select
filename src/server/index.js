require('dotenv').config()
const express = require('express')

const { setupRoutes } = require('./routes')

const api = express()
setupRoutes(api)

console.log(`API server listening on http://localhost:${process.env.REACT_APP_API_PORT}`)
api.listen(process.env.REACT_APP_API_PORT)
